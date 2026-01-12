const form = document.getElementById("contactForm");
const status = document.getElementById("contactStatus");

const formspree_url = "https://formspree.io/f/xdaaznvd";

const setStatus = (message, type) => {
  if (!status) {
    return;
  }

  status.textContent = message;
  status.classList.remove("text-success", "text-danger");
  status.classList.add(type === "success" ? "text-success" : "text-danger");
};

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // stop default redirect

  const data = new FormData(form);

  try {
    const response = await fetch(formspree_url, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setStatus("Form submitted successfully.", "success");
      form.reset();
    } else {
      setStatus("Something went wrong. Please try again.", "error");
    }
  } catch (error) {
    setStatus("Something went wrong. Please try again.", "error");
  }
});