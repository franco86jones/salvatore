/**
 * contact.js
 * Delicatessen Salvatore
 *
 * Client-side validation and success feedback for the contact form.
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  const successMessage = document.querySelector("#contact-success");

  if (!form || !successMessage) {
    return;
  }

  const fields = {
    name: form.querySelector("#contact-name"),
    email: form.querySelector("#contact-email"),
    subject: form.querySelector("#contact-subject"),
    message: form.querySelector("#contact-message"),
    privacy: form.querySelector("#contact-privacy"),
  };

  const errors = {
    name: form.querySelector("#contact-name-error"),
    email: form.querySelector("#contact-email-error"),
    subject: form.querySelector("#contact-subject-error"),
    message: form.querySelector("#contact-message-error"),
    privacy: form.querySelector("#contact-privacy-error"),
  };

  const messages = {
    name: "Por favor ingresa tu nombre completo",
    email: "Por favor ingresa un correo electronico valido",
    subject: "Por favor selecciona un asunto",
    message: "Por favor escribe tu mensaje (minimo 10 caracteres)",
    privacy: "Debes aceptar el aviso de privacidad para continuar",
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setError = (key, hasError) => {
    const field = fields[key];
    const error = errors[key];

    if (!field || !error) {
      return;
    }

    field.classList.toggle("is-error", hasError);
    error.textContent = hasError ? messages[key] : "";
  };

  const validate = () => {
    const results = {
      name: fields.name.value.trim().length >= 2,
      email: emailPattern.test(fields.email.value.trim()),
      subject: Boolean(fields.subject.value),
      message: fields.message.value.trim().length >= 10,
      privacy: fields.privacy.checked,
    };

    Object.entries(results).forEach(([key, isValid]) => {
      setError(key, !isValid);
    });

    return results;
  };

  Object.values(fields).forEach((field) => {
    field.addEventListener("input", () => {
      validate();
    });
  });

  fields.subject.addEventListener("change", validate);
  fields.privacy.addEventListener("change", validate);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const results = validate();
    const firstInvalidKey = Object.keys(results).find((key) => !results[key]);

    if (firstInvalidKey) {
      fields[firstInvalidKey].focus();
      return;
    }

    Array.from(form.children).forEach((child) => {
      if (child !== successMessage) {
        child.hidden = true;
      }
    });

    successMessage.hidden = false;
    successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
