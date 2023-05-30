import { select, on } from "./common.js";
import { MasterLoader } from "./masterData/MasterLoader.js";
import { MasterProjectMetaDataType, MasterProjectCategoryType } from "./masterData/Enum.js";

export async function createPortfolioSection() {
	// Get the paragraph element inside the Portfolio section
	customizePorfolioDescription();
	await createPortfolioItems();
	createPortfolioFilters();
    const portfolioLightbox = GLightbox({
		selector: '.portfolio-lightbox'
	  });
}

function customizePorfolioDescription() {
	const portfolioSection = document.querySelector('#portfolio');
	const paragraphElement = portfolioSection.querySelector('.section-title p');

	// Update the content of the paragraph element
	paragraphElement.textContent = 'Your custom content goes here';
}

function createPortfolioFilters() {
	let portfolioContainer = select('.portfolio-container');
	if (portfolioContainer) {
		let portfolioIsotope = new Isotope(portfolioContainer, {
			itemSelector: '.portfolio-item'
		});

		let portfolioFilterArray = select('#portfolio-flters li', true);
		const portfolioFilters = document.querySelector('#portfolio-flters');

		// Remove the mockup children
		for (let i = portfolioFilterArray.length - 1; i > 0; i--) {
			portfolioFilterArray[i].remove();
		}

		// Add the original filters
		createFilter(portfolioFilters, portfolioFilterArray[0], '*', 'All');
		for (const key in MasterProjectCategoryType) {
			if (MasterProjectCategoryType.hasOwnProperty(key)) {
			  const value = MasterProjectCategoryType[key];
			  const filterClass = `.filter-${key.toLowerCase()}`;
			  const filterName = value;
			  createFilter(portfolioFilters, portfolioFilterArray[0], filterClass, filterName);
			}
		}

		// Set the first filter as active
		portfolioFilterArray = select('#portfolio-flters li', true);
		portfolioFilterArray[1].classList.add('filter-active');

		on('click', '#portfolio-flters li', function (e) {
			e.preventDefault();
			portfolioFilterArray.forEach(function (el) {
				el.classList.remove('filter-active');
			});
			this.classList.add('filter-active');

			portfolioIsotope.arrange({
				filter: this.getAttribute('data-filter')
			});
			portfolioIsotope.on('arrangeComplete', function () {
				AOS.refresh();
			});

		}, true);

		setTimeout(() => {
			portfolioIsotope.arrange({
			});
			portfolioIsotope.on('arrangeComplete', function () {
				AOS.refresh();
			});
		console.log('Animation ended!');
		}, 50);
	}
}

export function createFilter(container, template, dataFilter, name) {
	// Clone the template element and remove the "visibility: hidden" style
	const filter = template.cloneNode(true);
	filter.removeAttribute("style");

	// Set the data-filter attribute and text content of the filter
	filter.setAttribute("data-filter", dataFilter);
	filter.textContent = name;

	// Append the new filter to the container
	container.appendChild(filter);
}

export function createPortfolioItem(container, template, imgSrc, projectName, projectId, category) {
	const portfolioItem = template.cloneNode(true);
	portfolioItem.style.visibility = "visible";
	var filterClass = `.filter-${category.toLowerCase()}`;
	portfolioItem.classList.add(filterClass);

	const portfolioWrap = portfolioItem.querySelector(".portfolio-wrap");
	const portfolioImg = portfolioWrap.querySelector("img");

	portfolioImg.setAttribute("src", imgSrc);
	portfolioImg.setAttribute("href", imgSrc);
	portfolioImg.setAttribute("alt", projectName);

	const portfolioLinks = portfolioWrap.querySelector(".portfolio-links");
	const lightboxLink = portfolioLinks.querySelector(".portfolio-lightbox");
	lightboxLink.setAttribute("href", imgSrc);
	lightboxLink.setAttribute("title", projectName);

	const detailsLink = portfolioLinks.querySelector("[title='More Details']");
	const detailsUrl = `portfolio-details.html?title=${encodeURIComponent(projectId)}`;
	detailsLink.setAttribute("href", detailsUrl);

	container.appendChild(portfolioItem);
}


async function createPortfolioItems() {
	const container = document.querySelector(".portfolio-container");
	let template = container.querySelector('[class*="col-lg-4 col-md-6 portfolio-item"]');
	
	// Load the MasterProjectContainer
	const projectContainer = await MasterLoader.createInstance("MasterProjectContainer");
	
	// Get all projects from the container
	const projects = await projectContainer.getAll();
	
	// Load the MasterProjectMetaDataContainer
	const metaDataContainer = await MasterLoader.createInstance("MasterProjectMetaDataContainer");
	
	// Iterate over each project
	for (const project of projects) {
	  // Get the list of metadata for the project
	  const metaDataList = metaDataContainer.getListByMasterProjectIndexer(project.master_project_id);
	  
	  // Find the first metadata item with type 'Thumbnail'
	  const thumbnailMeta = metaDataList.find(meta => meta.master_project_meta_data_type === MasterProjectMetaDataType.Thumbnail);
	  
	  // Check if thumbnail metadata is found
	  if (thumbnailMeta) {
		// Get the image URL from the 'value' column
		const imageUrl = thumbnailMeta.value;
		
		// Create a portfolio item with the image URL and other project details
		createPortfolioItem(container, template, imageUrl, project.project_name, project.master_project_id, project.category);
	  }
	}
	
	template.style.display = "none";
	template.remove();
  }