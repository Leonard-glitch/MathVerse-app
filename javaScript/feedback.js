/* ==========================================================================
   HIGH-TECH FEEDBACK MODAL LOGIC
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Elemente aus dem DOM holen
  const modal = document.getElementById("feedbackModal");
  const openBtn = document.getElementById("openFeedbackBtn");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("feedbackForm");
  const formContainer = document.getElementById("feedbackFormContainer");
  const successMessage = document.getElementById("successMessage");

  // Sicherheitsabfrage: Nur ausführen, wenn die Elemente auf der Seite existieren
  if (!modal || !openBtn) return;

  // 1. Fenster öffnen bei Klick auf den Feedback-Button
  openBtn.addEventListener("click", (event) => {
    event.preventDefault();
    modal.style.display = "block";
  });

  // 2. Fenster schließen bei Klick auf das "X"
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // 3. Fenster schließen, wenn man außerhalb des Modal-Contents klickt
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // 4. Formular-Absendung verarbeiten
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Verhindert das Neuladen der Seite
    
    // Werte auslesen
    const kategorie = document.getElementById("feedbackCategory").value;
    const nachricht = document.getElementById("feedbackText").value;
    const aktuellesTool = window.location.pathname; 
    
    // Daten-Ausgabe in der Konsole (Bereit für dein Backend/API-Fetch)
    console.log("--- NEUES FEEDBACK EMPFANGEN ---");
    console.log("Kategorie:", kategorie);
    console.log("Nachricht:", nachricht);
    console.log("Tool-Seite:", aktuellesTool);
    
    // UI-Wechsel: Formular ausblenden, leuchtenden Erfolgsscreen einblenden
    formContainer.style.display = "none";
    successMessage.style.display = "flex";
    
    // Nach 2.5 Sekunden schließt sich das Fenster automatisch
    setTimeout(() => {
      modal.style.display = "none";
      
      // Sobald das Fenster unsichtbar ist, setzen wir die Inhalte im Hintergrund 
      // unbemerkt zurück, damit das Formular beim nächsten Öffnen wieder bereitsteht.
      setTimeout(() => {
        form.reset();
        formContainer.style.display = "block";
        successMessage.style.display = "none";
      }, 300); // Wartet, bis die Schließ-Animation vorbei ist
      
    }, 2500);
  });
});