// Cache DOM elements
const switcher = document.querySelector('.switcher');
const switcherAfter = switcher.querySelector(".switcher-background");
const work = switcher.querySelector('.work');
const education = switcher.querySelector('.education');
const leftContent = document.querySelector('.left-content');

// Unified function to set active state
const setActiveState = (activeElement, inactiveElement, contentType) => {
    if (activeElement.classList.contains('active')) return;
    
    activeElement.classList.add('active');
    inactiveElement.classList.remove('active');

    // Update switcher background position
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = activeElement;
    Object.assign(switcherAfter.style, {
        width: offsetWidth + 'px',
        height: offsetHeight + 'px',
        left: offsetLeft + 'px',
        top: offsetTop + 'px'
    });
    
    changeContent(contentType);
};

// Initialize active state
const initializeState = () => {
    const activeTab = work.classList.contains('active') ? work : education;
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = activeTab;
    Object.assign(switcherAfter.style, {
        width: offsetWidth + 'px',
        height: offsetHeight + 'px',
        left: offsetLeft + 'px',
        top: offsetTop + 'px'
    });
};

// Event listeners with delegation could be used here, but direct is fine for 2 elements
work.addEventListener('click', () => setActiveState(work, education, "work"));
education.addEventListener('click', () => setActiveState(education, work, "education"));

// Initialize
initializeState();

// Content switching with optimized decode effect
const LETTERS = "abcdefghijklnopqrstuvxyz0123456789";

const decodeEffect = (element, text, revolutions = 1/3) => {
    if (!element || !text) return;
    
    const chars = text.split('');
    let count = 0;
    
    const interval = setInterval(() => {
        element.textContent = chars.map((char, i) => {
            if (i < count) return chars[i];
            if (char === " ") return " ";
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
        }).join('');
        
        count += revolutions;
        
        if (count >= chars.length) {
            clearInterval(interval);
            element.textContent = text; // Use original text, not joined array
        }
    }, 10);
};

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

const changeContent = (type) => {
    const contentData = jsonContent[type];
    const cards = leftContent.querySelectorAll(".card");
    
    cards.forEach((card, i) => {
        const data = contentData[i];
        
        if (!data) {
            card.style.display = "none";
            return;
        }
        
        card.style.display = "flex";
        
        // Cache selectors for better performance
        const headerLeft = card.querySelector(".header-left");
        const headerRight = card.querySelector(".header-right");
        const cardBody = card.querySelector(".card-body");
        
        const h4 = headerLeft.querySelector("h4");
        const h5 = headerLeft.querySelector("h5");
        const rightH6s = headerRight.querySelectorAll("h6");
        const bodyP = cardBody.querySelector("p");
        
        // Apply decode effects based on content type
        if (type === "work") {
            decodeEffect(h4, data.position, 1/3);
            decodeEffect(h5, data.company, 1/3);
            decodeEffect(rightH6s[0], data.duration, 1/3);
            decodeEffect(rightH6s[1], data.location, 1/3);
            decodeEffect(bodyP, data.description, 1);
        } else {
            decodeEffect(h4, data.degree, 1/3);
            decodeEffect(h5, data.school, 1/3);
            decodeEffect(rightH6s[0], data.duration, 1/3);
            decodeEffect(rightH6s[1], data.location, 1/3);
            decodeEffect(bodyP, data.description, 1);
        }
    });
};