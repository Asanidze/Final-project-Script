"use strict";

// hide header

const header = document.querySelector(".header");

let lastScrollTop = 0;

window.addEventListener("scroll", function(){
    let scrollTop = window.pageXOffset || document
        .documentElement.scrollTop;
    if (scrollTop > lastScrollTop){
        header.style.top = "-70px";
    } else {
        header.style.top = "0";
    }
    lastScrollTop = scrollTop;
})


// accordion

let accordion = document.querySelectorAll(".accordion")

for (let item of accordion) {
    item.addEventListener("click", function () {
      this.classList.toggle("activeAccordion");
    });
}

document.querySelectorAll(".container").forEach(function (item) {

    let minusElement = document.createElement("i");
    minusElement.classList.add("fa-solid");
    minusElement.classList.add("fa-minus");

    item.appendChild(minusElement);
});

// fetch

function getUsers(){
    fetch("https://reqres.in/api/users?page=1", {
        method:"GET",
    })
    .then(function(response) {
        if (response.status != 200){
            throw response.status;
        }
        return response.json();
    })
    .then(function(getElements) {
        getElements.data.forEach((element) => {
            let li = document.createElement("li");
            li.setAttribute("class","li");

            let img = document.createElement("img");
            img.setAttribute("src",`${element.avatar}`);
            img.classList.add("fetch-img");

            let pName = document.createElement("p");
            pName.textContent = `${element.first_name}`

            let p = document.createElement("p");
            p.textContent = `${element.email}`
            p.classList.add("emailP");

            let pComment = document.createElement("p");
            pComment.textContent = "'On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.'";
            pComment.classList.add("pComment");

            li.appendChild(img);
            li.appendChild(pName);
            li.appendChild(p)
            li.appendChild(pComment)
            document.getElementById("get-elements").appendChild(li);
        })
    })
    .catch(function(error) {
        if (error == 400){
            let pError = document.createElement("p");
            pError.innerText = "Page not found";
            document.getElementById("get-elements").appendChild(pError);
        }
    })
}

getUsers();


// splide

var splide = new Splide( '.splide', {
    type   : 'loop',
    perPage: 3,
    perMove: 1,
} );
splide.mount();


// registration

let formELement = document.getElementById("registration-form");

formELement.addEventListener("submit", function (event) {
  event.preventDefault();

  let checkbox = document.getElementById("save");

    if (checkbox.checked) {
      let nameValue = document.getElementById("name-field").value;
      Cookies.set('NameValue', nameValue);
    } 
    else {
      Cookies.remove('NameValue');
    }


  let errors = {};
  let form = event.target;

    let password1 = document.getElementById("password-field1").value;
    let password2 = document.getElementById("password-field2").value;

    if (password1 == ""){
        errors.password = "Password can't be empty";
    }

    if (password1 != password2){
        errors.password2 = "Passwords not match";
    }



    let gender = false;

    document.querySelectorAll('[name = "gender"]').forEach((item) => {
        if (item.checked) {
          gender = true;
        }
    });
    
    if (!gender) {
        errors.age = "please select your gender";
    };



    let agreeTerms =  document.getElementById("agree").checked;

    if (!agreeTerms) {
    errors.agree = "You must egre our terms and conditions";
    }


    document.querySelectorAll(".error-text").forEach((element) => {
        element.innerHTML = "";
      });
    
      for (let item in errors) {
        let errorText = document.getElementById("error-" + item);
    
        if (errorText) {
          errorText.innerText = errors[item];
        }
      }
      
     if (Object.keys(errors).length == 0) {
        form.submit();
      }
});



let passwordField = document.getElementById("password-field1");
let toggleIcon = document.getElementById("toggleIcon");

toggleIcon.addEventListener("click", function(){
    if (passwordField.type == "password"){
        passwordField.setAttribute("type","text");
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    }
    else {
        passwordField.setAttribute("type","password");
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    }
})




let emailField = document.getElementById("emailField");

emailField.addEventListener("keyup", function(){
    let emailFieldValue = document.getElementById("emailField").value;
    let perrortext = document.getElementById("error-email");
    let emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailFieldValue.match(emailPattern)){
        emailField.style.border = "2px solid green";
    }
    else {
        emailField.style.border = "2px solid red";
    }

    if (emailFieldValue == "") {
        perrortext.innerHTML = "";
        emailField.style.border = "2px solid black";
    }
})


let firstName= document.getElementById("name-field");

firstName.addEventListener("keyup", function(){
    let firstNameValue=firstName.value.trim(); 
    let errorTextN = document.getElementById("error-name");
    let validFirstName=/^[A-Za-z]+$/;

    if(firstNameValue == ""){
        errorTextN.innerHTML="Name is required";
    }
    else if(!validFirstName.test(firstNameValue)){
        errorTextN.innerHTML="First Name must be only string without white spaces";
    }
    else{
        errorTextN.innerHTML="";
        firstName.style.border = "2px solid green";
        return true;
    }
})




let username = document.getElementById("username-field");

username.addEventListener("keyup", function(){
    let usernameValue = document.getElementById("username-field").value;
    let errorText = document.getElementById("error-username");
    let usernamePattern = /^[A-Za-z .]{3,15}$/;

    if (usernamePattern.test(usernameValue)){
        username.style.border = "2px solid green";
    }
    else {
        username.style.border = "2px solid red";
    }

    if (usernameValue == ""){
        errorText.innerHTML = "Username is required";
        username.style.border = "2px solid black";
    }
})



// filter

let inputFilter = document.getElementById("filter");
let ulResult = document.getElementById("result");
let clearList = [];
    
function getFilter(){
    fetch("https://reqres.in/api/users?page=2", {
        method:"GET",
    })
    .then(function(response) {
        if (response.status != 200){
            throw response.status;
        }
        return response.json();
    })
    .then(function(getElements) {
        getElements.data.forEach((element) => {
            let li = document.createElement("li");
            li.textContent = `${element.email}`;
            li.style.color = '#000000';

            clearList.push(li);
            ulResult.appendChild(li);
        })
    })
    .catch((error) => error);
}

getFilter();

function filterData(searchItem) {
    clearList.forEach( (item) => {
    if (item.innerText.toLowerCase().includes(searchItem.toLowerCase()) ) {
        item.classList.remove('hide')
    } 
    else {
        item.classList.add('hide')
    }
    })
};
      
inputFilter.addEventListener('keyup', function(event) {
    filterData(event.target.value);
})




//cookies

const cookieContainer = document.querySelector(".cookie-container");
const cookieButton = document.querySelector(".cookie-btn");

cookieButton.addEventListener("click", () => {
  cookieContainer.classList.remove("active");
  localStorage.setItem("cookieBannerDisplayed", "true");
});

setTimeout(() => {
  if (!localStorage.getItem("cookieBannerDisplayed")) {
    cookieContainer.classList.add("active");
  }
}, 300);


//burgerbar

let burgerbar = document.getElementById("burgerBar");
let navigation = document.getElementById("navBar");
let headeract = document.querySelector(".header")

burgerbar.addEventListener("click", function(){
    navigation.classList.toggle("activeNav");
    header.classList.toggle("activeNav")
})

let ulClass = document.querySelectorAll(".direction");

ulClass.forEach((element) => element.addEventListener("click",function(){
    navigation.classList.remove("activeNav");
    header.classList.remove("activeNav")
}))