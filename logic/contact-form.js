(function () {
  const FORM_ENDPOINT = "https://api.web3forms.com/submit";
  const CHECK_TIMEOUT_MS = 8000;
  const UNAVAILABLE_MESSAGE =
    "Het formulier is momenteel niet beschikbaar, gelieve telefonisch contact op te nemen.";

  async function isFormServiceAvailable() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CHECK_TIMEOUT_MS);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "GET",
        mode: "cors",
        cache: "no-store",
        signal: controller.signal,
      });
      return response.status > 0 && response.status < 500;
    } catch {
      return false;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  function showError(errorEl) {
    errorEl.textContent = UNAVAILABLE_MESSAGE;
    errorEl.hidden = false;
    errorEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function hideError(errorEl) {
    errorEl.textContent = "";
    errorEl.hidden = true;
  }

  function initWeb3Form(form) {
    const errorId = form.getAttribute("data-error-id");
    const errorEl = errorId ? document.getElementById(errorId) : null;
    if (!errorEl) return;

    const submitBtn = form.querySelector(".submit-btn");
    const defaultBtnHtml = submitBtn ? submitBtn.innerHTML : "";
    let allowNativeSubmit = false;

    form.addEventListener("submit", async function (event) {
      if (allowNativeSubmit) return;

      event.preventDefault();
      hideError(errorEl);

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Bezig met controleren...";
      }

      const available = await isFormServiceAvailable();

      if (!available) {
        showError(errorEl);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = defaultBtnHtml;
        }
        return;
      }

      allowNativeSubmit = true;
      form.submit();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-web3forms]").forEach(initWeb3Form);
  });
})();
