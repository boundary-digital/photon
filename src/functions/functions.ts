import type { DropdownHandler } from "@types";

export const handleRadioClick = (dropdown: HTMLElement, toggleText: HTMLElement) => {
  const radios = dropdown.querySelectorAll('.w-radio');
  radios.forEach((radio) => {
    const radioInput = radio.querySelector('input[type="radio"]')!;
    const radioLabel = radio.querySelector('.w-form-label')!;
    radioInput.addEventListener('click', () => {
      toggleText.textContent = radioLabel.textContent;
      toggleText.classList.add('active');
    });
  });
};

export const handleCheckboxClick = (dropdown: HTMLElement, toggleText: HTMLElement, defaultText: string) => {
  const checkBoxes = dropdown.querySelectorAll('.w-checkbox');
  let checkedCounter = 0;
  checkBoxes.forEach((checkBox) => {
    const checkBoxInput: HTMLInputElement = checkBox.querySelector('input[type="checkbox"]')!;
    checkBoxInput.addEventListener('click', () => {
      if (checkBoxInput.checked) {
        checkedCounter++;
      } else {
        checkedCounter--;
      }
      toggleText.textContent = checkedCounter ? `${checkedCounter} Item${checkedCounter > 1 ? 's' : ''} Selected` : defaultText;
      toggleText.classList.toggle('active', !!checkedCounter);
    });
  });
};

export function setupDropdowns(
  dropdowns: HTMLElement[],
  toggleTextSelector: string,
  handler: DropdownHandler
) {
  dropdowns.forEach((dropdown) => {
    const toggleText = dropdown.querySelector(toggleTextSelector) as HTMLElement;
    if (toggleText) {
      handler(dropdown, toggleText);
    }
  });
}