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

// Chatbot logic
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

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      appendMessage(text, 'user');
      input.value = '';
      appendLoading();
      setTimeout(() => {
        removeLoading();
        // Simple bot reply logic
        let reply = "Sorry, I'm just a demo bot!";
        if (/hello|hi|hey/i.test(text)) reply = "Hello! How can I help you today?";
        else if (/price|cost/i.test(text)) reply = "For pricing information, please check our products section.";
        else if (/contact|support/i.test(text)) reply = "You can contact us via the Contact section below.";
        else if (/bye|goodbye/i.test(text)) reply = "Goodbye! Have a great day!";
        appendMessage(reply, 'bot');
      }, 700);
    });

    // Optional: greet on open
    let greeted = false;
    toggleBtn.addEventListener('click', function() {
      if (!greeted && windowEl.classList.contains('chatbot-hide') === false) {
        setTimeout(() => {
          appendMessage("Hi! I'm your assistant. Ask me anything about our shop.", 'bot');
        }, 400);
        greeted = true;
      }
    });
  }
});