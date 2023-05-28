import { select, on } from "./common.js";
import { customizeAbout } from "./about.js";

function updateHeroSection(name, professions) {
    const heroSection = document.getElementById("hero");
    const heroContainer = heroSection.querySelector(".hero-container");
    const nameElement = heroContainer.querySelector("h1");
    const typedElement = heroContainer.querySelector(".typed");

    nameElement.textContent = name;

    // Generate the comma-separated list of professions
    const professionsList = professions.join(", ");

    // Update the data-typed-items attribute with the new list
    typedElement.setAttribute("data-typed-items", professionsList);
}

export function updateHomeSection(){
    updateHeroSection("Hoang Manh Thang", ["Game Developer", "Web Developer","Freelancer", "Tech Enthusiast"]);
    /**
   * Hero type effect
   */
    const typed = select('.typed')
    if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
    });
    }

    customizeAbout();
}