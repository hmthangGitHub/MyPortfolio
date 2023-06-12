function customizeContactSection(description, email, phone, location, iframeSrc) {
    const contactSection = document.querySelector('#contact');
    const descriptionElement = contactSection.querySelector('.section-title p');
    const emailElement = contactSection.querySelector('.email p');
    const phoneElement = contactSection.querySelector('.phone p');
    const locationElement = contactSection.querySelector('.address p');
    const iframeElement = contactSection.querySelector('iframe');
  
    // Update the content of the description, email, phone, and location elements
    descriptionElement.textContent = description;
    emailElement.textContent = email;
    phoneElement.textContent = phone;
    locationElement.textContent = location;
  
    // Update the src attribute of the iframe element
    iframeElement.src = iframeSrc;
}

export function customizeContactSections()
{
    customizeContactSection(
        'Feel free to reach out to me for any inquiries, collaboration opportunities, or simply to say hello.',
        'hoangmanhthang795@gmail.com',
        '+84 903 786 654',
        'Binh Thanh, HCM, VN',
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1550323490937!2d106.69098151153203!3d10.79943565872264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528c5dd7cf211%3A0x2d36515e500e098a!2zVuG6oW4gS2nhur9wLCBCw6xuaCBUaOG6oW5oLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1684868377479!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
      );
}

