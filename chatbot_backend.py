import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_history_aware_retriever
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

# Load environment variables from .env file
load_dotenv()

os.environ["GOOGLE_API_KEY"] = os.environ.get("GEMINI_API_KEY")

LLModel = GoogleGenerativeAI(model="gemini-2.5-flash")

embedding_model = GoogleGenerativeAIEmbeddings(model="gemini-embedding-001")

vectorstore = Chroma(persist_directory="chroma_db", embedding_function=embedding_model)

retriever = vectorstore.as_retriever(
    search_type="similarity",
    #search_kwargs={"k": 4}
)

system_prompt = """
    Here is the information about our available phones:
    {context}
    
    Act as a customer friendly mobile phone shop agent. Compare prices and features across all available phones to give the most helpful answer.
    If multiple options are available, list them.
    
    If specific information isn't available in the context, apologize and say:
    'For more details about specific models, please contact us at Phone: 456-456-4512 or Email: company@gmail.com' otherwise don't say this.
    
    if the cusomer says he wants to get details when he askes device previously provide that necessary details only.
    
    if the customer wants to buy or proceed the payment you must get name, nic , address. after that send message to check payment cart checkout.
"""

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}")
])

QAchain = create_stuff_documents_chain(LLModel, prompt)

RAGChain = create_retrieval_chain(retriever, QAchain)

context_system_prompt = (
    "Using chat history and latest user question, just reformulate question if needed and otherwise return it as is"
)

context_prompt = ChatPromptTemplate.from_messages([
    ("system", context_system_prompt),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])

history_aware_retriever = create_history_aware_retriever(
    LLModel, retriever, context_prompt
)


store = {}


def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id] 


ConvRAGChain = RunnableWithMessageHistory(
    RAGChain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="chat_history",
    output_messages_key="answer",
)


def get_chatbot_response(message, session_id="default"):
    try:
        response = ConvRAGChain.invoke(
            {"input": message},
            config={"configurable": {"session_id": session_id}},
        )
        return response["answer"]
    except Exception as e:
        print(f"Error in chatbot response: {e}")
        return "Sorry, I encountered an error processing your request."
