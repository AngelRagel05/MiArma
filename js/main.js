// main.js
document.addEventListener("DOMContentLoaded", () => {
  // Gallery: reemplaza imagen principal al click
  const thumbs = document.querySelectorAll(".thumb");
  const mainImage = document.getElementById("mainImage");

  thumbs.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const full = btn.getAttribute("data-full");
      if (!full) return;
      // feedback visual: focus
      thumbs.forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");
      // cambiar src y alt (tomar alt desde la img interna)
      const thumbImg = btn.querySelector("img");
      mainImage.src = full;
      mainImage.alt = thumbImg.alt || "Obra";
      // for accessibility announce
      mainImage.setAttribute("aria-busy", "true");
      mainImage.onload = () => mainImage.removeAttribute("aria-busy");
    });
  });

  // Modal video
  const modal = document.getElementById("videoModal");
  const openBtn = document.getElementById("open-reel");
  const closeBtn = document.getElementById("closeModal");
  const reel = document.getElementById("reelVideo");

  function openModal() {
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    reel.currentTime = 0;
    // autoplay optionally:
    // reel.play(); // si quieres que empiece a reproducir automáticamente
    // move focus
    closeBtn.focus();
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    reel.pause();
    openBtn.focus();
  }

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false")
      closeModal();
  });
});
