const mainGrid = document.querySelector('.main-grid');
const gridItems = mainGrid.querySelectorAll('.grid-item');

setInterval(() => {
    let randomNumber;
    const lastRandomNumber = mainGrid.style.getPropertyValue("--border-radius").replace("px", "");
    do {
        randomNumber = Math.floor(Math.random() * 50)
    } while(Math.abs(randomNumber - lastRandomNumber) < 15);

    mainGrid.style.setProperty("--last-border-radius", `${lastRandomNumber}px`);
    mainGrid.style.setProperty("--border-radius", `${randomNumber}px`);
}, 3000);

gridItems[6].addEventListener("mousedown", e => {
    console.log("clicked");

    gridItems[4].style.transform = "none";
    gridItems[4].style.opacity = "1";
    gridItems[4].style.animation = "pulse 0.5s forwards";
    setTimeout(() => {
        gridItems[4].style.animation = "none";
    }, 500);
});