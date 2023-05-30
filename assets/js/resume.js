import { MasterLoader } from './masterData/MasterLoader.js';
export async function customizeResume() {
  const newDescription = "Customized Resume Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Mauris ullamcorper aliquet nisl, in sagittis velit ultricies non. Donec vitae pharetra nulla, ac feugiat enim. Nam ullamcorper, neque vitae egestas tempor, justo diam congue lectus, et bibendum nulla risus in nisl.";
  customizeResumeDescription(newDescription);

//   const resumeData = {
//   groups: [
//     {
//       groupTitle: 'Summary',
//       sections: [
//         {
//           sectionTitle: 'Summary',
//           items: [
//             {
//               itemTitle: 'Hoang Manh Thang',
//               description: 'Innovative and deadline-driven Graphic Designer with 3+ years of experience designing and developing user-centered digital/print marketing material from initial concept to final, polished deliverable',
//               details: [
//                 'Portland par 127,Orlando, FL',
//                 '(123) 456-7891',
//                 'alice.barkley@example.com'
//               ]
//             }
//           ]
//         },
//         {
//           sectionTitle: 'Education',
//           items: [
//             {
//               itemTitle: 'Master of Fine Arts & Graphic Design',
//               itemSubtitle: '2015 - 2016',
//               description: 'Rochester Institute of Technology, Rochester, NY',
//               details: [
//                 'Qui deserunt veniam. Et sed aliquam labore tempore sed quisquam iusto autem sit. Ea vero voluptatum qui ut dignissimos deleniti',
//                 'Nerada porti sand markend'
//               ]
//             },
//             {
//               itemTitle: 'Bachelor of Fine Arts & Graphic Design',
//               itemSubtitle: '2010 - 2014',
//               description: 'Rochester Institute of Technology, Rochester, NY',
//               details: [
//                 'Quia nobis sequi est occaecati aut. Repudiandae et iusto quae reiciendis et quis Eius vel ratione eius unde vitae rerum voluptates asperiores voluptatem',
//                 'Earum molestiae consequatur neque etlon sader mart dila'
//               ]
//             }
//           ]
//         }
//       ]
//     },
//     {
//       groupTitle: 'Professional Experience',
//       sections: [
//         {
//           sectionTitle: 'Professional Experience',
//           items: [
//             {
//               itemTitle: 'Senior graphic design specialist',
//               itemSubtitle: '2019 - Present',
//               description: 'Experion, New York, NY',
//               details: [
//                 'Lead in the design, development, and implementation of the graphic, layout, and production communication materials',
//                 'Delegate tasks to the 7 members of the design team and provide counsel on all aspects of the project',
//                 'Supervise the assessment of all graphic materials in order to ensure quality and accuracy of the design',
//                 'Oversee the efficient use of production project budgets ranging from $2,000 - $25,000'
//               ]
//             },
//             {
//               itemTitle: 'Graphic design specialist',
//               itemSubtitle: '2017 - 2018',
//               description: 'Stepping Stone Advertising, New York, NY',
//               details: [
//                 'Developed numerous marketing programs (logos, brochures, infographics, presentations, and advertisements)',
//                 'Managed up to 5 projects or tasks at a given time while under pressure',
//                 'Recommended and consulted with clients on the most appropriate graphic design',
//                 'Created 4+ design presentations and proposals a month for clients and account managers'
//               ]
//             }
//           ]
//         },
//       ]
//     }
//   ]
// };
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

function customizeResumeDescription(description) {
  const resumeSection = document.querySelector("#resume");
  const descriptionElement = resumeSection.querySelector(".section-title p");
  descriptionElement.textContent = description;
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