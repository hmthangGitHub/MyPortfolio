
import { MasterLoader } from './masterData/MasterLoader.js';

export async function customizeHeader() {
    // Load MasterPersonalInformationContainer using CreateInstance
    const headerElement = document.getElementById('header');
    // Show loading spinner
    const spinnerElement = headerElement.querySelector('.spinner-border');
    spinnerElement.style.display = 'flex';
    const contentElement = headerElement.querySelector('.d-flex.flex-column');
    contentElement.style.visibility = 'hidden';

    const masterPersonalInformationContainer = await MasterLoader.createInstance("MasterPersonalInformationContainer");
    // Get the first MasterPersonalInformation object
    const masterPersonalInformation = masterPersonalInformationContainer.getCurrentInformation();

    // Extract the required data
    const {
      name,
      headerImage,
      facebook,
      skype,
      linked_in
    } = masterPersonalInformation;

    // Call customizeHeaderInformation with the extracted data
    customizeHeaderInformation(name, headerImage, facebook, skype, linked_in);

    contentElement.style.visibility = 'visible';
    spinnerElement.style.display = 'none';
}

function customizeHeaderInformation(name, imageSrc, facebookLink, skypeLink, linkedinLink) {
    const nameElement = document.querySelector("#header .profile h1.text-light a");
    const imageElement = document.querySelector("#header .profile img");
    const facebookElement = document.querySelector("#header .profile .social-links .facebook");
    const skypeElement = document.querySelector("#header .profile .social-links .google-plus");
    const linkedinElement = document.querySelector("#header .profile .social-links .linkedin");
  
    nameElement.textContent = name;
    imageElement.src = imageSrc;
    facebookElement.href = facebookLink;
    skypeElement.href = skypeLink;
    linkedinElement.href = linkedinLink;
}