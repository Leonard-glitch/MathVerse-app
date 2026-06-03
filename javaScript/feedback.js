/* ==========================================================================
   FEEDBACK MODAL – Auto-Inject & Logic
   Einbinden: <script src="/MathVerse-app/javaScript/feedback.js"></script>
   Voraussetzung pro Seite:
     - <link rel="stylesheet" href="/MathVerse-app/css/feedback.css">
     - <button id="openFeedbackBtn"> irgendwo im Footer
   ========================================================================== */

(function () {

  // 1. Modal-HTML dynamisch in den Body injizieren
  const modalHTML = `
    <div id="feedbackModal" class="modal">
      <div class="modal-content">
        <span class="close-btn">&times;</span>

        <div id="feedbackFormContainer">
          <h2 class="feedback-header">Feedback senden</h2>
          <form id="feedbackForm">
            <label for="feedbackCategory" class="feedback-label">Kategorie</label>
            <select id="feedbackCategory" class="feedback-select" required>
              <option value="" disabled selected hidden>Wähle eine Kategorie...</option>
              <option value="Design">Design / UI</option>
              <option value="Tool fehlt">Neues Mathe-Tool vorschlagen</option>
              <option value="Bug">Fehler / Bug melden</option>
              <option value="Sonstiges">Sonstiges</option>
            </select>

            <label for="feedbackText" class="feedback-label">Deine Nachricht</label>
            <textarea id="feedbackText" class="feedback-textarea" rows="4" required placeholder="Schreibe hier dein Feedback..."></textarea>

            <button type="submit" class="feedback-submit-btn">Absenden</button>
          </form>
        </div>

        <div id="feedbackSuccessMessage" class="success-container" style="display: none;">
          <div class="success-icon">&#10004;</div>
          <h3 class="success-header">Übertragen!</h3>
          <p class="success-text">Vielen Dank, dein Feedback hilft uns die Mathe-Tools noch besser zu machen.</p>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // 2. Logik initialisieren sobald DOM bereit ist
  document.addEventListener("DOMContentLoaded", () => {
    const modal         = document.getElementById("feedbackModal");
    const openBtn       = document.getElementById("openFeedbackBtn");
    const closeBtn      = modal.querySelector(".close-btn");
    const form          = document.getElementById("feedbackForm");
    const formContainer = document.getElementById("feedbackFormContainer");
    const successMsg    = document.getElementById("feedbackSuccessMessage");

    // Kein Feedback-Button auf dieser Seite → nichts tun
    if (!openBtn) return;

    // Modal öffnen
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "block";
    });

    // Modal schließen (X)
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Modal schließen (Klick außerhalb)
    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });

    // Formular absenden
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const kategorie = document.getElementById("feedbackCategory").value;
      const nachricht = document.getElementById("feedbackText").value;
      const seite     = window.location.pathname;

      // Hier später Backend-Fetch einfügen
      console.log("--- NEUES FEEDBACK ---");
      console.log("Kategorie:", kategorie);
      console.log("Nachricht:", nachricht);
      console.log("Seite:",     seite);

      // Erfolgs-Screen anzeigen
      formContainer.style.display = "none";
      successMsg.style.display    = "flex";

      // Modal nach 2.5s automatisch schließen und zurücksetzen
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