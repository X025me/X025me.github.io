(function () {
  var TAG_COLORS = [
    "bg-indigo-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-pink-600",
    "bg-yellow-600",
    "bg-purple-600",
    "bg-sky-600",
    "bg-rose-600",
  ];

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
      if (
        (u.protocol === "http:" || u.protocol === "https:") &&
        u.hostname
      ) {
        return u.href;
      }
    } catch (e) {}
    return "#";
  }

  function card(item) {
    return credentialCard(item, false);
  }

  function credentialAccent(item) {
    return item.accent || (item.featured ? "cloud" : "education");
  }

  function credentialIcon(item) {
    var prefix = item.iconPrefix || "fas";
    var icon = item.icon || "fa-certificate";
    return prefix + " " + icon;
  }

  function credentialCard(item, compact) {
    var rawUrl = item.credentialUrl || item.link || "";
    var href = rawUrl ? safeHref(rawUrl) : "";
    var hasVerify = href && href !== "#";
    var meta = [item.date, item.location].filter(Boolean).join(" · ");
    var accent = credentialAccent(item);
    var verify = hasVerify
      ? '<a href="' +
        esc(href) +
        '" class="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800" target="_blank" rel="noopener noreferrer">Verify credential <i class="fas fa-arrow-up-right-from-square text-[10px]"></i></a>'
      : "";

    return (
      '<article class="cred-card animate-fade-in" data-accent="' +
      esc(accent) +
      '" data-filter="' +
      esc(accent) +
      '">' +
      '<div class="flex gap-3">' +
      '<span class="cred-icon" aria-hidden="true"><i class="' +
      esc(credentialIcon(item)) +
      '"></i></span>' +
      '<div class="min-w-0 flex-1">' +
      '<p class="text-[11px] font-semibold uppercase tracking-wide text-gray-400">' +
      esc(item.issuer || "") +
      "</p>" +
      '<h3 class="text-base font-bold text-gray-900 mt-0.5 leading-snug">' +
      esc(item.title || "") +
      "</h3>" +
      (meta
        ? '<p class="text-[11px] text-gray-400 mt-1">' + esc(meta) + "</p>"
        : "") +
      (item.summary && !compact
        ? '<p class="text-sm text-gray-600 mt-2.5 leading-relaxed">' +
          esc(item.summary) +
          "</p>"
        : "") +
      verify +
      "</div></div></article>"
    );
  }

  function featuredCredential(item) {
    if (!item) return "";
    var rawUrl = item.credentialUrl || item.link || "";
    var href = rawUrl ? safeHref(rawUrl) : "";
    var hasVerify = href && href !== "#";
    var meta = [item.date, item.location].filter(Boolean).join(" · ");
    var cta = hasVerify
      ? '<a href="' +
        esc(href) +
        '" class="inline-flex items-center gap-2 rounded-lg bg-white/95 px-4 py-2 text-sm font-semibold text-sky-900 hover:bg-white transition-colors" target="_blank" rel="noopener noreferrer">View credential <i class="fas fa-arrow-right text-xs"></i></a>'
      : '<span class="inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2 text-sm font-medium text-white/90 ring-1 ring-white/25">Cloud architect track</span>';

    return (
      '<article class="cred-featured animate-fade-in">' +
      '<div class="cred-shine" aria-hidden="true"></div>' +
      '<div class="relative flex flex-col sm:flex-row sm:items-center gap-5">' +
      '<div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 text-2xl">' +
      '<i class="' +
      esc(credentialIcon(item)) +
      '" aria-hidden="true"></i></div>' +
      '<div class="min-w-0 flex-1">' +
      '<p class="text-xs font-semibold uppercase tracking-[0.14em] text-sky-100/90">Featured credential</p>' +
      '<h3 class="text-2xl sm:text-3xl font-bold mt-1 leading-tight">' +
      esc(item.title || "") +
      "</h3>" +
      '<p class="text-sky-100/90 text-sm mt-1">' +
      esc(item.issuer || "") +
      (meta ? " · " + esc(meta) : "") +
      "</p>" +
      (item.summary
        ? '<p class="text-white/85 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">' +
          esc(item.summary) +
          "</p>"
        : "") +
      "</div>" +
      '<div class="shrink-0">' +
      cta +
      "</div></div></article>"
    );
  }

  function educationCard(item) {
    if (!item) return "";
    var meta = [item.date, item.location].filter(Boolean).join(" · ");
    return (
      '<article class="cred-edu animate-fade-in">' +
      '<div class="relative">' +
      '<p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-100/90">Degree</p>' +
      '<h3 class="text-xl sm:text-2xl font-bold mt-2 leading-snug">' +
      esc(item.title || "") +
      "</h3>" +
      '<p class="text-indigo-100 mt-2 font-medium">' +
      esc(item.issuer || "") +
      "</p>" +
      (meta
        ? '<p class="text-indigo-200/90 text-sm mt-1">' + esc(meta) + "</p>"
        : "") +
      (item.summary
        ? '<p class="text-white/85 text-sm mt-5 leading-relaxed max-w-md">' +
          esc(item.summary) +
          "</p>"
        : "") +
      '<div class="mt-6 flex items-center gap-2 text-indigo-100 text-xs font-semibold uppercase tracking-wide">' +
      '<i class="fas fa-award" aria-hidden="true"></i> Foundation of the journey' +
      "</div></div></article>"
    );
  }

  function renderCredentials() {
    var data = window.PORTFOLIO_DATA || {};
    var certs = data.certifications || [];
    var education = data.education || [];
    var featuredEl = document.getElementById("credentials-featured");
    var certList = document.getElementById("certifications-list");
    var eduList = document.getElementById("education-list");
    var filtersEl = document.getElementById("cred-filters");

    var featured = null;
    var rest = [];
    certs.forEach(function (c) {
      if (!featured && c.featured) featured = c;
      else rest.push(c);
    });
    if (!featured && certs.length) {
      featured = certs[0];
      rest = certs.slice(1);
    }

    if (featuredEl) featuredEl.innerHTML = featuredCredential(featured);
    if (eduList) eduList.innerHTML = education.map(educationCard).join("");
    if (certList) {
      certList.innerHTML = rest.length
        ? rest
            .map(function (c) {
              return credentialCard(c, false);
            })
            .join("")
        : '<p class="text-sm text-gray-500 col-span-full">Add certifications in portfolio-data.js.</p>';
    }

    if (filtersEl && rest.length) {
      var accents = [];
      rest.forEach(function (c) {
        var a = credentialAccent(c);
        if (accents.indexOf(a) === -1) accents.push(a);
      });
      var labels = {
        cloud: "Cloud",
        security: "Security",
        ai: "AI",
        frontend: "Frontend",
        education: "Other",
      };
      filtersEl.innerHTML =
        '<button type="button" class="cred-filter" data-filter="all" aria-pressed="true">All</button>' +
        accents
          .map(function (a) {
            return (
              '<button type="button" class="cred-filter" data-filter="' +
              esc(a) +
              '" aria-pressed="false">' +
              esc(labels[a] || a) +
              "</button>"
            );
          })
          .join("");

      filtersEl.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-filter]");
        if (!btn) return;
        var filter = btn.getAttribute("data-filter");
        filtersEl.querySelectorAll(".cred-filter").forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        certList.querySelectorAll(".cred-card").forEach(function (cardEl) {
          var match =
            filter === "all" || cardEl.getAttribute("data-filter") === filter;
          cardEl.classList.toggle("is-hidden", !match);
        });
      });
    }
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

  function normalizeGithubUsername(raw) {
    if (!raw || typeof raw !== "string") return "";
    return raw.trim().replace(/^@+/, "").replace(/[^a-zA-Z0-9-]/g, "");
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

  function youtubeEmbed(url) {
    try {
      var u = new URL(url, window.location.origin);
      var id = "";
      if (u.hostname.indexOf("youtu.be") !== -1) {
        id = u.pathname.replace(/^\//, "").split("/")[0];
      } else if (u.hostname.indexOf("youtube.com") !== -1) {
        id = u.searchParams.get("v") || "";
        if (!id && u.pathname.indexOf("/embed/") === 0) {
          id = u.pathname.split("/")[2] || "";
        }
        if (!id && u.pathname.indexOf("/shorts/") === 0) {
          id = u.pathname.split("/")[2] || "";
        }
      }
      if (!id) return "";
      return "https://www.youtube.com/embed/" + encodeURIComponent(id);
    } catch (e) {
      return "";
    }
  }

  function vimeoEmbed(url) {
    try {
      var u = new URL(url, window.location.origin);
      if (u.hostname.indexOf("vimeo.com") === -1) return "";
      var parts = u.pathname.split("/").filter(Boolean);
      var id = parts[parts.length - 1];
      if (!/^\d+$/.test(id)) return "";
      return "https://player.vimeo.com/video/" + id;
    } catch (e) {
      return "";
    }
  }

  function isLocalVideo(url) {
    return /\.(mp4|webm|ogg)(\?|$)/i.test(url || "");
  }

  function projectCoverSrc(item) {
    if (item.image) return item.image;
    if (item.images && item.images.length) return item.images[0];
    return "";
  }

  function projectGallery(item) {
    var imgs = [];
    if (item.images && item.images.length) imgs = item.images.slice();
    else if (item.image) imgs = [item.image];
    return imgs;
  }

  function projectHasVideo(item) {
    if (!item.video) return false;
    return !!(youtubeEmbed(item.video) || vimeoEmbed(item.video) || isLocalVideo(item.video));
  }

  function projectHasLive(item) {
    return !!(item.embedUrl && safeHref(item.embedUrl) !== "#");
  }

  function projectCoverHtml(item) {
    var src = projectCoverSrc(item);
    var badges = [];
    if (projectGallery(item).length > 1) badges.push('<span class="inline-flex items-center gap-1 rounded-md bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm"><i class="fas fa-images"></i> Gallery</span>');
    if (projectHasVideo(item)) badges.push('<span class="inline-flex items-center gap-1 rounded-md bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm"><i class="fas fa-play"></i> Video</span>');
    if (projectHasLive(item)) badges.push('<span class="inline-flex items-center gap-1 rounded-md bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm"><i class="fas fa-desktop"></i> Live</span>');

    var badgeBar = badges.length
      ? '<div class="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">' + badges.join("") + "</div>"
      : "";

    if (src) {
      return (
        '<div class="project-cover">' +
        '<img src="' +
        esc(src) +
        '" alt="' +
        esc(item.title || "") +
        '" loading="lazy">' +
        '<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>' +
        badgeBar +
        "</div>"
      );
    }

    return (
      '<div class="project-cover flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">' +
      '<i class="fas fa-folder-open text-4xl text-white/90" aria-hidden="true"></i>' +
      badgeBar +
      "</div>"
    );
  }

  function projectCard(item, index) {
    var tags = (item.tags || [])
      .slice(0, 3)
      .map(function (t, i) {
        return (
          '<span class="' +
          TAG_COLORS[i % TAG_COLORS.length] +
          ' text-white text-[11px] px-2 py-0.5 rounded">' +
          esc(t) +
          "</span>"
        );
      })
      .join("");
    var delay = (0.12 + index * 0.1).toFixed(2);

    return (
      '<article class="animate-fade-in project-card group bg-white rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-100 hover:shadow-2xl hover:ring-indigo-100 transition-all" style="animation-delay: ' +
      delay +
      's;">' +
      '<button type="button" class="project-card-btn" data-project-index="' +
      index +
      '" aria-label="Open details for ' +
      esc(item.title || "project") +
      '">' +
      projectCoverHtml(item) +
      '<div class="p-5 sm:p-6">' +
      (item.meta
        ? '<p class="text-[11px] font-semibold uppercase tracking-wide text-indigo-600 mb-1.5">' +
          esc(item.meta) +
          "</p>"
        : "") +
      '<h3 class="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">' +
      esc(item.title || "") +
      "</h3>" +
      (item.summary
        ? '<p class="text-gray-600 mt-2 text-sm leading-relaxed line-clamp-3">' +
          esc(item.summary) +
          "</p>"
        : "") +
      '<div class="mt-4 flex flex-wrap items-center justify-between gap-3">' +
      '<div class="flex flex-wrap gap-1.5">' +
      tags +
      "</div>" +
      '<span class="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600">' +
      'Expand <i class="fas fa-arrow-up-right-from-square text-[10px]"></i></span>' +
      "</div></div></button></article>"
    );
  }

  function renderProjects() {
    var el = document.getElementById("projects-list");
    var modal = document.getElementById("project-modal");
    if (!el) return;
    var data = window.PORTFOLIO_DATA || {};
    var projects = data.projects || [];
    if (!projects.length) {
      el.innerHTML =
        '<p class="text-center text-gray-500 col-span-full text-sm">Add projects in <code class="bg-gray-100 px-1 rounded">assets/js/portfolio-data.js</code>.</p>';
      return;
    }
    el.innerHTML = projects.map(projectCard).join("");
    bindProjectModal(projects, modal);
  }

  function bindProjectModal(projects, modal) {
    if (!modal) return;
    var titleEl = document.getElementById("project-modal-title");
    var metaEl = document.getElementById("project-modal-meta");
    var tabsEl = document.getElementById("project-modal-tabs");
    var bodyEl = document.getElementById("project-modal-body");
    var tagsEl = document.getElementById("project-modal-tags");
    var actionsEl = document.getElementById("project-modal-actions");
    var state = { index: 0, tab: "details", galleryIndex: 0 };

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("project-modal-open");
      if (bodyEl) bodyEl.innerHTML = "";
    }

    function openModal(index) {
      state.index = index;
      state.galleryIndex = 0;
      var item = projects[index];
      if (!item) return;
      var tabs = ["details"];
      if (projectGallery(item).length) tabs.push("gallery");
      if (projectHasVideo(item)) tabs.push("video");
      if (projectHasLive(item)) tabs.push("live");
      state.tab = tabs[0] === "details" ? "details" : tabs[0];
      if (titleEl) titleEl.textContent = item.title || "";
      if (metaEl) metaEl.textContent = item.meta || "";
      if (tagsEl) {
        tagsEl.innerHTML = (item.tags || [])
          .map(function (t, i) {
            return (
              '<span class="' +
              TAG_COLORS[i % TAG_COLORS.length] +
              ' text-white text-[11px] px-2 py-0.5 rounded">' +
              esc(t) +
              "</span>"
            );
          })
          .join("");
      }
      if (actionsEl) {
        var linkHref = item.link ? safeHref(item.link) : "#";
        var gh = item.github ? safeHref(item.github) : "#";
        var bits = [];
        if (linkHref !== "#") {
          bits.push(
            '<a href="' +
              esc(linkHref) +
              '" class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-indigo-700" target="_blank" rel="noopener noreferrer">Visit site <i class="fas fa-external-link-alt text-[10px]"></i></a>'
          );
        }
        if (gh !== "#") {
          bits.push(
            '<a href="' +
              esc(gh) +
              '" class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700 hover:border-gray-300" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> Code</a>'
          );
        }
        actionsEl.innerHTML = bits.join("");
      }
      renderTabs(tabs);
      renderTabBody(item);
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("project-modal-open");
    }

    function renderTabs(tabs) {
      if (!tabsEl) return;
      var labels = {
        details: "Details",
        gallery: "Gallery",
        video: "Video",
        live: "Live preview",
      };
      tabsEl.innerHTML = tabs
        .map(function (t) {
          return (
            '<button type="button" class="project-tab" role="tab" data-tab="' +
            t +
            '" aria-selected="' +
            (state.tab === t ? "true" : "false") +
            '">' +
            esc(labels[t] || t) +
            "</button>"
          );
        })
        .join("");
    }

    function videoHtml(item) {
      var yt = youtubeEmbed(item.video);
      var vim = yt ? "" : vimeoEmbed(item.video);
      if (yt || vim) {
        return (
          '<div class="project-hero-media video-mode">' +
          '<iframe src="' +
          esc(yt || vim) +
          '" title="' +
          esc(item.title) +
          ' video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>'
        );
      }
      if (isLocalVideo(item.video)) {
        return (
          '<div class="project-hero-media video-mode">' +
          '<video controls playsinline preload="metadata"><source src="' +
          esc(item.video) +
          '"></video></div>'
        );
      }
      return '<p class="text-sm text-gray-500">No playable video for this project yet.</p>';
    }

    function galleryHtml(item) {
      var imgs = projectGallery(item);
      if (!imgs.length) {
        return '<p class="text-sm text-gray-500">No gallery images yet.</p>';
      }
      var active = imgs[state.galleryIndex] || imgs[0];
      var thumbs = imgs
        .map(function (src, i) {
          return (
            '<button type="button" data-gallery-index="' +
            i +
            '" class="' +
            (i === state.galleryIndex ? "is-active" : "") +
            '" aria-label="Show image ' +
            (i + 1) +
            '"><img src="' +
            esc(src) +
            '" alt="" loading="lazy"></button>'
          );
        })
        .join("");
      return (
        '<div class="project-hero-media mb-4"><img src="' +
        esc(active) +
        '" alt="' +
        esc(item.title) +
        ' gallery"></div>' +
        (imgs.length > 1
          ? '<div class="project-gallery">' + thumbs + "</div>"
          : "")
      );
    }

    function detailsHtml(item) {
      var highlights = (item.highlights || [])
        .map(function (h) {
          return (
            '<li class="flex gap-2 text-sm text-gray-700 leading-relaxed"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"></span><span>' +
            esc(h) +
            "</span></li>"
          );
        })
        .join("");
      return (
        '<div class="grid grid-cols-1 lg:grid-cols-5 gap-6">' +
        '<div class="lg:col-span-3">' +
        (projectCoverSrc(item)
          ? '<div class="project-hero-media mb-4"><img src="' +
            esc(projectCoverSrc(item)) +
            '" alt="' +
            esc(item.title) +
            '"></div>'
          : "") +
        '<p class="text-gray-700 leading-relaxed">' +
        esc(item.details || item.summary || "") +
        "</p></div>" +
        '<div class="lg:col-span-2">' +
        (highlights
          ? '<div class="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 sm:p-5"><p class="text-xs font-semibold uppercase tracking-wide text-indigo-700 mb-3">Highlights</p><ul class="space-y-2.5">' +
            highlights +
            "</ul></div>"
          : "") +
        "</div></div>"
      );
    }

    function renderTabBody(item) {
      if (!bodyEl) return;
      if (state.tab === "gallery") bodyEl.innerHTML = galleryHtml(item);
      else if (state.tab === "video") bodyEl.innerHTML = videoHtml(item);
      else if (state.tab === "live") {
        var embed = safeHref(item.embedUrl);
        bodyEl.innerHTML =
          embed !== "#"
            ? '<div class="project-hero-media live-mode mb-3"><iframe src="' +
              esc(embed) +
              '" title="' +
              esc(item.title) +
              ' live preview" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div><p class="text-xs text-gray-500">Some sites block embedding — use Visit site if the preview is blank.</p>'
            : '<p class="text-sm text-gray-500">No live preview URL.</p>';
      } else bodyEl.innerHTML = detailsHtml(item);
    }

    document.getElementById("projects-list").addEventListener("click", function (e) {
      var btn = e.target.closest("[data-project-index]");
      if (!btn) return;
      openModal(parseInt(btn.getAttribute("data-project-index"), 10));
    });

    modal.addEventListener("click", function (e) {
      if (e.target.closest("[data-project-close]")) {
        closeModal();
        return;
      }
      var tabBtn = e.target.closest("[data-tab]");
      if (tabBtn) {
        state.tab = tabBtn.getAttribute("data-tab");
        var item = projects[state.index];
        var tabs = ["details"];
        if (projectGallery(item).length) tabs.push("gallery");
        if (projectHasVideo(item)) tabs.push("video");
        if (projectHasLive(item)) tabs.push("live");
        renderTabs(tabs);
        renderTabBody(item);
        return;
      }
      var thumb = e.target.closest("[data-gallery-index]");
      if (thumb) {
        state.galleryIndex = parseInt(thumb.getAttribute("data-gallery-index"), 10);
        renderTabBody(projects[state.index]);
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  }

  function relativeTime(iso) {
    var then = new Date(iso).getTime();
    if (isNaN(then)) return "";
    var sec = Math.round((Date.now() - then) / 1000);
    if (sec < 60) return "just now";
    var min = Math.round(sec / 60);
    if (min < 60) return min + "m ago";
    var hr = Math.round(min / 60);
    if (hr < 48) return hr + "h ago";
    var day = Math.round(hr / 24);
    if (day < 30) return day + "d ago";
    return new Date(iso).toLocaleDateString();
  }

  function describeEvent(ev) {
    var repo = (ev.repo && ev.repo.name) || "repository";
    var type = ev.type || "";
    var payload = ev.payload || {};
    if (type === "PushEvent") {
      var n = (payload.commits && payload.commits.length) || payload.size || 1;
      return "Pushed " + n + " commit" + (n === 1 ? "" : "s") + " to " + repo;
    }
    if (type === "CreateEvent") {
      return "Created " + (payload.ref_type || "resource") + " in " + repo;
    }
    if (type === "WatchEvent") return "Starred " + repo;
    if (type === "ForkEvent") return "Forked " + repo;
    if (type === "IssuesEvent") {
      return (payload.action || "Updated") + " issue in " + repo;
    }
    if (type === "IssueCommentEvent") return "Commented on an issue in " + repo;
    if (type === "PullRequestEvent") {
      return (payload.action || "Updated") + " PR in " + repo;
    }
    if (type === "PullRequestReviewEvent") return "Reviewed a PR in " + repo;
    if (type === "ReleaseEvent") return "Published a release in " + repo;
    if (type === "PublicEvent") return "Open-sourced " + repo;
    return type.replace(/Event$/, "") + " · " + repo;
  }

  function renderGithubActivity(username) {
    var panel = document.getElementById("github-activity");
    var list = document.getElementById("github-activity-list");
    var chart = document.getElementById("github-contrib-chart");
    var profileLink = document.getElementById("github-profile-link");
    var moreLink = document.getElementById("projects-github-cta");
    if (!username) {
      if (panel) panel.classList.add("hidden");
      return;
    }
    if (panel) panel.classList.remove("hidden");
    if (profileLink) {
      profileLink.href = "https://github.com/" + username;
      profileLink.textContent = "@" + username;
    }
    if (moreLink) moreLink.href = "https://github.com/" + username;
    if (chart) {
      chart.src = "https://ghchart.rshah.org/" + encodeURIComponent(username);
      chart.alt = username + " GitHub contribution chart";
    }
    if (!list) return;
    list.innerHTML =
      '<li class="text-xs text-gray-500 py-1">Loading…</li>';

    fetch("https://api.github.com/users/" + encodeURIComponent(username) + "/events/public?per_page=4")
      .then(function (res) {
        if (!res.ok) throw new Error("GitHub API " + res.status);
        return res.json();
      })
      .then(function (events) {
        if (!Array.isArray(events) || !events.length) {
          list.innerHTML =
            '<li class="text-xs text-gray-500 py-1">No recent public activity.</li>';
          return;
        }
        list.innerHTML = events
          .slice(0, 4)
          .map(function (ev) {
            var repoUrl =
              ev.repo && ev.repo.name
                ? "https://github.com/" + ev.repo.name
                : "https://github.com/" + username;
            return (
              '<li class="flex items-baseline justify-between gap-2 py-1.5 border-b border-gray-200/80 last:border-0">' +
              '<a href="' +
              esc(repoUrl) +
              '" class="text-xs text-gray-700 hover:text-indigo-600 leading-snug line-clamp-1 min-w-0" target="_blank" rel="noopener noreferrer">' +
              esc(describeEvent(ev)) +
              "</a>" +
              '<span class="shrink-0 text-[10px] text-gray-400 tabular-nums">' +
              esc(relativeTime(ev.created_at)) +
              "</span></li>"
            );
          })
          .join("");
      })
      .catch(function () {
        list.innerHTML =
          '<li class="text-xs text-gray-500 py-1">Could not load activity. <a class="text-indigo-600 hover:underline" href="https://github.com/' +
          esc(username) +
          '" target="_blank" rel="noopener noreferrer">Profile</a></li>';
      });
  }

  function normalizeSkillKey(name) {
    return String(name || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "");
  }

  function renderAboutSkills(activeNames) {
    var el = document.getElementById("about-skills");
    if (!el) return;
    var data = window.PORTFOLIO_DATA || {};
    var all = data.skills || [];
    if (!all.length) {
      el.innerHTML = "";
      return;
    }
    var cloudSet = {};
    (data.cloudArchitectSkills || []).forEach(function (n) {
      cloudSet[normalizeSkillKey(n)] = true;
    });
    var activeSet = {};
    (activeNames || []).forEach(function (n) {
      activeSet[normalizeSkillKey(n)] = true;
    });
    var hasFocus = Object.keys(activeSet).length > 0;
    el.classList.toggle("has-focus", hasFocus);
    el.innerHTML = all
      .map(function (name) {
        var key = normalizeSkillKey(name);
        var on = hasFocus && activeSet[key];
        var isCloud = !!cloudSet[key];
        var classes =
          "skill-bubble inline-flex items-center px-4 py-2 rounded-full bg-white shadow-md text-sm font-medium text-gray-800 border border-gray-100" +
          (on ? " is-active" : "") +
          (isCloud ? " is-cloud" : "");
        var icon = isCloud
          ? '<i class="fas fa-cloud text-[10px] mr-1.5 opacity-90" aria-hidden="true"></i>'
          : "";
        var title = isCloud ? ' title="Cloud architect stack"' : "";
        return (
          '<span class="' +
          classes +
          '" data-skill="' +
          esc(name) +
          '"' +
          title +
          ">" +
          icon +
          esc(name) +
          "</span>"
        );
      })
      .join("");
  }

  function renderCareerStory() {
    var root = document.getElementById("career-story");
    var rail = document.getElementById("story-rail");
    var dots = document.getElementById("story-dots");
    var panel = document.getElementById("story-panel");
    var progressBar = document.getElementById("story-progress-bar");
    var prevBtn = document.getElementById("story-prev");
    var nextBtn = document.getElementById("story-next");
    var playBtn = document.getElementById("story-play");
    var playLabel = document.getElementById("story-play-label");
    if (!root || !rail || !panel) {
      renderAboutSkills([]);
      return;
    }

    var chapters = (window.PORTFOLIO_DATA || {}).journey || [];
    if (!chapters.length) {
      panel.innerHTML =
        '<p class="text-sm text-gray-500">Add journey chapters in <code class="bg-gray-100 px-1 rounded">portfolio-data.js</code>.</p>';
      renderAboutSkills([]);
      return;
    }

    var index = 0;
    var autoplay = false;
    var timer = null;
    var AUTOPLAY_MS = 6500;

    function stopAutoplay() {
      autoplay = false;
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      if (playBtn) playBtn.setAttribute("aria-pressed", "false");
      if (playLabel) playLabel.textContent = "Play";
      if (playBtn) {
        var icon = playBtn.querySelector("i");
        if (icon) icon.className = "fas fa-play text-xs";
      }
    }

    function startAutoplay() {
      autoplay = true;
      if (playBtn) playBtn.setAttribute("aria-pressed", "true");
      if (playLabel) playLabel.textContent = "Pause";
      if (playBtn) {
        var icon = playBtn.querySelector("i");
        if (icon) icon.className = "fas fa-pause text-xs";
      }
      if (timer) clearInterval(timer);
      timer = setInterval(function () {
        goTo((index + 1) % chapters.length);
      }, AUTOPLAY_MS);
    }

    function renderPanel(ch) {
      var iconClass = ch.icon ? "fas " + ch.icon : "fas fa-circle";
      var tags = (ch.tags || [])
        .map(function (t) {
          return (
            '<span class="inline-flex items-center rounded-md bg-white px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-100">' +
            esc(t) +
            "</span>"
          );
        })
        .join("");
      var highlights = (ch.highlights || [])
        .map(function (h) {
          return "<li class=\"text-sm text-gray-600 leading-relaxed mb-2 last:mb-0\">" + esc(h) + "</li>";
        })
        .join("");

      panel.innerHTML =
        '<div class="story-panel-inner">' +
        '<div class="flex flex-wrap items-start gap-4 mb-5">' +
        '<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">' +
        '<i class="' +
        esc(iconClass) +
        '" aria-hidden="true"></i></div>' +
        '<div class="min-w-0 flex-1">' +
        '<p class="text-xs font-semibold uppercase tracking-wider text-indigo-600">' +
        esc(ch.year || "") +
        (ch.org ? " · " + esc(ch.org) : "") +
        "</p>" +
        '<h4 class="text-xl sm:text-2xl font-bold text-gray-900 mt-1 leading-snug">' +
        esc(ch.title || "") +
        "</h4>" +
        (ch.role
          ? '<p class="text-sm text-gray-500 mt-1">' + esc(ch.role) + "</p>"
          : "") +
        "</div>" +
        '<span class="text-xs font-mono text-gray-400 tabular-nums">' +
        (index + 1) +
        " / " +
        chapters.length +
        "</span></div>" +
        '<p class="text-gray-700 leading-relaxed mb-6">' +
        esc(ch.narrative || "") +
        "</p>" +
        (highlights
          ? '<ul class="story-highlight mb-6 space-y-0">' + highlights + "</ul>"
          : "") +
        (tags ? '<div class="flex flex-wrap gap-2">' + tags + "</div>" : "") +
        "</div>";
    }

    function renderRail() {
      rail.innerHTML = chapters
        .map(function (ch, i) {
          var selected = i === index ? "true" : "false";
          return (
            '<button type="button" role="tab" class="story-chapter-btn" data-index="' +
            i +
            '" id="story-tab-' +
            i +
            '" aria-selected="' +
            selected +
            '" aria-controls="story-panel">' +
            '<span class="story-era block text-[10px] font-semibold uppercase tracking-wider text-gray-400">' +
            esc(ch.era || "") +
            "</span>" +
            '<span class="story-year block text-sm font-bold mt-0.5 text-gray-900">' +
            esc(ch.year || "") +
            "</span>" +
            '<span class="block text-xs mt-1 leading-snug opacity-90 line-clamp-2">' +
            esc(ch.title || "") +
            "</span></button>"
          );
        })
        .join("");
    }

    function renderDots() {
      if (!dots) return;
      dots.innerHTML = chapters
        .map(function (ch, i) {
          var current = i === index ? "true" : "false";
          var label = (ch.era || "Chapter") + " " + (ch.year || i + 1);
          return (
            '<button type="button" class="story-dot" data-index="' +
            i +
            '" aria-label="' +
            esc(label) +
            '" aria-current="' +
            current +
            '"></button>'
          );
        })
        .join("");
    }

    function syncProgress() {
      if (!progressBar) return;
      var pct = ((index + 1) / chapters.length) * 100;
      progressBar.style.width = pct + "%";
    }

    function scrollActiveIntoRail() {
      var active = rail.querySelector('[data-index="' + index + '"]');
      if (!active) return;
      var left =
        active.offsetLeft - (rail.clientWidth - active.offsetWidth) / 2;
      rail.scrollTo({
        left: Math.max(0, left),
        behavior: "smooth",
      });
    }

    function goTo(i) {
      index = ((i % chapters.length) + chapters.length) % chapters.length;
      renderRail();
      renderDots();
      renderPanel(chapters[index]);
      syncProgress();
      renderAboutSkills(chapters[index].skills || []);
      scrollActiveIntoRail();
      if (prevBtn) prevBtn.disabled = false;
      if (nextBtn) nextBtn.disabled = false;
    }

    rail.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-index]");
      if (!btn) return;
      stopAutoplay();
      goTo(parseInt(btn.getAttribute("data-index"), 10));
    });

    if (dots) {
      dots.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-index]");
        if (!btn) return;
        stopAutoplay();
        goTo(parseInt(btn.getAttribute("data-index"), 10));
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        stopAutoplay();
        goTo(index - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        stopAutoplay();
        goTo(index + 1);
      });
    }
    if (playBtn) {
      playBtn.addEventListener("click", function () {
        if (autoplay) stopAutoplay();
        else startAutoplay();
      });
    }

    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        stopAutoplay();
        goTo(index + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        stopAutoplay();
        goTo(index - 1);
      }
    });
    if (!root.hasAttribute("tabindex")) root.setAttribute("tabindex", "0");

    goTo(0);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var data = window.PORTFOLIO_DATA || {};
    var social = data.social || {};
    renderCredentials();
    applySocialLinks();
    applyTelegramContact();
    renderProjects();
    renderCareerStory();
    renderGithubActivity(normalizeGithubUsername(social.githubUsername || ""));
  });
})();
