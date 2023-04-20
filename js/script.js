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
