import type { FormData } from '../../types';

export default function formPage() {
	const bigForm = document.querySelector(
		'form[data-recipient-form]'
	) as HTMLFormElement;

	if (!bigForm || !sessionStorage.length) return;

	const formData: FormData = JSON.parse(
		sessionStorage.getItem('formData') || '{}'
	);

	sessionStorage.clear();

	for (const key in formData) {
		const inputs = Array.from(
			bigForm.querySelectorAll(`input[name="${key}"]`)
		) as HTMLInputElement[];

		if (!inputs.length) continue;

		inputs.forEach((input) => {
			const isRadio = input.type === 'radio';
			const isMatchingValue = input.value === formData[key];

			if (isRadio && isMatchingValue) {
				const dropdown = input.closest('.w-dropdown');
				const toggleText: HTMLElement | null = dropdown ? dropdown.querySelector('.dd-toggle-text') : null;

				if (input.previousElementSibling) {
					input.previousElementSibling.classList.add('w--redirected-checked');
				}

				input.setAttribute('checked', 'checked');

				if (toggleText) {
					toggleText.textContent = input.value;
					toggleText.classList.add('active');
				}
			}

			input.value = formData[key] || '';
			input.setAttribute('disabled', 'disabled');
		});
	}
}
