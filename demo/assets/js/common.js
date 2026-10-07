/* Majestic Print — shared layout and behaviour for every page.
   Exposes window.MP with helpers used by page scripts. */
(function () {
  "use strict";

  var D = window.MP_DATA;
  if (!D) return;

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  // Build elements safely (textContent only — never inject user text as HTML)
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "text") node.textContent = attrs[k];
      else if (k === "html") node.innerHTML = attrs[k]; // trusted, static markup only
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }
  function ink(key) { return (D.inks[key] || D.inks.deep).hex; }
  function slugify(s) { return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function waLink(text) { return "https://wa.me/" + D.contact.whatsapp + (text ? "?text=" + encodeURIComponent(text) : ""); }
  function param(name) { return new URLSearchParams(location.search).get(name); }
  var ARROW = ' <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';
  var page = document.body.getAttribute("data-page") || "";

  D.services.forEach(function (s) { s.slug = slugify(s.name); });
  function serviceByName(name) { return D.services.filter(function (s) { return s.name === name; })[0]; }

  /* ---------- Quote list (per-browser convenience, like a cart without payment) ---------- */
  var KEY = "mp-quote-list";
  var quote = {
    list: function () { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } },
    save: function (items) { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {} quote.render(); },
    add: function (item) { var l = quote.list(); l.push(item); quote.save(l); },
    remove: function (i) { var l = quote.list(); l.splice(i, 1); quote.save(l); },
    clear: function () { quote.save([]); },
    render: function () {
      var n = quote.list().length;
      $$(".ql-count").forEach(function (c) { c.textContent = n; c.hidden = n === 0; });
      document.dispatchEvent(new CustomEvent("mp:quote-change"));
    },
    describe: function (item) {
      var opts = Object.keys(item.options || {}).map(function (k) { return k + ": " + item.options[k]; });
      return item.name + " × " + item.qty + (opts.length ? " (" + opts.join(", ") + ")" : "") + (item.artwork ? " — artwork: " + item.artwork : "") + (item.notes ? " — " + item.notes : "");
    }
  };

  /* ---------- Header + footer ---------- */
  var NAV = [
    ["shop", "shop.html", "Shop"],
    ["solutions", "solutions.html", "Solutions"],
    ["work", "work.html", "Our work"],
    ["order", "how-to-order.html", "How to order"],
    ["about", "about.html", "About"],
    ["contact", "contact.html", "Contact"]
  ];
  function navLinks() {
    return NAV.map(function (n) {
      var a = el("a", { href: n[1], text: n[2] });
      if (page === n[0] || (page === "product" && n[0] === "shop") || (page === "service" && n[0] === "solutions")) { a.classList.add("is-current"); a.setAttribute("aria-current", "page"); }
      return a;
    });
  }

  var headerSlot = $("#siteHeader");
  if (headerSlot) {
    headerSlot.replaceWith(
      el("div", { class: "ink-bar", "aria-hidden": "true" }, [el("span"), el("span"), el("span"), el("span"), el("span")]),
      el("header", { class: "site-header", id: "top" }, [
        el("div", { class: "container-xl header-row" }, [
          el("a", { class: "brand", href: "index.html", "aria-label": "Majestic Print Solutions — home" }, [
            el("img", { src: "assets/img/logo-tight.svg", width: "78", height: "72", alt: "Majestic Print Solutions" })
          ]),
          el("nav", { class: "main-nav d-none d-lg-flex", "aria-label": "Primary" }, navLinks()),
          el("div", { class: "header-actions" }, [
            el("a", { class: "ql-link", href: "contact.html#quote", "aria-label": "Quote list", html: '<i class="fa-solid fa-clipboard-list" aria-hidden="true"></i><span class="ql-count" hidden>0</span>' }),
            el("a", { class: "btn-mp btn-mp-accent d-none d-sm-inline-flex", href: "contact.html#quote", text: "Request a quote" }),
            el("button", { class: "menu-toggle d-lg-none", type: "button", "data-bs-toggle": "offcanvas", "data-bs-target": "#mobileNav", "aria-controls": "mobileNav", "aria-label": "Open menu", html: '<i class="fa-solid fa-bars" aria-hidden="true"></i>' })
          ])
        ])
      ]),
      el("div", { class: "offcanvas offcanvas-end mobile-nav", tabindex: "-1", id: "mobileNav", "aria-labelledby": "mobileNavLabel" }, [
        el("div", { class: "offcanvas-header" }, [
          el("p", { class: "offcanvas-title slug", id: "mobileNavLabel", text: "Menu" }),
          el("button", { type: "button", class: "btn-close", "data-bs-dismiss": "offcanvas", "aria-label": "Close menu" })
        ]),
        el("div", { class: "offcanvas-body" }, [
          el("nav", { "aria-label": "Mobile primary" }, navLinks()),
          el("a", { class: "btn-mp btn-mp-accent w-100 mt-4", href: "contact.html#quote", text: "Request a quote" })
        ])
      ])
    );
  }

  var footerSlot = $("#siteFooter");
  if (footerSlot) {
    var col = function (title, links) {
      return el("div", { class: "col-6 col-lg-2" }, [el("h3", { text: title })].concat(links.map(function (l) { return el("a", { href: l[1], text: l[0] }); })));
    };
    footerSlot.replaceWith(
      el("footer", { class: "site-footer", id: "contact" }, [
        el("div", { class: "container-xl" }, [
          el("div", { class: "footer-top" }, [
            el("p", { class: "footer-signoff", "aria-hidden": "true", html: 'Print<i class="dot c">.</i> Pack<i class="dot y">.</i> Promote<i class="dot m">.</i>' }),
            el("a", { class: "btn-mp btn-mp-light", href: "contact.html#quote", html: "Start your project" + ARROW })
          ]),
          el("div", { class: "row g-5 footer-cols" }, [
            el("div", { class: "col-lg-4" }, [
              el("img", { src: "assets/img/logo-tight.svg", width: "104", height: "96", alt: "Majestic Print Solutions", class: "footer-logo" }),
              el("p", { class: "footer-tag", text: "One partner. Every printing solution." }),
              el("p", { class: "footer-about", text: "Printing, packaging, signage and promotional products for businesses and personal orders across Sri Lanka." })
            ]),
            col("Shop", [["Business print", "shop.html?route=Print"], ["Packaging", "shop.html?route=Pack"], ["Promotional", "shop.html?route=Promote"], ["Gifts by occasion", "index.html#gifts"]]),
            col("Help", [["How to order", "how-to-order.html"], ["Artwork guide", "how-to-order.html#artwork"], ["FAQ", "how-to-order.html#faq"], ["Request a quote", "contact.html#quote"]]),
            el("div", { class: "col-lg-4" }, [el("h3", { text: "Visit or call" }), el("ul", { class: "contact-list contact-list-light", id: "footerContact" })])
          ]),
          el("div", { class: "footer-meta" }, [
            el("span", { text: "© " + new Date().getFullYear() + " Majestic Print Solutions" }),
            el("span", { class: "slug", text: "Demo · content and contacts to confirm" })
          ])
        ])
      ]),
      el("a", { class: "wa-float", href: waLink("Hi Majestic Print, I'd like to ask about an order."), target: "_blank", rel: "noopener", "aria-label": "Chat with us on WhatsApp", html: '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i>' }),
      el("a", { class: "to-top", href: "#main", html: '<span class="to-top-track" aria-hidden="true"><span class="to-top-bar"></span></span><i class="fa-solid fa-arrow-up" aria-hidden="true"></i><span class="to-top-label">Back to top</span>' })
    );
  }

  /* ---------- Contacts ---------- */
  function contactItems() {
    var c = D.contact;
    return [
      ["fa-solid fa-location-dot", c.address, null],
      ["fa-brands fa-whatsapp", "WhatsApp " + c.phoneDisplay, waLink()],
      ["fa-solid fa-envelope", c.email, "mailto:" + c.email],
      ["fa-solid fa-clock", c.hours, null]
    ].map(function (r) {
      var body = r[2] ? el("a", { href: r[2], text: r[1] }) : el("span", { text: r[1] });
      if (r[2] && r[2].indexOf("https://") === 0) { body.setAttribute("target", "_blank"); body.setAttribute("rel", "noopener"); }
      return el("li", null, [el("i", { class: r[0], "aria-hidden": "true" }), body]);
    });
  }
  $$("#contactList, #footerContact").forEach(function (ul) { contactItems().forEach(function (li) { ul.appendChild(li); }); });

  /* ---------- Quote form → WhatsApp brief (home + contact) ---------- */
  var form = $("#quoteForm");
  function prefillQuote(service, detail) {
    if (!form) { location.href = "contact.html?service=" + encodeURIComponent(service || "") + "#quote"; return; }
    var select = $("#qService"), d = $("#qDetails");
    if (service) select.value = service;
    if (detail && !d.value.trim()) d.value = detail + " — ";
    $("#brief").hidden = true; form.hidden = false;
  }
  if (form) {
    var brief = $("#brief"), select = $("#qService");
    D.services.forEach(function (s) { select.appendChild(el("option", { value: s.name, text: s.name })); });
    if (param("service")) select.value = param("service");
    var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    $("#qDate").min = today.toISOString().slice(0, 10);

    var setError = function (id, msg) {
      var input = $("#" + id), box = $("#" + id + "Error");
      input.classList.toggle("is-invalid", !!msg);
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (msg) input.setAttribute("aria-describedby", id + "Error"); else input.removeAttribute("aria-describedby");
      box.textContent = msg || "";
      return !msg;
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var items = quote.list();
      var name = $("#qName").value.trim(), service = select.value, details = $("#qDetails").value.trim();
      // With items in the quote list, service and details become optional
      var ok = [
        setError("qName", name ? "" : "Enter your name so we know who to reply to."),
        setError("qService", service || items.length ? "" : "Choose the service closest to your project."),
        setError("qDetails", details.length >= 10 || items.length ? "" : "Add a few details — size, material or where it will be used.")
      ];
      if (ok.indexOf(false) !== -1) { var bad = $(".is-invalid", form); if (bad) bad.focus(); return; }

      var qty = $("#qQty").value.trim(), date = $("#qDate").value;
      var rows = [["Name", name]];
      if (service) rows.push(["Service", service]);
      if (qty) rows.push(["Quantity", qty]);
      if (date) rows.push(["Needed by", new Date(date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })]);
      if (details) rows.push(["Details", details]);
      items.forEach(function (it, i) { rows.push(["Item " + (i + 1), quote.describe(it)]); });

      var dl = $("#briefList"); dl.textContent = "";
      rows.forEach(function (r) { dl.appendChild(el("dt", { text: r[0] })); dl.appendChild(el("dd", { text: r[1] })); });
      $("#briefSend").href = waLink("Hi Majestic Print, I'd like a quote.\n\n" + rows.map(function (r) { return r[0] + ": " + r[1]; }).join("\n"));
      form.hidden = true; brief.hidden = false; $("#briefSend").focus();
    });
    $("#briefEdit").addEventListener("click", function () { brief.hidden = true; form.hidden = false; $("#qName").focus(); });
  }

  /* ---------- Header state, mobile nav ---------- */
  var header = $(".site-header");
  if (header) {
    var toTop = $(".to-top");
    var onScroll = function () {
      var y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
      header.classList.toggle("is-scrolled", y > 8);
      if (toTop) {
        toTop.classList.toggle("is-visible", y > window.innerHeight * 0.8);
        // Ink bar along the bottom edge shows how far down the page you are
        toTop.style.setProperty("--progress", max > 0 ? Math.min(1, y / max) : 0);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }
  // Back to top: always scroll to the very top of the page, then move focus to the content
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest(".to-top");
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    var main = document.getElementById("main");
    if (main) { main.setAttribute("tabindex", "-1"); main.focus({ preventScroll: true }); }
  });
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("#mobileNav a");
    if (!a) return;
    var oc = window.bootstrap && window.bootstrap.Offcanvas.getInstance($("#mobileNav"));
    if (oc) oc.hide();
  });

  /* ---------- Click feedback: a small CMY ink burst where you press ---------- */
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.addEventListener("pointerdown", function (e) {
    if (calm.matches || !e.target.closest) return;
    if (!e.target.closest(".btn-mp, .tab, .opt, .art-opt, .cal-bar, .cap-row, .occ-chip, .press-tab, .press-btn, .zone-key, .to-top, .ql-link")) return;
    var b = el("span", { class: "ink-burst", "aria-hidden": "true" }, [el("i"), el("i"), el("i")]);
    b.style.left = e.clientX + "px"; b.style.top = e.clientY + "px";
    document.body.appendChild(b);
    setTimeout(function () { b.remove(); }, 650);
  });

  /* ---------- Reveal on scroll (content stays visible without JS) ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }) : null;
  function observe(root) {
    $$(".reveal, .ticket-step", root || document).forEach(function (t) {
      if (t.classList.contains("is-in")) return;
      if (io) io.observe(t); else t.classList.add("is-in");
    });
  }

  /* ---------- Shared builders ---------- */
  // Spec-sheet product card (used by home and shop)
  function specCard(p, href) {
    var routeInk = {}; D.routes.forEach(function (r) { routeInk[r.title] = r.ink; });
    var dl = el("dl", { class: "spec" });
    Object.keys(p.specs).forEach(function (k) { dl.appendChild(el("dt", { text: k })); dl.appendChild(el("dd", { text: p.specs[k] })); });
    return el("article", { class: "spec-card reveal", "data-route": p.route, style: "--ink:" + ink(routeInk[p.route]) }, [
      el("a", { class: "spec-photo-link", href: href, tabindex: "-1", "aria-hidden": "true" }, [
        el("figure", { class: "print-frame spec-photo" }, [
          el("div", { class: "spec-img" }, [el("img", { src: p.img, alt: "", loading: "lazy", width: "800", height: "600" })]),
          el("span", { class: "spec-plate", text: p.route })
        ])
      ]),
      el("h3", null, [el("a", { href: href, text: p.name })]),
      dl,
      el("a", { class: "text-link", href: href, html: "Choose options" + ARROW })
    ]);
  }
  // Page head: a small press sheet with a breadcrumb slug
  function pageHead(opts) {
    var head = $("#pageHead");
    if (!head) return;
    head.textContent = "";
    var crumbs = el("nav", { class: "slug crumbs", "aria-label": "Breadcrumb" }, [el("a", { href: "index.html", text: "Home" })]);
    (opts.crumbs || []).forEach(function (c) {
      crumbs.appendChild(document.createTextNode("  /  "));
      crumbs.appendChild(c[1] ? el("a", { href: c[1], text: c[0] }) : el("span", { "aria-current": "page", text: c[0] }));
    });
    var h1 = opts.title ? el("h1", { class: "page-title" }, [document.createTextNode(opts.title), el("span", { class: "dot", style: "color:" + (opts.ink || ink("magenta")), text: "." })]) : null;
    head.appendChild(el("div", { class: "container-xl" }, [
      el("div", { class: "page-sheet" }, [
        el("span", { class: "crop tl", "aria-hidden": "true" }), el("span", { class: "crop tr", "aria-hidden": "true" }),
        el("span", { class: "crop bl", "aria-hidden": "true" }), el("span", { class: "crop br", "aria-hidden": "true" }),
        crumbs,
        h1 ? el("div", { class: "page-head-grid" }, [
          el("div", null, [opts.kicker ? el("p", { class: "kicker", text: opts.kicker }) : null, h1]),
          el("div", { class: "page-head-side" }, [
            opts.icon ? el("span", { class: "page-icon", style: "--ink:" + (opts.ink || ink("magenta")), "aria-hidden": "true", html: opts.icon }) : null,
            opts.lead ? el("p", { class: "lead-text", text: opts.lead }) : null
          ])
        ]) : null
      ])
    ]));
    if (opts.title) document.title = opts.title + " — Majestic Print Solutions";
  }

  quote.render();
  window.addEventListener("storage", function (e) { if (e.key === KEY) quote.render(); });

  window.MP = {
    D: D, $: $, $$: $$, el: el, ink: ink, slugify: slugify, waLink: waLink, param: param, ARROW: ARROW,
    quote: quote, prefillQuote: prefillQuote, observe: observe, specCard: specCard, pageHead: pageHead, serviceByName: serviceByName
  };

  // Page scripts register via MP_PAGE; run them, then observe whatever they built
  document.addEventListener("DOMContentLoaded", function () {
    var fn = window.MP_PAGES && window.MP_PAGES[page];
    if (fn) fn(window.MP);
    observe();
  });
})();
