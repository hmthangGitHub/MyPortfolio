import { MasterLoader } from './masterData/MasterLoader.js';
export async function customizeResume() {
  const newDescription = "The following is a condensed version of my comprehensive resume, highlighting my experience as a Software Engineering major specialized in game development. For a detailed overview of my qualifications, please refer to the ";
  customizeResumeDescription(newDescription, "complete resume", "assets/resume/Hoang-Manh-Thang.pdf");
  let resumeData = await generateResumeData();
  // Loop through the sections and call createResumeSection for each section
  createResumeSection(resumeData.groups);
}

async function generateResumeData() {
  // Load containers
  const groupContainer = await MasterLoader.createInstance("MasterResumeGroupContainer");
  const itemDetailContainer = await MasterLoader.createInstance("MasterResumeItemDetailContainer");
  const sectionGroupContainer = await MasterLoader.createInstance("MasterResumeSectionGroupContainer");
  const sectionItemContainer = await MasterLoader.createInstance("MasterResumeSectionItemContainer");

  // Get data from containers
  const groupData = await groupContainer.getAll();
  const itemDetailData = await itemDetailContainer.getAll();
  const sectionGroupData = await sectionGroupContainer.getAll();
  const sectionItemData = await sectionItemContainer.getAll();

  // Generate resumeData
  const resumeData = {
    groups: []
  };

  for (const group of groupData) {
    const groupSections = [];
    const groupSectionData = sectionGroupData.filter((sectionGroup) => sectionGroup.master_resume_group_id === group.master_resume_group_id);

    for (const sectionGroup of groupSectionData) {
      const sectionItems = [];
      const sectionItemDetails = sectionItemData.filter((item) => item.master_resume_section_group_id === sectionGroup.master_resume_section_group_id);

      for (const item of sectionItemDetails) {
        const itemDetails = [];
        const itemDetailDetails = itemDetailData.filter((detail) => detail.master_resume_section_item_id === item.master_resume_section_item_id);
        itemDetails.push(...itemDetailDetails);

        const sectionItem = {
          itemTitle: item.header,
          itemSubtitle: item.sub_header,
          description: item.description,
          details: itemDetails.map((detail) => detail.detail)
        };

        sectionItems.push(sectionItem);
      }

      const section = {
        sectionTitle: sectionGroup.header,
        items: sectionItems
      };

      groupSections.push(section);
    }

    const groupData = {
      groupTitle: group.label,
      sections: groupSections
    };

    resumeData.groups.push(groupData);
  }

  return resumeData;
}

function customizeResumeDescription(description, linkText, resumeLink) {
  const resumeSection = document.querySelector("#resume");
  const descriptionElement = resumeSection.querySelector(".section-title p");

  // Create a link element
  const linkElement = document.createElement("a");
  linkElement.textContent = linkText;
  linkElement.href = resumeLink;

  // Append the link element to the description
  descriptionElement.textContent = description;
  descriptionElement.appendChild(linkElement);
  descriptionElement.innerHTML += "."; // Add a period at the end
}

function createResumeSection(groups) {
  const resumeSection = document.querySelector('#resume');
  const rowElement = resumeSection.querySelector('.row');

  for (const group of groups) {
    const colElement = document.createElement('div');
    colElement.classList.add('col-lg-6');

    for (const section of group.sections) {
      const sectionElement = document.createElement('div');

      const sectionTitle = document.createElement('h3');
      sectionTitle.classList.add('resume-title');
      sectionTitle.textContent = section.sectionTitle;
      sectionElement.appendChild(sectionTitle);

      for (const itemData of section.items) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('resume-item');
        const itemTitle = document.createElement('h4');
        itemTitle.textContent = itemData.itemTitle;
        itemElement.appendChild(itemTitle);

        if (itemData.itemSubtitle) {
          const itemSubtitle = document.createElement('h5');
          itemSubtitle.textContent = itemData.itemSubtitle;
          itemElement.appendChild(itemSubtitle);
        }

        const description = document.createElement('p');
        description.textContent = itemData.description;
        itemElement.appendChild(description);

        if (itemData.details && itemData.details.length > 0) {
          const detailsList = document.createElement('ul');
          for (const detail of itemData.details) {
            const detailItem = document.createElement('li');
            detailItem.textContent = detail;
            detailsList.appendChild(detailItem);
          }
          itemElement.appendChild(detailsList);
        }

        sectionElement.appendChild(itemElement);
      }

      colElement.appendChild(sectionElement);
    }

    rowElement.appendChild(colElement);
  }
}



class ResumeData {
  constructor(title) {
    this.title = title;
    this.sections = [];
  }

  addSection(title) {
    const section = new Section(title);
    this.sections.push(section);
    return section;
  }
}

class Section {
  constructor(title) {
    this.title = title;
    this.items = [];
  }

  addItem(title, year, description) {
    const item = new Item(title, year, description);
    this.items.push(item);
    return item;
  }
}

class Item {
  constructor(title, year, description) {
    this.title = title;
    this.year = year;
    this.description = description;
    this.details = [];
  }

  addDetail(detail) {
    this.details.push(detail);
  }
}