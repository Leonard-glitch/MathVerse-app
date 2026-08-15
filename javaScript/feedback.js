/* ==========================================================================
   FEEDBACK MODAL – Auto-Inject & Logic (Global Error Styling)
   ========================================================================== */

(function () {

  const modalHTML = `
    <div id="feedbackModal" class="modal">
      <div class="modal-content">
        <span class="close-btn">&times;</span>

        <div id="feedbackFormContainer">
          <h2 class="feedback-header">Send feedback</h2>
          
          <form id="feedbackForm" novalidate>
            <label for="feedbackCategory" class="feedback-label">Category</label>
            <select id="feedbackCategory" class="feedback-select" required>
              <option value="" disabled selected hidden>Select a category...</option>
              <option value="Design">Design / UI</option>
              <option value="Tool missing">Suggest a new math tool</option>
              <option value="Bug">Report a bug</option>
              <option value="Other">Other</option>
            </select>

            <label for="feedbackText" class="feedback-label">Your message</label>
            <textarea id="feedbackText" class="feedback-textarea" rows="4" required placeholder="Write your feedback here..."></textarea>

            <!-- Verwende deine globale Fehler-Klasse -->
            <div id="feedbackError" class="errorMessagestyle"></div>

            <button type="submit" class="feedback-submit-btn">Send</button>
          </form>
        </div>

        <div id="feedbackSuccessMessage" class="success-container" style="display: none;">
          <div class="success-icon">&#10004;</div>
          <h3 class="success-header">Sent!</h3>
          <p class="success-text">Thank you, your feedback helps us improve Globomath even further.</p>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  document.addEventListener("DOMContentLoaded", () => {
    const modal         = document.getElementById("feedbackModal");
    const openBtn       = document.getElementById("openFeedbackBtn");
    const closeBtn      = modal.querySelector(".close-btn");
    const form          = document.getElementById("feedbackForm");
    const formContainer = document.getElementById("feedbackFormContainer");
    const successMsg    = document.getElementById("feedbackSuccessMessage");
    
    const categoryInput = document.getElementById("feedbackCategory");
    const textInput     = document.getElementById("feedbackText");
    const errorBox      = document.getElementById("feedbackError");

    if (!openBtn) return;

    // Hilfsfunktion zum Verstecken von Fehlern
    const hideError = () => {
      errorBox.style.display = "none";
      errorBox.textContent = "";
    };

    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      hideError();
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        hideError();
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Validierung
      if (!categoryInput.value) {
        errorBox.textContent = "Please select a category.";
        errorBox.style.display = "block";
        return;
      }

      if (!textInput.value.trim()) {
        errorBox.textContent = "Please write a message.";
        errorBox.style.display = "block";
        return;
      }

      // Bei Erfolg Fehler ausblenden
      hideError();

      const category = categoryInput.value;
      const message  = textInput.value;
      const page     = window.location.pathname;

      console.log("--- NEW FEEDBACK ---");
      console.log("Category:", category);
      console.log("Message:", message);
      console.log("Page:", page);

      formContainer.style.display = "none";
      successMsg.style.display    = "flex";

      setTimeout(() => {
        modal.style.display = "none";
        setTimeout(() => {
          form.reset();
          formContainer.style.display = "block";
          successMsg.style.display    = "none";
        }, 300);
      }, 2500);
    });

    // Fehler automatisch ausblenden, wenn der User mit der Eingabe beginnt
    categoryInput.addEventListener("change", hideError);
    textInput.addEventListener("input", hideError);
  });

})();