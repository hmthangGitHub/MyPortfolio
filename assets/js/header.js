
export function customizeHeader()
{
    customizeHeaderInformation(
        "Hoang Manh Thang",
        "assets/img/profile-img.jpg",
        "https://www.facebook.com/bane00001/",
        "https://join.skype.com/invite/omm09WjeIH1g",
        "https://www.linkedin.com/in/thang-hoang-07918a190/"
      );
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
  