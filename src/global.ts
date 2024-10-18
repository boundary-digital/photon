import { handleRadioClick, handleCheckboxClick, setupDropdowns, checkPersonalEmail } from './functions/functions';

(function introFormsControl() {
	const emailForms = Array.from(
		document.querySelectorAll(
			'[data-email-form]'
		) as NodeListOf<HTMLFormElement>
	);

	if (!emailForms.length) return;

	emailForms.forEach((form) => {
		const errorEl: HTMLElement = form.querySelector('[data-error-el]')!;

		form.addEventListener('submit', (e) => {
			e.preventDefault();
			errorEl.style.display = 'none';

			const formData = new FormData(form);


			const formDataObject: { [key: string]: any; } = {};
			formData.forEach((value, key) => {
				formDataObject[key] = value;
			});

			if (checkPersonalEmail(formDataObject['Email'])) {
				errorEl.style.display = 'block';
				return;
			}

			sessionStorage.clear();
			sessionStorage.setItem('formData', JSON.stringify(formDataObject));

			if (formDataObject['Role'] === 'Doctor/Medical Provider') {
				window.location.href = `/prescriber-signup`;
				return;
			}
			window.location.href = `/companyinfo`;
			return;
		});
	});
})();




(function handleClicks() {
	const radioDropdowns = document.querySelectorAll<HTMLElement>('[data-form-dropdown="radio"]');
	const checkBoxDropdowns = document.querySelectorAll<HTMLElement>('[data-form-dropdown="checkbox"]');
	const singleDropdowns = document.querySelectorAll('.form-dd.single-select');

	setupDropdowns(Array.from(radioDropdowns), '.dd-toggle-text', handleRadioClick);

	setupDropdowns(Array.from(checkBoxDropdowns), '.dd-toggle-text', (dropdown, toggleText) => {
		handleCheckboxClick(dropdown, toggleText, toggleText.textContent ?? '');
	});

	singleDropdowns.forEach((dropdown) => {
		const triggers = dropdown.querySelectorAll('input[type="radio"]');
		triggers.forEach((trigger) => {
			trigger.addEventListener('change', () => {
				const event = new Event("w-close");
				dropdown.dispatchEvent(event);
			});
		});
	});
})();