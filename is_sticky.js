const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
    if(nav.offsetTop - window.scrollY <= 10){
        nav.classList.add("is-sticky"); 
    } else {
        nav.classList.remove("is-sticky");
    }
})