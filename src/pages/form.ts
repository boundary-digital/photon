interface FormData {
	[key: string]: string | undefined;
}

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

		for (let input of inputs) {
			if (input.type === 'radio') {
				if (input.value === formData[key]) {
					const toggleText: HTMLElement = input
						.closest('.w-dropdown')
						.querySelector('.dd-toggle-text');
					input.previousElementSibling.classList.add('w--redirected-checked');
					input.setAttribute('checked', 'checked');
					toggleText.textContent = input.value;
					toggleText.classList.add('active');
				}
				continue;
			}
			input.value = formData[key];
			input.setAttribute('disabled', 'disabled');
		}
	}
}
