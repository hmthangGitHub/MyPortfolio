import { MasterLoader } from './masterData/MasterLoader.js';
import { MasterProjectMetaDataType } from './masterData/Enum.js';

export async function loadProjectInfomationAsync(masterProjectId) {
  const portfolioDetailsSection = document.getElementById('portfolio-details');
  const spinnerElement = portfolioDetailsSection.querySelector('.spinner-border');
  spinnerElement.style.display = 'block';

  await loadProjectBriefInformations(masterProjectId);
  await loadMasterProjectDetails(masterProjectId);

  spinnerElement.style.display = 'none';
  const rowGy4Element = document.querySelector('.row.gy-4');
  rowGy4Element.style.visibility = 'visible';
}

async function loadProjectBriefInformations(masterProjectId) {
  var masterProjectContainer = await MasterLoader.createInstance("MasterProjectContainer");
  var masterProject = masterProjectContainer.getById(masterProjectId);

  customizeProjectInfomations(masterProject.project_name,
    masterProject.category,
    masterProject.date,
    masterProject.url,
    masterProject.description);
}

async function loadMasterProjectDetails(masterProjectId) {
  // Load MasterProjectMetaDataContainer using MasterLoader
  const masterProjectContainer = await MasterLoader.createInstance("MasterProjectMetaDataContainer");

  // Get all MasterProjectMetaData with the same masterProjectId
  const masterProjectMetaDataList = masterProjectContainer.getListByMasterProjectIndexer(masterProjectId);

  // Reference to the swiper wrapper element
  const swiperWrapper = document.querySelector('.portfolio-details-slider .swiper-wrapper');

  // Loop through MasterProjectMetaData to create elements
  masterProjectMetaDataList.forEach((metadata) => {
    if (metadata.master_project_meta_data_type === MasterProjectMetaDataType.ScreenShot) {
      // Create ImageSlide
      const imageSlide = createImageSlide(metadata.value);
      swiperWrapper.appendChild(imageSlide);
    } else if (metadata.master_project_meta_data_type === MasterProjectMetaDataType.Video) {
      // Create YouTube slide
      const youtubeSlide = createYouTubeSlide(metadata.value);
      swiperWrapper.appendChild(youtubeSlide);
    } else if (metadata.master_project_meta_data_type === MasterProjectMetaDataType.Html5) {
      // Create YouTube slide
      const html5Game = createHtml5Game(metadata.value);
      swiperWrapper.appendChild(html5Game);
    }
  });
}

function customizeProjectInfomations(projectName, category, projectDate, projectURL, description) {
  // Customize Project Information
  const projectNameElement = document.querySelector('.portfolio-info li:nth-child(1)');
  const categoryElement = document.querySelector('.portfolio-info li:nth-child(2)');
  const projectDateElement = document.querySelector('.portfolio-info li:nth-child(3)');
  const projectURLElement = document.querySelector('.portfolio-info li:nth-child(4)');

  projectNameElement.innerHTML = `<strong>Project Name</strong>: ${projectName}`;
  categoryElement.innerHTML = `<strong>Category</strong>: ${category}`;
  projectDateElement.innerHTML = `<strong>Project date</strong>: ${projectDate}`;
  projectURLElement.innerHTML = `<strong>Project URL</strong>: <a href="${projectURL}">${projectURL}</a>`;

  // Customize Portfolio Description
  const portfolioDescriptionElement = document.querySelector('.portfolio-description p');
  let formattedDescription = description.replace(/\n/g, '<br>');
  formattedDescription = description.replace(/\\n/g, '<br>');
  portfolioDescriptionElement.innerHTML = formattedDescription;
}

function createYouTubeSlide(videoId) {
  const slideContainer = document.createElement('div');
  slideContainer.classList.add('swiper-slide');

  const videoContainer = document.createElement('div');
  videoContainer.style.position = 'relative';
  videoContainer.style.width = '100%';
  videoContainer.style.paddingBottom = '56.25%';

  const videoIframe = document.createElement('iframe');
  videoIframe.style.position = 'absolute';
  videoIframe.style.top = '0';
  videoIframe.style.left = '0';
  videoIframe.style.width = '100%';
  videoIframe.style.height = '100%';
  videoIframe.src = `https://www.youtube.com/embed/${videoId}`;
  videoIframe.title = 'YouTube video player';
  videoIframe.frameBorder = '0';
  videoIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  videoIframe.allowFullscreen = true;

  videoContainer.appendChild(videoIframe);
  slideContainer.appendChild(videoContainer);

  return slideContainer;
}

function createImageSlide(imageSrc) {
  const slideContainer = document.createElement('div');
  slideContainer.classList.add('swiper-slide');

  const imageElement = document.createElement('img');
  imageElement.src = imageSrc;
  imageElement.alt = '';

  slideContainer.appendChild(imageElement);

  return slideContainer;
}

function createHtml5Game(gameSrc) {
  const slideContainer = document.createElement('div');
  slideContainer.classList.add('swiper-slide');

  const gameContainer = document.createElement('div');
  gameContainer.style.position = 'relative';
  gameContainer.style.width = '100%';
  gameContainer.style.paddingBottom = '56.25%';

  const iframeElement = document.createElement('iframe');
  iframeElement.src = gameSrc;
  iframeElement.frameBorder = '0';
  iframeElement.allowFullscreen = true;
  iframeElement.style.position = 'absolute';
  iframeElement.style.top = '0px';
  iframeElement.style.left = '0px';
  iframeElement.style.width = '100%';
  iframeElement.style.height = '100%';

  gameContainer.appendChild(iframeElement);
  slideContainer.appendChild(gameContainer);

  return slideContainer;
}
