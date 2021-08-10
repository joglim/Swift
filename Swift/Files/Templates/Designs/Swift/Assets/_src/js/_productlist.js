const ProductList = function () {

	return {
		init: function () {
			//Auto initialize
			document.querySelectorAll(".js-product-list").forEach(function (el) {
				ProductList.Update(el);
			});
		},

		Update: async function (e) {
			var clickedButton = e.currentTarget != undefined ? e.currentTarget : e;
			var form = clickedButton.closest("form");
			var responseTargetElement = document.querySelector("#" + form.getAttribute("data-response-target-element"));
			var preloader = form.getAttribute("data-preloader");

			if (preloader != "inline") {
				var addPreloaderTimer = setTimeout(function () {
					var overlayElement = document.createElement('div');
					overlayElement.className = "preloader-overlay";
					overlayElement.setAttribute('id', "overlay");
					var overlayElementIcon = document.createElement('div');
					overlayElementIcon.className = "spinner-border";
					overlayElementIcon.style.top = window.pageYOffset + "px";
					overlayElement.appendChild(overlayElementIcon);

					if (form) {
						form.parentNode.insertBefore(overlayElement, form);
					}
				}, 200); //Small delay to secure that the preloader is not loaded all the time
			} else {
				var addPreloaderTimer = setTimeout(function () {
					var preloaderElement = document.createElement('div');
					preloaderElement.className = "preloader";
					responseTargetElement.appendChild(preloaderElement);
				}, 200); //Small delay to secure that the preloader is not loaded all the time
			}

			let formData = new FormData(form);
			var fetchOptions = {
				method: 'POST',
				body: formData
			};
			let response = await fetch(form.action, fetchOptions);

			if (response.ok) {
				//Update URL
				let url = window.location.origin + window.location.pathname;
				const newParams = new URLSearchParams(formData);
				let updateUrl = "true";

				if (form.getAttribute("data-update-url") != undefined) {
					updateUrl = form.getAttribute("data-update-url"); 
				}

				if (updateUrl != "false") {
					url += "?" + newParams.toString();
					window.history.replaceState({}, '', decodeURI(url));
				}

				//Success
				ProductList.Success(response, responseTargetElement, addPreloaderTimer, formData);
			} else {
				ProductList.Error(response, responseTargetElement, addPreloaderTimer);
			}
		},

		Success: async function (response, responseTargetElement, addPreloaderTimer, formData) {
			clearTimeout(addPreloaderTimer);

			//Remove preloader
			if (document.querySelector("#overlay")) {
				document.querySelector("#overlay").parentNode.removeChild(document.querySelector("#overlay"));
			}

			//Replace content
			let html = await response.text().then(function (text) {
				return text;
			});

			responseTargetElement.innerHTML = html;

			//Initialize all the sliders
			Sliders.init();

			//Modal
			var requestType = formData.get("RequestType");

			if (screen.width < 768 && document.querySelector('#FacetsModal') && requestType != "UpdateList") {
				var facetsModal = new Modal(document.querySelector('#FacetsModal'), { backdrop: false });
				facetsModal.show();

				var backdrop = document.querySelector('.modal-backdrop');
				if (backdrop) {
					backdrop.parentElement.removeChild(backdrop);
				}
			}
		},

		Error: function (e, responseTargetElement, addPreloaderTimer) {
			clearTimeout(addPreloaderTimer);

			if (document.querySelector("#overlay")) {
				document.querySelector("#overlay").parentNode.removeChild(document.querySelector("#overlay"));
			}
		},

		ResetFacets: async function (e) {
			var clickedButton = e.currentTarget;
			var form = clickedButton.closest("form");

			form.querySelectorAll("input[type='checkbox']").forEach(function (el) {
				el.checked = false;
			});

			ProductList.Update(e);
		}
	}

}();

export { ProductList };