const form = document.getElementById("contactForm");
const statusEl = document.getElementById("contactStatus");

const setStatus = (message, type) => {
  if (!statusEl) {
    return;
  }

  statusEl.textContent = message;
  statusEl.classList.remove("text-success", "text-danger");
  if (message) {
    statusEl.classList.add(type === "success" ? "text-success" : "text-danger");
  }
};

if (form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const buttonLabel = submitButton ? submitButton.querySelector(".btn-text") : null;
  const idleLabel = buttonLabel ? buttonLabel.textContent : "";
  let isSubmitting = false;

  const setSubmitting = (submitting) => {
    isSubmitting = submitting;
    if (submitButton) {
      submitButton.disabled = submitting;
    }
    if (buttonLabel) {
      buttonLabel.textContent = submitting ? "Sending…" : idleLabel;
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop default redirect

    if (isSubmitting) {
      return;
    }

    if (!form.reportValidity()) {
      return;
    }

    setStatus("", "success");
    setSubmitting(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
        signal: controller.signal,
      });

      if (response.ok) {
        setStatus("Thanks! Your message is on its way — we'll get back to you soon.", "success");
        form.reset();
      } else {
        let message = "Something went wrong on our end. Please try again, or email hello@byteweave.studio.";
        try {
          const data = await response.json();
          if (data && Array.isArray(data.errors) && data.errors.length) {
            message = data.errors.map((err) => err.message).join(" ");
          }
        } catch (parseError) {
          // keep the generic message
        }
        setStatus(message, "error");
      }
    } catch (error) {
      const message = error.name === "AbortError"
        ? "This is taking longer than expected. Please check your connection and try again."
        : "We couldn't reach the server. Please check your connection, or email hello@byteweave.studio.";
      setStatus(message, "error");
    } finally {
      clearTimeout(timeout);
      setSubmitting(false);
    }
  });
}
