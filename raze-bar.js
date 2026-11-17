(function () {
  // Contact details for the Raze Designs demo bar.
  // Email and phone live here so they can be updated in one place.
  var RAZE = {
    brand: "Raze Designs",
    email: "razedesigns.tx@gmail.com",
    phone: "(443) 974-3026",
    phoneHref: "tel:+14439743026"
  };

  var STYLES = [
    { id: "v1", label: "Style 1 Classic" },
    { id: "v2", label: "Style 2 Modern" },
    { id: "v3", label: "Style 3 Emergency" },
    { id: "v4", label: "Style 4 Family" }
  ];

  var script = document.currentScript;
  if (!script) {
    var scripts = document.querySelectorAll("script[data-slug][data-style]");
    script = scripts[scripts.length - 1];
  }
  var slug = (script && script.getAttribute("data-slug")) || "";
  var current = (script && script.getAttribute("data-style")) || "";

  function styleHref(id) {
    return "../" + id + "/";
  }

  function buildBar() {
    var bar = document.createElement("div");
    bar.className = "raze-bar";
    bar.setAttribute("data-raze-bar", "true");

    var styleButtons = STYLES.map(function (s) {
      var currentClass = s.id === current ? " is-current" : "";
      var aria = s.id === current ? ' aria-current="page"' : "";
      return (
        '<a class="raze-style-btn' + currentClass + '" href="' + styleHref(s.id) + '"' + aria + ">" +
        s.label +
        "</a>"
      );
    }).join("");

    bar.innerHTML =
      '<div class="raze-bar-inner">' +
        '<div class="raze-bar-brand">' +
          '<span class="raze-bar-label">Demo preview</span>' +
          '<span class="raze-bar-credit">' +
            '<span class="raze-credit-full">Designed &amp; Developed by ' + RAZE.brand + '</span>' +
            '<span class="raze-credit-short">' + RAZE.brand + '</span>' +
          '</span>' +
          '<span class="raze-bar-contact">' +
            '<a href="mailto:' + RAZE.email + '">' + RAZE.email + '</a>' +
            '<a href="' + RAZE.phoneHref + '">' + RAZE.phone + '</a>' +
          '</span>' +
        '</div>' +
        '<button type="button" class="raze-toggle" aria-expanded="false" aria-controls="raze-panel">Styles &amp; pricing</button>' +
        '<div class="raze-panel-wrap" id="raze-panel">' +
          '<div class="raze-bar-contact raze-bar-contact-panel">' +
            '<a href="mailto:' + RAZE.email + '">' + RAZE.email + '</a>' +
            '<a href="' + RAZE.phoneHref + '">' + RAZE.phone + '</a>' +
          '</div>' +
          '<div class="raze-bar-actions">' +
            styleButtons +
            '<button type="button" class="raze-price-btn" data-raze-pricing>Pricing</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    var modal = document.createElement("div");
    modal.className = "raze-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "raze-pricing-title");
    modal.hidden = true;
    modal.innerHTML =
      '<div class="raze-modal-card">' +
        '<h2 id="raze-pricing-title">Website pricing</h2>' +
        '<dl>' +
          '<div><dt>This template, ready to launch</dt><dd>$500</dd></div>' +
          '<div><dt>Design changes</dt><dd>$250 to $1,000</dd></div>' +
          '<div><dt>Full redesign and visual hierarchy</dt><dd>$2,000</dd></div>' +
          '<div><dt>Ecommerce and enterprise with integrations</dt><dd>$3,000+</dd></div>' +
          '<div><dt>Hosting and maintenance</dt><dd>$49/mo</dd></div>' +
        '</dl>' +
        '<button type="button" class="raze-modal-close">Close</button>' +
      '</div>';

    document.body.insertBefore(bar, document.body.firstChild);
    document.body.appendChild(modal);

    var toggle = bar.querySelector(".raze-toggle");
    toggle.addEventListener("click", function () {
      var open = bar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    function openModal() {
      modal.hidden = false;
      modal.classList.add("is-open");
    }
    function closeModal() {
      modal.hidden = true;
      modal.classList.remove("is-open");
    }

    bar.querySelector("[data-raze-pricing]").addEventListener("click", openModal);
    modal.querySelector(".raze-modal-close").addEventListener("click", closeModal);
    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeModal();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal();
        bar.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildBar);
  } else {
    buildBar();
  }
})();
