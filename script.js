// Small helpers for the Research page (abstract toggles) and the Art page (lightbox).

// ---------- Abstract toggles ----------
document.querySelectorAll(".abstract-toggle").forEach(function (button) {
  var abstract = document.getElementById(button.getAttribute("aria-controls"));
  button.addEventListener("click", function () {
    var open = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!open));
    abstract.hidden = open;
  });
});

// ---------- Art lightbox ----------
var lightbox = document.getElementById("lightbox");

if (lightbox) {
  var thumbs = Array.prototype.slice.call(document.querySelectorAll(".art-thumb"));
  var bigImage = document.getElementById("lightbox-image");
  var bigCaption = document.getElementById("lightbox-caption");
  var current = 0;
  var lastFocused = null;

  function show(index) {
    current = (index + thumbs.length) % thumbs.length;
    var img = thumbs[current].querySelector("img");
    var caption = thumbs[current].closest("figure").querySelector("figcaption");
    bigImage.src = img.src;
    bigImage.alt = img.alt;
    bigCaption.textContent = caption ? caption.textContent : "";
  }

  thumbs.forEach(function (thumb, index) {
    thumb.addEventListener("click", function () {
      lastFocused = thumb;
      show(index);
      lightbox.showModal();
    });
  });

  document.getElementById("lightbox-close").addEventListener("click", function () {
    lightbox.close();
  });
  document.getElementById("lightbox-prev").addEventListener("click", function () {
    show(current - 1);
  });
  document.getElementById("lightbox-next").addEventListener("click", function () {
    show(current + 1);
  });

  // Close when clicking the dark area around the painting
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox || event.target.classList.contains("lightbox-inner")) {
      lightbox.close();
    }
  });

  // Left/right arrow keys move between paintings (Esc closes by default)
  lightbox.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });

  // Put keyboard focus back on the painting that was opened
  lightbox.addEventListener("close", function () {
    if (lastFocused) lastFocused.focus();
  });
}
