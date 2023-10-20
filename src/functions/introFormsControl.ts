export default function introFormsControl() {
	const emailForms = Array.from(
		document.querySelectorAll(
			'[data-email-form]'
		) as NodeListOf<HTMLFormElement>
	);

	if (!emailForms.length) return;

	emailForms.forEach((form) => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const formData = new FormData(form);
			const formDataObject: { [key: string]: any } = {};
			formData.forEach((value, key) => {
				formDataObject[key] = value;
			});

			sessionStorage.clear();
			sessionStorage.setItem('formData', JSON.stringify(formDataObject));

			// check if formData has Role
			if (formDataObject['Role'] === 'Doctor/Medical Provider') {
				window.location.href = `/verify-provider-details-photon`;
				return;
			}
			window.location.href = `/companyinfo`;
			return;
		});
	});
}
