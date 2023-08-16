export function customizeAbout() {
  customizeAboutSection("I am a passionate game developer with a strong background in programming and design. I specialize in creating immersive and interactive gaming experiences that captivate players. With my expertise in game engines, scripting languages, and game development frameworks, I bring ideas to life and deliver engaging gameplay mechanics. I strive to create unique and innovative games that leave a lasting impression on players. Let's embark on an exciting gaming journey together!");
  customizeAboutRole("Personal Information");
  customizeLoremIpsum("");
  customizeDetailAboutSection();
  customizeParagraph("");
  customizeFactsSection("I have been playing DotA for over a decade now, I enjoy solving a Rubik's Cube while I'm dead to keep myself from blaming my teammate.");
}

export function customizeAboutSection(description) {
    const sectionTitle = document.querySelector(".section-title");
    const paragraph = sectionTitle.querySelector("p");

    paragraph.textContent = description;
}

export function createAboutList(list) {
  const aboutSection = document.querySelectorAll("#about .row")[1];

  // Create the outer column element
  const columnElement = document.createElement("div");
  columnElement.classList.add("col-lg-6");

  // Create the inner ul element
  const ulElement = document.createElement("ul");

  for (const [title, value] of Object.entries(list)) {
    const liElement = document.createElement("li");
    const iconElement = document.createElement("i");
    iconElement.classList.add("bi", "bi-chevron-right");

    const strongElement = document.createElement("strong");
    strongElement.textContent = title;

    const spanElement = document.createElement("span");
    spanElement.textContent = value;

    liElement.appendChild(iconElement);
    liElement.appendChild(strongElement);
    liElement.appendChild(spanElement);

    ulElement.appendChild(liElement);
  }

  // Append the ul element to the column element
  columnElement.appendChild(ulElement);

  // Append the column element to the aboutSection
  aboutSection.appendChild(columnElement);
}

export function customizeDetailAboutSection() {
  const firstList = {
    "Birthday:": "10 July 1995",
    "Phone:": "+84 903 786 654",
    "City:": "Ho Chi Minh city, Viet Nam",
  };
  
  const secondList = {
    "Age:": "28",
    "Degree:": "Engineer",
    "Email:": "hoangmanhthang795@gmail.com",
  };
  
  createAboutList(firstList);
  createAboutList(secondList);
}

function customizeLoremIpsum(text) {
  const loremIpsumElement = document.querySelector("#about .content p");
  loremIpsumElement.textContent = text;
}

function customizeParagraph(text) {
  const paragraphElement = document.querySelector("#about .content p:last-child");
  paragraphElement.textContent = text;
}

function customizeAboutRole(role) {
  const roleElement = document.querySelector("#about h3");

  roleElement.textContent = role;
}

function customizeFactsSection(description) {
  const factsSection = document.querySelector("#facts");
  const descriptionElement = factsSection.querySelector(".section-title p");

  descriptionElement.textContent = description;
}
