/* ==========================================================================
   FEEDBACK MODAL – Auto-Inject & Logic
   Include: <script src="/MathVerse-app/javaScript/feedback.js"></script>
   Requirements per page:
     - <link rel="stylesheet" href="/MathVerse-app/css/feedback.css">
     - <button id="openFeedbackBtn"> somewhere in the footer
   ========================================================================== */

(function () {

  const modalHTML = `
    <div id="feedbackModal" class="modal">
      <div class="modal-content">
        <span class="close-btn">&times;</span>

        <div id="feedbackFormContainer">
          <h2 class="feedback-header">Send feedback</h2>
          <form id="feedbackForm">
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

    if (!openBtn) return;

    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const category = document.getElementById("feedbackCategory").value;
      const message  = document.getElementById("feedbackText").value;
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
  });

})();