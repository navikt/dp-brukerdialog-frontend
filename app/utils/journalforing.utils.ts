import journalforingCss from "~/journalforing.css?inline";

export function getJouralforingPdfHtml() {
  const mainContent = document.getElementById("maincontent");

  if (mainContent) {
    // Clone the main content element (deep clone)
    const clonedMainContent = mainContent.cloneNode(true) as HTMLElement;

    // Get all input and textarea elements inside the cloned element
    const formElements = clonedMainContent.querySelectorAll("input, textarea");

    // Sync values of form inputs to ensure they reflect the current state
    formElements.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        if (input.type === "hidden") {
          input.value = "";
        }
        // For <input> elements (checkboxes, radio buttons, text inputs)
        if (input.type === "checkbox" || input.type === "radio") {
          // Handle checkboxes and radio buttons
          if (input.checked) {
            input.setAttribute("checked", "checked");
          } else {
            input.removeAttribute("checked");
          }
        } else {
          // Handle text input and other types
          input.setAttribute("value", input.value);
        }
      } else if (input instanceof HTMLTextAreaElement) {
        input.innerHTML = input.value;
      }
    });

    // Get the inner HTML of the cloned #maincontent element
    // Set the inner HTML of the cloned element to the state
    const body = clonedMainContent.innerHTML;
    const html = `<!DOCTYPE html><html><head><title>Brukerdialog - Din inntekt</title><style>${journalforingCss}</style></head><body>${body}</body></html>`;

    // Remove all &nbsp; from the HTML
    return html.replace(/&nbsp;/g, " ");
  }
}
