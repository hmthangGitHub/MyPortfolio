import { select, on } from "./common.js";




export function createPortfolioSection() {
	createPortfolioItems();
	createPortfolioFilters();
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
		createFilter(portfolioFilters, portfolioFilterArray[0], '.filter-app', 'App');
		createFilter(portfolioFilters, portfolioFilterArray[0], '.filter-card', 'Card');
		createFilter(portfolioFilters, portfolioFilterArray[0], '.filter-web', 'Web');

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

		const something = document.querySelector('.portfolio-container aos-init aos-animate');
		// setTimeout(() => {
		// 	portfolioIsotope.arrange({
		// 	});
		// 	portfolioIsotope.on('arrangeComplete', function () {
		// 		AOS.refresh();
		// 	});
		// console.log('Animation ended!');
		// }, 50);
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

export function createPortfolioItem(container, template, imgSrc, title) {
	const portfolioItem = template.cloneNode(true);
	portfolioItem.style.visibility = "visible";
	portfolioItem.classList.add("filter-app");

	const portfolioWrap = portfolioItem.querySelector(".portfolio-wrap");
	const portfolioImg = portfolioWrap.querySelector("img");

	portfolioImg.setAttribute("src", imgSrc);
	portfolioImg.setAttribute("href", imgSrc);
	portfolioImg.setAttribute("alt", title);

	const portfolioLinks = portfolioWrap.querySelector(".portfolio-links");
	const lightboxLink = portfolioLinks.querySelector(".portfolio-lightbox");
	lightboxLink.setAttribute("href", imgSrc);
	lightboxLink.setAttribute("title", title);

	const detailsLink = portfolioLinks.querySelector("[title='More Details']");
	const detailsUrl = `portfolio-details.html?title=${encodeURIComponent(title)}`;
	detailsLink.setAttribute("href", detailsUrl);

	container.appendChild(portfolioItem);
}


function createPortfolioItems() {
	const container = document.querySelector(".portfolio-container");
	let template = container.querySelector('[class*="col-lg-4 col-md-6 portfolio-item"]');
	// template.style.visibility = "hidden";
	// element.style.visibility = "hidden";
	createPortfolioItem(container, template, "assets/img/portfolio/portfolio-2.jpg", "App 10");
	createPortfolioItem(container, template, "assets/img/portfolio/portfolio-2.jpg", "App 11");
	createPortfolioItem(container, template, "assets/img/portfolio/portfolio-2.jpg", "App 12");
	// template.style.visibility = "hidden";
	template.style.display = "none";
	template.remove();
}