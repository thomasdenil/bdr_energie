(function () {
  const SUBMIT_TIMEOUT_MS = 15000;
  const UNAVAILABLE_MESSAGE =
    "Het formulier is momenteel niet beschikbaar, gelieve telefonisch contact op te nemen.";

  function showError(errorEl) {
    errorEl.textContent = UNAVAILABLE_MESSAGE;
    errorEl.hidden = false;
    errorEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function hideError(errorEl) {
    errorEl.textContent = "";
    errorEl.hidden = true;
  }

  function getRedirectUrl(form, formData) {
    const redirect = formData.get("redirect");
    if (!redirect) return "./form-completed.html";
    try {
      return new URL(redirect, window.location.href).href;
    } catch {
      return "./form-completed.html";
    }
  }

  function initWeb3Form(form) {
    const errorId = form.getAttribute("data-error-id");
    const errorEl = errorId ? document.getElementById(errorId) : null;
    if (!errorEl) return;

    const submitBtn = form.querySelector(".submit-btn");
    const defaultBtnHtml = submitBtn ? submitBtn.innerHTML : "";

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      hideError(errorEl);

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Bezig met verzenden...";
      }

      let succeeded = false;

      try {
        const formData = new FormData(form);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const data = await response.json();
        if (data.success) {
          succeeded = true;
          window.location.href = getRedirectUrl(form, formData);
          return;
        }

        showError(errorEl);
      } catch {
        showError(errorEl);
      } finally {
        if (!succeeded && submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = defaultBtnHtml;
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-web3forms]").forEach(initWeb3Form);
  });
})();
