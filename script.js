document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuIcon = document.querySelector(".mobile-menu-icon");
  const mobileMenu = document.querySelector(".menu");
  mobileMenuIcon.addEventListener("click", function (){
    mobileMenu.classList.toggle("mobile-menu-open");
  });
});

//Slider de depoimentos
const prevButton = document.querySelector(".prev-testimonial");
const nextButton = document.querySelector(".next-testimonial");
const cards = document.querySelectorAll(".container-testimonials > div");
let currentIndex = 0;

function showCards() {
  cards.forEach((card, index) => {
    if (index >= currentIndex && index < currentIndex + getVisibleCardCount()) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
  const disabledPrevButton = currentIndex === 0;
  disabledPrevButton
    ? prevButton.classList.add('disabled')
    : prevButton.classList.remove('disabled');
  const disabledNextButton =
    currentIndex + getVisibleCardCount() >= cards.length;
  disabledNextButton
    ? nextButton.classList.add('disabled')
    : nextButton.classList.remove('disabled');
}

function getVisibleCardCount() {
  const mobileScreenWidth = 1200;

  return window.innerWidth <= mobileScreenWidth ? 1 : 3;
}
function prevCard() {
  if (currentIndex > 0) {
    currentIndex -= 1;
  }
  showCards();
}
function nextCard() {
  if (currentIndex + getVisibleCardCount() < cards.length) {
    currentIndex += 1;
  }
  showCards();
}

prevButton.addEventListener("click", prevCard);
nextButton.addEventListener("click", nextCard);
showCards();
window.addEventListener("resize", showCards);

document.addEventListener("DOMContentLoaded", function(){
  const form = document.querySelector("form");
  const successMessage = document.getElementById("success");
  const errorMessage = document.getElementById("error");
  const loadingMessage = document.getElementById("loading");

  form.addEventListener("submit" , function(e){
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const assunto = document.getElementById("assunto").value;
    const mensagem = document.getElementById("mensagem").value;


    form.style.display = "none";
    successMessage.style.display = "none";
    errorMessage.style.display = "none";
    loadingMessage.style.display = "block";

    const data = {
      to:"arthur.viana.lima07@gmail.com",
      from:"arthurvianalima1101@outlook.com",
      subject:"Contato do site",
      text: "Contato do site",
      html: `<p>Nome: ${nome}</p><br><p>Email: ${email}</p><br><p>Assunto: ${assunto}</p><br><p>Mensagem: ${mensagem}</p>`
    };


    fetch("https://api-mg-a0eh.onrender.com/send-email",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => {
      if (res.ok) {
        loadingMessage.style.display = "none";
        successMessage.style.display = "block";
      } else{
        loadingMessage.style.display = "none";
        errorMessage.style.display = "block";
        console.error(`Erro na resposta da api: ${res.status} - ${res.statusText}`);
      }
    }).catch((error) => {
      console.error(error);
      loadingMessage.style.display = "none";
      errorMessage.style.display = "block";
    })
  });
});

function scrollToSection(sectionId){
  const section = document.querySelector(sectionId);

  if(section){
    let scrollOffSet = 0;

    if (sectionId === "#projects") {
      scrollOffSet = section.offSetTop - 70;
      
    }else{
      scrollOffSet =section.offSetTop - (window.innerHeight - section.clientHeight)/2;
    }
    window.scrollTo({
      top: scrollOffSet,
      behavior: "smooth"
    })
  }
}

document.addEventListener(DOMContentLoaded, function(){
  const links = document.querySelectorAll("nav a");
  links.forEach(function(link){
    link.addEventListener("click", function(e){
      e.preventDefault();
      const sectionId = link.getAttribute("href");
      scrollToSection(sectionId);
    })
  });
   const footerLinks = document.querySelectorAll("footer a");
  footerLinks.forEach(function(link){
    link.addEventListener("click", function(e){
      e.preventDefault();
      const sectionId = link.getAttribute("href");
      scrollToSection(sectionId);
    })
  });
  
})