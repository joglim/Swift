import * as bootstrap from 'bootstrap';
import * as htmx from 'htmx.org';
import { Favorites } from './_favorites';
import { Cart } from './_cart';
import { Scroll } from './_scroll';
import { ProductList } from './_productlist';
import { PageUpdater } from './_pageupdater';
import { LocationsMap } from './_locationsmap';
import { Places } from './_places';
import { ProductExport } from './_productexport';
import { StaticVariants } from './_staticvariants';
import { VariantSelector } from './_variantselector';
import { Video } from './_video';
import { Typeahead } from './_typeahead';
import { AssetLoader } from './_assetLoader';
import { LiveProductInfo } from './_live-product-info';

//Bootstrap
window.bootstrap = bootstrap;
window.htmx = htmx;

//Swift modules
const swift = function () {
	return {
		Cart: Cart,
		Favorites: Favorites,
		Scroll: Scroll,
		ProductList: ProductList,
		PageUpdater: PageUpdater,
		LocationsMap: LocationsMap,
		Places: Places,
		ProductExport: ProductExport,
		StaticVariants: StaticVariants,
		VariantSelector: VariantSelector,
		Typeahead: Typeahead,
		Video: Video,
		AssetLoader: AssetLoader,
		LiveProductInfo: LiveProductInfo
	}
}();
export { swift };

window.swift = swift;

htmx.logger = function (elt, event, data) {
	if (console) {
		console.log(event, elt, data);
	}
}

//Popstate
window.onpopstate = function (event) {
	swift.Typeahead.navigateToPage(document.location.href);
};

window.addEventListener('DOMContentLoaded', () => {
	const dropdowns = document.querySelectorAll('.js-dropdown');

	dropdowns.forEach(dropdown => {
		const dropdownToggle = dropdown.querySelector('.js-dropdown-toggle');

		if (dropdownToggle) {
			dropdown.addEventListener('mouseover', () => {
				new bootstrap.Dropdown(dropdownToggle).toggle();
				dropdownToggle.style.outline = "none";
			});
			dropdown.addEventListener('mouseout', () => new bootstrap.Dropdown(dropdownToggle).toggle());
		}
	});
});

