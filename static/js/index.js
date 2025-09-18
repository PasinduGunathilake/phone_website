/*
=============
Navigation
=============
 */
const navOpen = document.querySelector(".nav__hamburger");
const navClose = document.querySelector(".close__toggle");
const menu = document.querySelector(".nav__menu");
const scrollLink = document.querySelectorAll(".scroll-link");
const navContainer = document.querySelector(".nav__menu");

navOpen.addEventListener("click", () => {
  menu.classList.add("open");
  document.body.classList.add("active");
  navContainer.style.left = "0";
  navContainer.style.width = "30rem";
});

navClose.addEventListener("click", () => {
  menu.classList.remove("open");
  document.body.classList.remove("active");
  navContainer.style.left = "-30rem";
  navContainer.style.width = "0";
});

/*
=============
PopUp
=============
 */
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup__close");

if (popup) {
  closePopup.addEventListener("click", () => {
    popup.classList.add("hide__popup");
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      popup.classList.remove("hide__popup");
    }, 500);
  });
}

/*
=============
Fixed Navigation
=============
 */

const navBar = document.querySelector(".navigation");
const gotoTop = document.querySelector(".goto-top");

// Smooth Scroll
Array.from(scrollLink).map(link => {
  link.addEventListener("click", e => {
    // Prevent Default
    e.preventDefault();

    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const navHeight = navBar.getBoundingClientRect().height;
    const fixNav = navBar.classList.contains("fix__nav");
    let position = element.offsetTop - navHeight;

    if (!fixNav) {
      position = position - navHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    navContainer.style.left = "-30rem";
    document.body.classList.remove("active");
  });
});

// Fix NavBar

window.addEventListener("scroll", e => {
  const scrollHeight = window.pageYOffset;
  const navHeight = navBar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix__nav");
  } else {
    navBar.classList.remove("fix__nav");
  }

  if (scrollHeight > 300) {
    gotoTop.classList.add("show-top");
  } else {
    gotoTop.classList.remove("show-top");
  }
});

let login=document.querySelector('.login-form');

document.querySelector('#login-btn').onclick=()=>{
    login.classList.toggle('active');
   searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');

}

let shoppingCart=document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick=()=>{
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    login.classList.remove('active');

}
let searchForm=document.querySelector('.search-form');

document.querySelector('#search-btn').onclick=()=>{
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    login.classList.remove('active');
 
}

// Updated Chatbot logic
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('chatbot-toggle');
  const closeBtn = document.getElementById('chatbot-close');
  const windowEl = document.getElementById('chatbot-window');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const messages = document.getElementById('chatbot-messages');

  function appendMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = 'chatbot-message ' + sender;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function appendLoading() {
    const loading = document.createElement('div');
    loading.className = 'chatbot-message bot';
    loading.id = 'chatbot-loading';
    loading.innerHTML = '<span style="opacity:0.7;">...</span>';
    messages.appendChild(loading);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeLoading() {
    const loading = document.getElementById('chatbot-loading');
    if (loading) loading.remove();
  }

  // Function to send message to backend API
  async function sendMessageToAPI(text) {
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error sending message to API:', error);
      return "Sorry, I couldn't connect to the server. Please try again later.";
    }
  }

  if (toggleBtn && closeBtn && windowEl && form && input && messages) {
    toggleBtn.addEventListener('click', function() {
      windowEl.classList.toggle('chatbot-hide');
      if (!windowEl.classList.contains('chatbot-hide')) {
        setTimeout(() => input.focus(), 200);
      }
    });

    closeBtn.addEventListener('click', function() {
      windowEl.classList.add('chatbot-hide');
    });

    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      
      appendMessage(text, 'user');
      input.value = '';
      appendLoading();
      
      try {
        const reply = await sendMessageToAPI(text);
        removeLoading();
        appendMessage(reply, 'bot');
      } catch (error) {
        removeLoading();
        appendMessage("Sorry, I'm having trouble connecting right now.", 'bot');
      }
    });

    // Optional: greet on open
    let greeted = false;
    toggleBtn.addEventListener('click', function() {
      if (!greeted && windowEl.classList.contains('chatbot-hide') === false) {
        setTimeout(() => {
          appendMessage("Hi! I'm your assistant. Ask me anything about our phones!", 'bot');
        }, 400);
        greeted = true;
      }
    });
  }
});