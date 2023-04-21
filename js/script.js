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

            // li.textContent = `${element.first_name}`;

            // li.appendChild(p)
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