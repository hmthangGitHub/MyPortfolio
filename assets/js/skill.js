import { select, on } from "./common.js";
export function customizeSkills() {
    customizeSkillDescription("Customized description for the Skills section.");
    const skill1 = {
        HTML: 100,
        CSS: 90,
        JavaScript: 75,
    };

    const skill2 = {
        PHP: 80,
        "WordPress/CMS": 90,
        Photoshop: 55,
    };

    addSkills(skill1);
    addSkills(skill2);
    addSkillAnimation();
}

function addSkillAnimation() {
    let skilsContent = select('.skills-content');
    if (skilsContent) {
        new Waypoint({
            element: skilsContent,
            offset: '80%',
            handler: function (direction) {
                let progress = select('.progress .progress-bar', true);
                progress.forEach((el) => {
                    el.style.width = el.getAttribute('aria-valuenow') + '%';
                });
            }
        });
    }
}

function customizeSkillDescription(description) {
    const skillsSection = document.querySelector("#skills");
    const descriptionElement = skillsSection.querySelector(".section-title p");

    descriptionElement.textContent = description;
}

function addSkills(skills) {
    const skillsSection = document.querySelector("#skills");
    const skillsContent = skillsSection.querySelector(".skills-content");
  
    const skillElement = document.createElement("div");
    skillElement.classList.add("col-lg-6");
    skillElement.setAttribute("data-aos", "fade-up");
    skillElement.setAttribute("data-aos-delay", "100");
  
    for (const [skillName, percentage] of Object.entries(skills)) {
      skillElement.innerHTML += `
        <div class="progress">
          <span class="skill">${skillName} <i class="val">${percentage}%</i></span>
          <div class="progress-bar-wrap">
            <div class="progress-bar" role="progressbar" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100" style="width: ${0}%"></div>
          </div>
        </div>
      `;
    }
  
    skillsContent.appendChild(skillElement);
  }