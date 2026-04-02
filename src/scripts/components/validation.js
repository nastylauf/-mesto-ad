export function showInputError(
  formElement,
  inputElement,
  errorMessage,
  settings,
) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(settings.inputErrorClass);

  if (errorElement) {
    errorElement.textContent =
      inputElement.dataset.errorMessage || errorMessage;
    errorElement.classList.add(settings.errorClass);
  }
}

export function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(settings.inputErrorClass);

  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(settings.errorClass);
  }
}

export function checkInputValidity(formElement, inputElement, settings) {
  if (inputElement.pattern && inputElement.value) {
    const regex = new RegExp(inputElement.pattern);
    if (!regex.test(inputElement.value)) {
      if (inputElement.dataset.errorMessage) {
        showInputError(
          formElement,
          inputElement,
          inputElement.dataset.errorMessage,
          settings,
        );
        return false;
      }
    }
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings,
    );
    return false;
  }

  hideInputError(formElement, inputElement, settings);
  return true;
}

export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

export function disableSubmitButton(buttonElement, settings) {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.disabled = true;
}

export function enableSubmitButton(buttonElement, settings) {
  buttonElement.classList.remove(settings.inactiveButtonClass);
  buttonElement.disabled = false;
}

export function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, settings);
  } else {
    enableSubmitButton(buttonElement, settings);
  }
}

export function setEventListeners(formElement, settings) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector),
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector,
  );

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

export function clearValidation(formElement, settings) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector),
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector,
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
  });

  disableSubmitButton(buttonElement, settings);
}

export function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, settings);
  });
}
