(function () {
  function esc(s) {
    if (s == null) return "";
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function safeHref(url) {
    if (!url || typeof url !== "string") return "#";
    try {
      var u = new URL(url, window.location.origin);
      if (u.protocol === "http:" || u.protocol === "https:") return u.href;
    } catch (e) {}
    return "#";
  }

  function card(item) {
    var rawUrl = item.credentialUrl || item.link || "";
    var href = rawUrl ? safeHref(rawUrl) : "";
    var url =
      href && href !== "#"
        ? '<a href="' +
          esc(href) +
          '" class="text-indigo-600 hover:text-indigo-800 font-medium text-sm mt-2 inline-block" target="_blank" rel="noopener noreferrer">Verify credential <i class="fas fa-external-link-alt text-xs ml-1"></i></a>' +
          '<p class="text-xs text-gray-500 mt-1.5 break-all"><a href="' +
          esc(href) +
          '" class="text-gray-600 underline decoration-gray-300 underline-offset-2 hover:text-indigo-600" target="_blank" rel="noopener noreferrer">' +
          esc(href) +
          "</a></p>"
        : "";
    var meta = [item.date, item.location].filter(Boolean).join(" · ");
    var issuer = item.issuer
      ? '<p class="text-sm text-indigo-600 font-medium">' + esc(item.issuer) + "</p>"
      : "";
    var summary = item.summary
      ? '<p class="text-gray-600 text-sm mt-2 leading-relaxed">' + esc(item.summary) + "</p>"
      : "";
    var metaHtml = meta
      ? '<p class="text-xs text-gray-500 mt-1">' + esc(meta) + "</p>"
      : "";

    return (
      '<article class="bg-white rounded-xl border border-gray-100 shadow-md p-6 hover:shadow-lg transition-shadow">' +
      '<div class="flex items-start gap-3">' +
      '<div class="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">' +
      '<i class="fas fa-award text-indigo-600"></i>' +
      "</div>" +
      '<div class="min-w-0 flex-1">' +
      "<h3 class=\"font-semibold text-gray-900\">" +
      esc(item.title) +
      "</h3>" +
      issuer +
      metaHtml +
      summary +
      url +
      "</div></div></article>"
    );
  }

  function renderList(containerId, items) {
    var el = document.getElementById(containerId);
    if (!el || !items || !items.length) return;
    el.innerHTML = items.map(card).join("");
  }

  function applySocialLinks() {
    var data = window.PORTFOLIO_DATA || {};
    var linkedin = safeHref((data.social || {}).linkedin || "");
    ["contact-linkedin", "footer-linkedin"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (linkedin && linkedin !== "#") {
        el.href = linkedin;
        el.removeAttribute("aria-hidden");
        el.removeAttribute("hidden");
        el.classList.remove("hidden");
      } else {
        el.setAttribute("aria-hidden", "true");
        el.classList.add("hidden");
      }
    });
  }

  function normalizeTelegramUsername(raw) {
    if (!raw || typeof raw !== "string") return "";
    var s = raw.trim().replace(/^@+/, "");
    return s.replace(/[^a-zA-Z0-9_]/g, "");
  }

  function applyTelegramContact() {
    var data = window.PORTFOLIO_DATA || {};
    var user = normalizeTelegramUsername((data.social || {}).telegramUsername || "");
    var row = document.getElementById("contact-telegram-row");
    var direct = document.getElementById("contact-telegram-direct");
    var handle = document.getElementById("telegram-handle-display");
    var form = document.getElementById("telegram-contact-form");
    if (handle) handle.textContent = user ? "@" + user : "—";
    if (direct) {
      if (user) {
        direct.href = "https://t.me/" + user;
        direct.classList.remove("hidden");
      } else {
        direct.href = "#";
        direct.classList.add("hidden");
      }
    }
    if (row) {
      if (user) row.classList.remove("hidden");
      else row.classList.add("hidden");
    }
    if (form) form.setAttribute("data-telegram-user", user);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var data = window.PORTFOLIO_DATA || {};
    renderList("certifications-list", data.certifications);
    renderList("education-list", data.education);
    applySocialLinks();
    applyTelegramContact();
  });
})();
