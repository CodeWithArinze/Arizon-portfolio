const body = document.body;
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const styleSwitcher = document.querySelector(".style-switcher");
const styleToggle = document.querySelector(".style-swicher-togger");
const modeToggle = document.querySelector(".day-night");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("header nav a");
const colorButtons = document.querySelectorAll(".colors span");
const form = document.getElementById("hireForm");
const typedTarget = document.querySelector(".multiple-text");
const chatbot = document.getElementById("chatbot");
const chatToggle = document.getElementById("chat-toggle");
const chatInput = document.getElementById("chat-input");
const chatBody = document.getElementById("chat-body");
const chatChips = document.querySelectorAll(".chat-chip");

const themeStorageKey = "portfolio-theme";
const accentStorageKey = "portfolio-accent";
const accentClasses = ["color1", "color2", "color3", "color4", "color5"];

function setAccentTheme(themeClass) {
    accentClasses.forEach((accent) => body.classList.remove(accent));

    if (themeClass && accentClasses.includes(themeClass)) {
        body.classList.add(themeClass);
        localStorage.setItem(accentStorageKey, themeClass);
        return;
    }

    localStorage.removeItem(accentStorageKey);
}

function updateModeIcon() {
    if (!modeToggle) {
        return;
    }

    const icon = modeToggle.querySelector("i");
    if (!icon) {
        return;
    }

    icon.classList.toggle("fa-sun", !body.classList.contains("theme"));
    icon.classList.toggle("fa-moon", body.classList.contains("theme"));
}

function closeMenu() {
    navbar?.classList.remove("active");
    menuIcon?.classList.remove("fa-times");
}

function appendChatMessage(role, text) {
    if (!chatBody) {
        return;
    }

    const message = document.createElement("div");
    message.className = `chat-message ${role}`;

    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    message.appendChild(paragraph);
    chatBody.appendChild(message);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function getChatReply(input) {
    const question = input.toLowerCase();

    if (question.includes("service")) {
        return "I offer website development, landing pages, portfolio websites, UI design, and e-commerce frontend work.";
    }

    if (question.includes("price") || question.includes("cost") || question.includes("budget")) {
        return "Starter projects begin from N80,000, Professional builds from N150,000, and custom work is priced based on scope.";
    }

    if (question.includes("delivery") || question.includes("time") || question.includes("long")) {
        return "Most smaller websites take about 1 to 2 weeks, while larger or custom projects can take longer depending on the scope.";
    }

    if (question.includes("contact") || question.includes("whatsapp") || question.includes("email")) {
        return "You can reach Obi by WhatsApp at +234 913 573 9518 or by email at aobi3980@gmail.com.";
    }

    if (question.includes("start") || question.includes("project")) {
        return "The best way to start is to send a short message with your project type, goals, and timeline through the contact form or WhatsApp.";
    }

    return "I can help with services, pricing, delivery time, and how to get started. For a direct conversation, use the WhatsApp button on the page.";
}

menuIcon?.addEventListener("click", () => {
    navbar?.classList.toggle("active");
    menuIcon.classList.toggle("fa-times");
});

styleToggle?.addEventListener("click", () => {
    styleSwitcher?.classList.toggle("open");
});

modeToggle?.addEventListener("click", () => {
    body.classList.toggle("theme");
    localStorage.setItem(
        themeStorageKey,
        body.classList.contains("theme") ? "light" : "dark"
    );
    updateModeIcon();
});

colorButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        setAccentTheme(`color${index + 1}`);
    });
});

window.addEventListener("scroll", () => {
    styleSwitcher?.classList.remove("open");

    const scrollPosition = window.scrollY + 160;

    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollPosition >= top && scrollPosition < top + height) {
            navLinks.forEach((link) => link.classList.remove("active"));
            document
                .querySelector(`header nav a[href="#${id}"]`)
                ?.classList.add("active");
        }
    });

    document
        .querySelector("header")
        ?.classList.toggle("sticky", window.scrollY > 100);

    closeMenu();
});

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

chatToggle?.addEventListener("click", () => {
    chatbot?.classList.toggle("open");
});

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem(themeStorageKey);
    const savedAccent = localStorage.getItem(accentStorageKey);

    if (savedTheme === "light") {
        body.classList.add("theme");
    }

    if (savedAccent) {
        setAccentTheme(savedAccent);
    }

    updateModeIcon();

    if (typedTarget && typeof Typed !== "undefined") {
        new Typed(".multiple-text", {
            strings: ["Web Developer", "Designer", "Freelancer"],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    } else if (typedTarget) {
        typedTarget.textContent = "Web Developer";
    }

    if (typeof ScrollReveal !== "undefined") {
        ScrollReveal({
            distance: "50px",
            duration: 1200,
            delay: 100
        });

        ScrollReveal().reveal(".home-content", { origin: "left" });
        ScrollReveal().reveal(".home-img", { origin: "right" });
        ScrollReveal().reveal(".services-box", { interval: 200 });
        ScrollReveal().reveal(".portfolio-box", { interval: 200 });
        ScrollReveal().reveal(".contact-container", { origin: "bottom" });
    }

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("name")?.value.trim() || "";
            const email = document.getElementById("email")?.value.trim() || "";
            const project = document.getElementById("project")?.value.trim() || "";
            const message = document.getElementById("message")?.value.trim() || "";

            if (!name || !email || !project || !message) {
                alert("Please complete the form before sending your message.");
                return;
            }

            const subject = encodeURIComponent(`Portfolio enquiry: ${project}`);
            const bodyText = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\nProject: ${project}\n\nMessage:\n${message}`
            );

            window.location.href = `mailto:aobi3980@gmail.com?subject=${subject}&body=${bodyText}`;
            form.reset();
        });
    }
});

if (chatInput && chatBody) {
    const handleChatQuestion = (value) => {
        const message = value.trim();
        if (!message) {
            return;
        }

        appendChatMessage("user", message);
        appendChatMessage("bot", getChatReply(message));
    };

    chatInput.addEventListener("keypress", function (event) {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();
        handleChatQuestion(this.value);
        this.value = "";
    });

    chatChips.forEach((chip) => {
        chip.addEventListener("click", () => {
            const question = chip.dataset.question || chip.textContent || "";
            handleChatQuestion(question);
        });
    });
}
