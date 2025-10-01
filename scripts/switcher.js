const switcher = document.querySelector('.switcher');
const switcherAfter = switcher.querySelector(".switcher-background");
const work = switcher.querySelector('.work');
const education = switcher.querySelector('.education');

// Functions to set active state
const setWorkActive = () => {
    work.classList.add('active');
    education.classList.remove('active');

    switcherAfter.style.width = work.offsetWidth + 'px';
    switcherAfter.style.height = work.offsetHeight + 'px';
    switcherAfter.style.left = work.offsetLeft + 'px';
    switcherAfter.style.top = work.offsetTop + 'px';
}
const setEducationActive = () => {
    education.classList.add('active');
    work.classList.remove('active');

    switcherAfter.style.width = education.offsetWidth + 'px';
    switcherAfter.style.height = education.offsetHeight + 'px';
    switcherAfter.style.left = education.offsetLeft + 'px';
    switcherAfter.style.top = education.offsetTop + 'px';
}

// Initial state
if(work.classList.contains('active')) {
    setWorkActive();
} else {
    setEducationActive();
}

// Event listeners
work.addEventListener('click', () => {
    if(work.classList.contains('active')) return;
    setWorkActive();
    changeContent("work");
});
education.addEventListener('click', () => {
    if(education.classList.contains('active')) return;
    setEducationActive();
    changeContent("education");
});

// Content switching
const letters = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789";
const decodeEffect = (element, text, revolutions) => {
    text = text.split('');
    let count = 0;
    const interval = setInterval(() => {
        element.textContent = text.map((letter, i) => {
            if(i < count){
                return text[i];
            }
            if(letter === " ") return " ";
            return letters[Math.floor(Math.random() * letters.length)];
        }).join('');
        count += revolutions || 1/3;
        if (count > text.length) {
            clearInterval(interval);
            element.textContent = text.join('');
        }
    }, 10);
}

const jsonContent = {
    "work": [
        {
            "position": "Website Administration",
            "company": "INGDATA spol. s.r.o.",
            "duration": "2023 ‒ Present",
            "location": "Ostrava, CZ",
            "description": "Development and maintenance of a PHP-based website using Twig templating, implementing new pages and enhancing existing functionality."
        },
        {
            "position": "Paid Internship",
            "company": "Fiosoft Solutions s.r.o.",
            "duration": "2025 ‒ Present",
            "location": "Ostrava, CZ",
            "description": "Full-stack development with React and PHP, focusing on feature implementation & bug resolution."
        },
        {
            "position": "Unpaid Internship",
            "company": "Stora Enso",
            "duration": "2025 ‒ 2025",
            "location": "Ostrava, CZ",
            "description": "I learned about software integrations & API management. I also made a proof-of-concept in React which paved the way to creating a replacement for a deprecated application."
        },
    ],
    "education": [
        {
            "degree": "Computer Science",
            "school": "SPŠei Ostrava",
            "duration": "2023 ‒ 2027",
            "location": "Ostrava, CZ",
            "description": "Currently studying computer science with a focus on programming and software development. (C, Java, PHP, SQL)"
        }
    ]
}

const workContent = document.querySelector('.work-content');
const changeContent = (type) => {
    workContent.querySelectorAll(".card").forEach((card, i) => {
        if(type === "work") {
            if(!jsonContent.work[i]){
                card.style.display = "none";
                return;
            } else {
                card.style.display = "flex";
            }
            decodeEffect(card.querySelector(".header-left h4"), jsonContent.work[i].position, 1/3);
            decodeEffect(card.querySelector(".header-left h5"), jsonContent.work[i].company, 1/3);

            decodeEffect(card.querySelectorAll(".header-right h6")[0], jsonContent.work[i].duration, 1/3);
            decodeEffect(card.querySelectorAll(".header-right h6")[1], jsonContent.work[i].location, 1/3);

            decodeEffect(card.querySelectorAll(".card-body p")[0], jsonContent.work[i].description, 1);
        } else {
            if(!jsonContent.education[i]){
                card.style.display = "none";
                return;
            } else {
                card.style.display = "flex";
            }
            decodeEffect(card.querySelector(".header-left h4"), jsonContent.education[i].degree, 1/3);
            decodeEffect(card.querySelector(".header-left h5"), jsonContent.education[i].school, 1/3);

            decodeEffect(card.querySelectorAll(".header-right h6")[0], jsonContent.education[i].duration, 1/3);
            decodeEffect(card.querySelectorAll(".header-right h6")[1], jsonContent.education[i].location, 1/3);

            decodeEffect(card.querySelectorAll(".card-body p")[0], jsonContent.education[i].description, 1);
        }
    });
}