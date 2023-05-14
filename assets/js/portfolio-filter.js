import { select, on } from "./common.js";


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

export function createPortfolioSection() {
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
				AOS.refresh()
			});

		}, true);
	}
}


