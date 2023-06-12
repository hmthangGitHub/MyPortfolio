import { select, on } from "./common.js";
import { MasterLoader } from './masterData/MasterLoader.js';

export async function customizeSkills() {
    customizeSkillDescription("Programming Languagues");
    await loadAndAddSkills();
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

function addSkills(skills, group) {
    const skillsSection = document.querySelector("#skills");
    const skillsContent = skillsSection.querySelectorAll(".skills-content")[group];
  
    const skillElement = document.createElement("div");
    skillElement.classList.add("col-lg-6");
    skillElement.setAttribute("data-aos", "fade-up");
    skillElement.setAttribute("data-aos-delay", "100");
  
    for (const skill of skills) {
      const { label, percentage } = skill; // Destructure the skill object properties
  
      const skillHtml = `
        <div class="progress">
          <span class="skill">${label} <i class="val">${percentage}%</i></span>
          <div class="progress-bar-wrap">
            <div class="progress-bar" role="progressbar" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100" style="width: ${0}%"></div>
          </div>
        </div>
      `;
  
      skillElement.innerHTML += skillHtml;
    }
  
    skillsContent.appendChild(skillElement);
  }
  


async function loadAndAddSkills() {
  try {
    // Load MasterSkillContainer
    const masterSkillContainer = await MasterLoader.createInstance("MasterSkillContainer");

    // Get all MasterSkill data
    const allSkills = await masterSkillContainer.getAll();

    for (let group = 0; group < 2; group++)
    {
      // Calculate the number of skills for each category
      let skillInGroups = allSkills.filter(x => x.group == group);
      const totalSkills = skillInGroups.length;
      const category1Count = Math.ceil(totalSkills / 2);
      const category2Count = totalSkills - category1Count;

      // Split the skills into two separate categories
      const category1Skills = skillInGroups.slice(0, category1Count);
      const category2Skills = skillInGroups.slice(category1Count, category1Count + category2Count);

      // Add skills to the corresponding categories using the addSkills function
      addSkills(category1Skills, group);
      addSkills(category2Skills, group);
    }
    // Show the skills section after adding the skills
    //   const skillsSection = document.querySelector("#skills");
    //   skillsSection.style.display = "block";
  } catch (error) {
    console.error("Error loading skills:", error);
  }
}