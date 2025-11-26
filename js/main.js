// main.js - versión final con modal robusto y detección fiable del botón cerrar
document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     GALERÍA: reemplaza imagen principal al click
     ========================= */
  const thumbs = document.querySelectorAll(".thumb");
  // admite ambas variantes de id que has usado en distintos fragmentos
  const mainImage = document.getElementById("mainImage") || document.getElementById("mainimg");

  if (thumbs && thumbs.length && mainImage) {
    thumbs.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const full = btn.getAttribute("data-full");
        if (!full) return;
        // feedback visual
        thumbs.forEach((t) => t.classList.remove("active"));
        btn.classList.add("active");
        // cambiar src y alt (tomar alt desde la img interna)
        const thumbImg = btn.querySelector("img");
        if (!thumbImg) return;
        mainImage.setAttribute("aria-busy", "true");
        mainImage.src = full;
        mainImage.alt = thumbImg.alt || "Obra";
        mainImage.onload = () => mainImage.removeAttribute("aria-busy");
      });
    });
  }

  /* =========================
     MODAL DEL VIDEO (robusto)
     ========================= */
  // localiza modal y botones probando varias convenciones de id/nombres
  const modal =
    document.getElementById("videoModal") ||
    document.getElementById("reelModal") ||
    document.getElementById("reelmodal") ||
    document.querySelector(".modal"); // último recurso

  const openBtn =
    document.getElementById("open-reel") ||
    document.getElementById("openReelBtn") ||
    document.getElementById("open_reel") ||
    document.querySelector("[data-open-reel]");

  // colección de selectores que consideramos "cerrar"
  const closeSelectors = [
    "#closeModal",
    "#closeReelBtn",
    ".modal-close",
    "[data-close]",
    ".close"
  ].join(",");

  const reel = document.getElementById("reelVideo") || document.querySelector("video#reelVideo");

  // si falta algo, no lanzamos errores; solo no inicializamos el modal
  if (!modal || !openBtn || !reel) {
    // console.warn("Modal: elementos faltantes:", { modal, openBtn, reel });
  } else {
    // obtener todos los posibles botones de cerrar dentro del modal
    const closeButtons = Array.from(modal.querySelectorAll(closeSelectors));

    // Si no hay closeButtons dentro del modal, pruebo buscar en el documento (fallback)
    if (!closeButtons.length) {
      const fallback = Array.from(document.querySelectorAll(closeSelectors));
      fallback.forEach((el) => {
        if (modal.contains(el) || !closeButtons.includes(el)) closeButtons.push(el);
      });
    }

    // asegurar que exista al menos un "close" manejable - si no, creamos uno invisible (no ideal, pero evita errores)
    let createdClose = null;
    if (!closeButtons.length) {
      createdClose = document.createElement("button");
      createdClose.type = "button";
      createdClose.className = "modal-close";
      createdClose.setAttribute("aria-label", "Cerrar");
      createdClose.style.position = "absolute";
      createdClose.style.top = "8px";
      createdClose.style.right = "8px";
      createdClose.style.width = "1px";
      createdClose.style.height = "1px";
      createdClose.style.opacity = "0";
      modal.appendChild(createdClose);
      closeButtons.push(createdClose);
    }

    // función utilitaria: lista de elementos focusables dentro del modal
    function getFocusable(mod) {
      return Array.from(
        mod.querySelectorAll(
          'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null || el === document.activeElement); // intenta filtrar elementos display:none
    }

    let lastFocused = null;

    function openModal() {
      lastFocused = document.activeElement;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      const mainEl = document.querySelector("main");
      if (mainEl) mainEl.setAttribute("aria-hidden", "true");

      // reiniciar vídeo al abrir (sin forzar autoplay)
      try {
        reel.currentTime = 0;
      } catch (e) {}

      // poner foco en el primer close disponible o en el video como fallback
      const focusTarget = closeButtons[0] || reel;
      try {
        focusTarget.focus();
      } catch (e) {}

      // asegurar que close buttons sean botones para que reciban clicks/keyboard
      closeButtons.forEach((btn) => {
        if (btn.tagName.toLowerCase() === "a") btn.setAttribute("role", "button");
        if (btn.tagName.toLowerCase() === "button") btn.type = "button";
        btn.setAttribute("tabindex", "0");
      });
    }

    function closeModal() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      const mainEl = document.querySelector("main");
      if (mainEl) mainEl.removeAttribute("aria-hidden");

      try {
        reel.pause();
        // reel.currentTime = 0; // descomenta si quieres que vuelva al inicio
      } catch (e) {}

      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
      else {
        try {
          openBtn.focus();
        } catch (e) {}
      }
    }

    // abrir
    openBtn.addEventListener("click", (ev) => {
      ev && ev.preventDefault && ev.preventDefault();
      openModal();
    });

    // listeners en todos los botones "cerrar"
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", (ev) => {
        ev && ev.preventDefault && ev.preventDefault();
        closeModal();
      });
      // soporte keyboard (Enter/Space) en caso de que no sea tag button
      btn.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          closeModal();
        }
      });
    });

    // delegación: si se clickea en un elemento con data-close (o en su ancestro) dentro del modal, cerramos
    modal.addEventListener("click", (e) => {
      // clic en overlay cierra
      if (e.target === modal) {
        closeModal();
        return;
      }
      // si el elemento clicado o alguno de sus ancestros tiene data-close o la clase modal-close, cerramos
      const maybeClose = e.target.closest("[data-close], .modal-close, .close");
      if (maybeClose && modal.contains(maybeClose)) {
        closeModal();
        return;
      }
    });

    // manejador teclado para trampa de foco y ESC
    modal.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
        return;
      }

      if (e.key === "Tab") {
        const focusable = getFocusable(modal);
        if (!focusable.length) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });

    // cierre por ESC global (por si modal no tenía foco)
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
        closeModal();
      }
    });

    // limpieza si creamos un close invisible: opcional mantenerlo
    if (createdClose) {
      // lo dejamos; si prefieres eliminarlo al final, descomenta:
      // createdClose.remove();
    }
  } // fin modal inicializado

  /* =========================
     SWAP SIMPLE DE IMÁGENES (parte inferior del fichero original)
     ========================= */
  const mainIMG_swap = document.getElementById("mainimg");
  const thumbImgs = document.querySelectorAll(".imgThumb");

  if (mainIMG_swap && thumbImgs.length) {
    thumbImgs.forEach((btn) => {
      btn.addEventListener("click", () => {
        let mainSrc = mainIMG_swap.src;
        mainIMG_swap.src = btn.src;
        btn.src = mainSrc;
      });
    });
  }

  /* =========================
     MAILTO para el botón de contacto
     ========================= */
  const contactBtn = document.getElementById("contactBtn");
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      const email = "ismaelvargasduque14@alumnos.ilerna.com";
      const subject = encodeURIComponent("Contacto desde MiArma");
      const body = encodeURIComponent("Hola MiArma,%0D%0A%0D%0AMe interesa tu trabajo y quisiera...");
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    });
  }
});
