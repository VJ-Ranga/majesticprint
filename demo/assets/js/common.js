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

  D.services.forEach(function (s) { s.slug = slugify(s.name); s.outputs = s.items.join(" · "); });
  function catById(id) { return D.categories.filter(function (c) { return c.id === id; })[0] || D.categories[0]; }

  /* ---------- Make-ready preloader ---------- */
  (function () {
    var pl = document.getElementById("preloader"), root = document.documentElement;
    // Homepage only, first visit in this browser only (the head script decides before first paint)
    if (!pl || !root.classList.contains("is-loading")) { if (pl) pl.remove(); root.classList.remove("is-loading"); return; }
    try { localStorage.setItem("mp-intro-seen", "1"); } catch (e) {}
    var quick = false, reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) pl.classList.add("pl-quick");
    var minTime = quick || reduce ? 380 : 1500, start = performance.now(), shown = 0, finished = false;
    var loaded = document.readyState === "complete";
    window.addEventListener("load", function () { loaded = true; });
    var stepEl = document.getElementById("plStep"), pctEl = document.getElementById("plPct");
    var steps = [[0, "Loading plates"], [28, "Registering C · M · Y"], [62, "Inking up"], [100, "Ready to print"]];

    function imageRatio() {
      var imgs = Array.prototype.filter.call(document.images, function (i) { return i.loading !== "lazy"; });
      if (!imgs.length) return 1;
      return imgs.filter(function (i) { return i.complete; }).length / imgs.length;
    }
    function frame() {
      if (finished) return;
      var t = Math.min(1, (performance.now() - start) / minTime);
      var target = (loaded ? t : Math.min(t, 0.92 * imageRatio())) * 100;
      shown += (target - shown) * 0.18;
      if (target - shown < 0.4) shown = target;
      pl.style.setProperty("--p", shown.toFixed(1) + "%");
      pl.querySelector(".pl-fill").style.setProperty("--p", shown.toFixed(1) + "%");
      pctEl.textContent = Math.round(shown);
      for (var k = steps.length - 1; k >= 0; k--) if (shown >= steps[k][0]) { stepEl.textContent = steps[k][1]; break; }
      if (shown >= 100 && loaded) finish(); else requestAnimationFrame(frame);
    }
    function finish() {
      if (finished) return;
      finished = true;
      pctEl.textContent = "100"; stepEl.textContent = "Ready to print";
      pl.querySelector(".pl-fill").style.setProperty("--p", "100%");
      setTimeout(function () {
        pl.classList.add("is-leaving");
        root.classList.remove("is-loading");
        setTimeout(function () { pl.remove(); }, 800);
      }, quick || reduce ? 80 : 220);
    }
    requestAnimationFrame(frame);
    setTimeout(function () { loaded = true; }, 5000); // never hold the page longer than this
  })();
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


  /* ---------- Price + cart (SAMPLE prices from data.js — replace with the client's rate card) ---------- */
  function money(n) {
    n = Math.round(n || 0);
    return "LKR " + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function productBySlug(slug) { return D.catalogue.filter(function (x) { return x.slug === slug; })[0]; }
  // total + per-unit price for chosen options at a quantity (add-ons are LKR per unit)
  function price(p, chosen, qty) {
    var pr = p && p.price; qty = Math.max(1, parseInt(qty, 10) || 1);
    if (!pr) return { total: 0, unit: 0 };
    var steps = Object.keys(pr.base).map(Number).sort(function (a, b) { return a - b; });
    var baseTotal;
    if (pr.base[String(qty)] != null) baseTotal = pr.base[String(qty)];
    else {
      var lower = steps[0];
      steps.forEach(function (st) { if (st <= qty) lower = st; });
      baseTotal = (pr.base[String(lower)] / lower) * qty; // per-unit rate of the nearest lower step
    }
    var extra = 0;
    Object.keys(pr.add || {}).forEach(function (g) {
      var v = chosen && chosen[g];
      if (v != null && pr.add[g][v]) extra += pr.add[g][v];
    });
    var total = Math.max(0, Math.round(baseTotal + extra * qty));
    return { total: total, unit: Math.round(total / qty) };
  }
  function defaults(p) { var o = {}; Object.keys(p.options).forEach(function (g) { o[g] = p.options[g][0]; }); return o; }
  function fromPrice(p) {
    var q = p.quantities[0];
    return { total: price(p, defaults(p), q).total, qty: q };
  }

  var CART_KEY = "mp-cart";
  var cart = {
    list: function () { try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch (e) { return []; } },
    save: function (items) {
      try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) {}
      cart.render();
      document.dispatchEvent(new CustomEvent("mp:cart-change"));
    },
    add: function (item) {
      var l = cart.list();
      l.push({ slug: item.slug, name: item.name, img: item.img, options: item.options || {}, qty: item.qty, unit: item.unit, total: item.total,
        artwork: item.artwork || "", personal: item.personal || "", notes: item.notes || "" });
      cart.save(l);
    },
    update: function (i, qty) {
      var l = cart.list(), it = l[i]; if (!it) return;
      qty = Math.max(1, parseInt(qty, 10) || 1);
      var p = productBySlug(it.slug);
      if (p) { var r = price(p, it.options, qty); it.unit = r.unit; it.total = r.total; } else { it.total = it.unit * qty; }
      it.qty = qty; cart.save(l);
    },
    remove: function (i) { var l = cart.list(); l.splice(i, 1); cart.save(l); },
    clear: function () { cart.save([]); },
    count: function () { return cart.list().reduce(function (n, it) { return n + 1 * (it.qty > 0 ? 1 : 0); }, 0); },
    subtotal: function () { return cart.list().reduce(function (n, it) { return n + (it.total || 0); }, 0); },
    render: function () {
      var n = cart.count();
      $$(".cart-count").forEach(function (c) { c.textContent = n; c.hidden = n === 0; });
    }
  };

  /* ---------- Header + footer ---------- */
  var NAV = [
    ["shop", "shop.html", "Shop"],
    ["solutions", "services.html", "Services"],
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
            el("img", { src: "assets/img/brand/logo-h-light.svg", width: "170", height: "47", alt: "Majestic Print Solutions" })
          ]),
          el("nav", { class: "main-nav d-none d-lg-flex", "aria-label": "Primary" }, navLinks()),
          el("div", { class: "header-actions" }, [
            el("button", { type: "button", class: "ql-link search-open", "aria-label": "Search products and services", "aria-haspopup": "dialog", html: '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>' }),
            el("a", { class: "ql-link", href: "cart.html", "aria-label": "Cart", html: '<i class="fa-solid fa-bag-shopping" aria-hidden="true"></i><span class="ql-count cart-count" hidden>0</span>' }),
            el("a", { class: "ql-link", href: "contact.html#quote", "aria-label": "Quote list", html: '<i class="fa-solid fa-clipboard-list" aria-hidden="true"></i><span class="ql-count" hidden>0</span>' }),
            el("a", { class: "btn-mp btn-mp-accent d-none d-sm-inline-flex", href: "contact.html#quote", text: "Request a quote" }),
            el("button", { class: "menu-toggle d-lg-none", type: "button", "data-bs-toggle": "offcanvas", "data-bs-target": "#mobileNav", "aria-controls": "mobileNav", "aria-label": "Open menu", html: '<i class="fa-solid fa-bars" aria-hidden="true"></i>' })
          ])
        ])
      ]),
      el("div", { class: "offcanvas offcanvas-end mobile-nav", tabindex: "-1", id: "mobileNav", "aria-labelledby": "mobileNavLabel" }, [
        el("div", { class: "mn-inkbar", "aria-hidden": "true" }, [el("span"), el("span"), el("span"), el("span"), el("span")]),
        el("span", { class: "crop tl", "aria-hidden": "true" }), el("span", { class: "crop tr", "aria-hidden": "true" }),
        el("span", { class: "crop bl", "aria-hidden": "true" }), el("span", { class: "crop br", "aria-hidden": "true" }),
        el("div", { class: "mn-head" }, [
          el("a", { class: "mn-logo", href: "index.html" }, [el("img", { src: "assets/img/brand/logo-h-light.svg", width: "170", height: "47", alt: "Majestic Print Solutions — home" })]),
          el("button", { type: "button", class: "mn-close", "data-bs-dismiss": "offcanvas", "aria-label": "Close menu", html: '<i class="fa-solid fa-xmark" aria-hidden="true"></i>' })
        ]),
        el("p", { class: "mn-slug slug", id: "mobileNavLabel" }, [el("span", { class: "js-target", "aria-hidden": "true" }), document.createTextNode("Menu")]),
        el("div", { class: "offcanvas-body mn-body" }, [
          el("nav", { class: "mn-nav", "aria-label": "Mobile primary" }, navLinks().map(function (a, i) {
            var inks = ["bright", "magenta", "gold", "deep", "orange", "bright"];
            a.classList.add("mn-link");
            a.style.setProperty("--ink", ink(inks[i % inks.length]));
            a.style.setProperty("--i", i);
            var label = a.textContent; a.textContent = "";
            a.appendChild(el("span", { class: "mn-no", "aria-hidden": "true", text: String(i + 1).padStart(2, "0") }));
            a.appendChild(el("span", { class: "mn-label", text: label }));
            a.appendChild(el("i", { class: "fa-solid fa-arrow-right mn-arrow", "aria-hidden": "true" }));
            return a;
          })),
          el("a", { class: "mn-cart text-link", href: "cart.html", html: '<i class="fa-solid fa-bag-shopping" aria-hidden="true"></i> Cart <span class="ql-count cart-count" hidden>0</span>' }),
          el("div", { class: "mn-block" }, [
            el("p", { class: "slug mn-cap", text: "Shop by" }),
            el("div", { class: "mn-routes" }, D.categories.map(function (c) {
              return el("a", { class: "mn-route", href: "shop.html?cat=" + c.id, style: "--ink:" + ink(c.ink) }, [
                el("span", { class: "mn-route-ink", "aria-hidden": "true" }),
                el("span", { text: c.title })
              ]);
            }))
          ]),
          el("div", { class: "mn-actions" }, [
            el("a", { class: "btn-mp btn-mp-accent", href: "contact.html#quote", text: "Request a quote" }),
            el("a", { class: "btn-mp btn-mp-whatsapp", href: waLink("Hi Majestic Print, I'd like to ask about an order."), target: "_blank", rel: "noopener", "aria-label": "Chat on WhatsApp", html: '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i>' })
          ]),
          el("ul", { class: "contact-list mn-contact", id: "mobileContact" }),
          el("div", { class: "mn-strip", "aria-hidden": "true" }, [el("span"), el("span"), el("span"), el("span"), el("span")])
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
              el("img", { src: "assets/img/brand/logo-h-dark.svg", width: "170", height: "47", alt: "Majestic Print Solutions", class: "footer-logo" }),
              el("p", { class: "footer-tag", text: "One partner. Every printing solution." }),
              el("p", { class: "footer-about", text: "Printing, packaging, signage and promotional products for businesses and personal orders across Sri Lanka." })
            ]),
            col("Shop", D.categories.map(function (c) { return [c.title, "shop.html?cat=" + c.id]; })),
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
  $$("#contactList, #footerContact, #mobileContact").forEach(function (ul) { contactItems().forEach(function (li) { ul.appendChild(li); }); });

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


  /* ---------- Category chips: one row of simple text chips ---------- */
  function filterBar(opts) {
    var bar = el("div", { class: "cat-chips", role: "group", "aria-label": opts.label || "Filter" });
    var buttons = opts.items.map(function (it) {
      var attrs = { type: "button", class: "occ-chip", "data-id": it.id, "aria-pressed": "false", text: it.title };
      if (it.id !== "all") attrs.style = "--ink:" + ink(it.ink);
      var b = el("button", attrs);
      b.addEventListener("click", function () { set(it.id); opts.onChange(it.id); });
      bar.appendChild(b);
      return b;
    });
    function set(id) {
      buttons.forEach(function (b) {
        var on = b.getAttribute("data-id") === id;
        b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }
    set(opts.active || "all");
    bar.setActive = set;
    return bar;
  }

  /* ---------- Search pop-up: products and services ---------- */
  var searchDialog = null;
  function buildSearch() {
    var input = el("input", { type: "search", class: "sd-input", id: "siteSearch", placeholder: "Search visiting cards, banners, labels…", autocomplete: "off", "aria-label": "Search products and services", "aria-controls": "sdResults" });
    var results = el("div", { class: "sd-results", id: "sdResults", "aria-live": "polite" });
    var close = el("button", { type: "button", class: "sd-close", "aria-label": "Close search", html: '<i class="fa-solid fa-xmark" aria-hidden="true"></i>' });
    var dlg = el("dialog", { class: "search-dialog", "aria-label": "Search" }, [
      el("div", { class: "sd-sheet" }, [
        el("span", { class: "crop tl", "aria-hidden": "true" }), el("span", { class: "crop tr", "aria-hidden": "true" }),
        el("span", { class: "crop bl", "aria-hidden": "true" }), el("span", { class: "crop br", "aria-hidden": "true" }),
        el("div", { class: "sd-head" }, [el("p", { class: "slug", text: "Search · products and services" }), close]),
        el("form", { class: "sd-form", role: "search" }, [el("i", { class: "fa-solid fa-magnifying-glass", "aria-hidden": "true" }), input]),
        results
      ])
    ]);
    var index = D.catalogue.map(function (p) {
      var c = catById(p.cat);
      return { type: "Product", title: p.name, sub: c.title, img: p.img, ink: c.ink, href: "product.html?p=" + p.slug,
        text: (p.name + " " + c.title + " " + p.service + " " + p.blurb).toLowerCase() };
    }).concat(D.services.map(function (sv) {
      return { type: "Service", title: sv.name, sub: sv.tagline, icon: (window.MP_ICONS || {})[sv.name], ink: sv.ink, href: "service.html?s=" + sv.slug,
        text: (sv.name + " " + sv.tagline + " " + sv.items.join(" ")).toLowerCase() };
    }));
    var suggestions = ["Visiting cards", "Banners", "Labels", "Mugs", "Wedding cards", "Vehicle branding"];

    function row(r) {
      var media = r.img ? el("span", { class: "sd-thumb" }, [el("img", { src: r.img, alt: "", loading: "lazy" })])
                        : el("span", { class: "sd-thumb sd-icon", style: "--ink:" + ink(r.ink), html: r.icon || "" });
      return el("a", { class: "sd-row", href: r.href }, [media, el("span", { class: "sd-text" }, [el("strong", { text: r.title }), el("span", { text: r.sub })]),
        el("span", { class: "slug sd-type", text: r.type })]);
    }
    function render(q) {
      results.textContent = "";
      q = q.trim().toLowerCase();
      if (!q) {
        results.appendChild(el("p", { class: "slug sd-cap", text: "Popular searches" }));
        results.appendChild(el("div", { class: "sd-chips" }, suggestions.map(function (t) {
          var b = el("button", { type: "button", class: "sd-chip", text: t });
          b.addEventListener("click", function () { input.value = t; render(t); input.focus(); });
          return b;
        })));
        return;
      }
      var words = q.split(/\s+/);
      var hits = index.filter(function (r) { return words.every(function (w) { return r.text.indexOf(w) !== -1; }); });
      var prods = hits.filter(function (r) { return r.type === "Product"; }).slice(0, 6);
      var svcs = hits.filter(function (r) { return r.type === "Service"; }).slice(0, 4);
      if (!prods.length && !svcs.length) {
        results.appendChild(el("div", { class: "sd-empty" }, [
          el("p", null, [document.createTextNode("No products match “"), el("strong", { text: q }), document.createTextNode("”.")]),
          el("a", { class: "btn-mp btn-mp-primary", href: "contact.html#quote", text: "Ask us to quote it" })
        ]));
        return;
      }
      if (prods.length) { results.appendChild(el("p", { class: "slug sd-cap", text: "Products" })); prods.forEach(function (r) { results.appendChild(row(r)); }); }
      if (svcs.length) { results.appendChild(el("p", { class: "slug sd-cap", text: "Services" })); svcs.forEach(function (r) { results.appendChild(row(r)); }); }
      results.appendChild(el("a", { class: "text-link sd-all", href: "shop.html?q=" + encodeURIComponent(q), html: "See all results in the shop" + ARROW }));
    }
    input.addEventListener("input", function () { render(input.value); });
    dlg.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      var first = results.querySelector(".sd-row");
      if (first) location.href = first.getAttribute("href");
    });
    close.addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    document.body.appendChild(dlg);
    dlg._open = function () { render(input.value); if (!dlg.open) dlg.showModal(); input.focus(); input.select(); };
    return dlg;
  }
  function openSearch() { if (!searchDialog) searchDialog = buildSearch(); searchDialog._open(); }
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest(".search-open")) { e.preventDefault(); openSearch(); }
  });
  document.addEventListener("keydown", function (e) {
    var tag = (e.target.tagName || "").toLowerCase();
    if (e.key === "/" && tag !== "input" && tag !== "textarea" && tag !== "select" && !e.target.isContentEditable) { e.preventDefault(); openSearch(); }
  });

  /* ---------- Shared builders ---------- */
  // Spec-sheet product card (used by home and shop)
  function specCard(p, href) {
    var cat = catById(p.cat);
    var full = productBySlug(p.slug);
    var dl = el("dl", { class: "spec" });
    Object.keys(p.specs).slice(0, 3).forEach(function (k) { dl.appendChild(el("dt", { text: k })); dl.appendChild(el("dd", { text: p.specs[k] })); });
    var kids = [
      el("a", { class: "spec-photo-link", href: href, tabindex: "-1", "aria-hidden": "true" }, [
        el("figure", { class: "print-frame spec-photo" }, [
          el("div", { class: "spec-img" }, [el("img", { src: p.img, alt: "", loading: "lazy", width: "800", height: "600" })]),
          el("span", { class: "spec-plate", text: cat.title })
        ])
      ]),
      el("h3", null, [el("a", { href: href, text: p.name })])
    ];
    if (full && full.price) {
      var fp = fromPrice(full);
      kids.push(el("p", { class: "spec-price" }, [el("span", { class: "slug", text: "From" }), el("strong", { text: money(fp.total) })]));
      kids.push(el("p", { class: "spec-meta", text: "Min " + fp.qty + " · Ready in " + full.days + " days" }));
    }
    kids.push(dl);
    var actions = el("div", { class: "spec-actions" });
    if (full && full.price) {
      var add = el("button", { type: "button", class: "btn-mp btn-mp-primary btn-mp-sm", text: "Add to cart" });
      add.addEventListener("click", function () {
        var o = defaults(full), q = full.quantities[0], r = price(full, o, q);
        cart.add({ slug: full.slug, name: full.name, img: full.img, options: o, qty: q, unit: r.unit, total: r.total });
        add.innerHTML = 'Added <i class="fa-solid fa-check" aria-hidden="true"></i>';
        add.disabled = true;
        setTimeout(function () { add.textContent = "Add to cart"; add.disabled = false; }, 1600);
      });
      actions.appendChild(add);
    }
    actions.appendChild(el("a", { class: "text-link", href: href, html: "Choose options" + ARROW }));
    kids.push(actions);
    return el("article", { class: "spec-card reveal", "data-cat": cat.id, style: "--ink:" + ink(cat.ink) }, kids);
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

  quote.render(); cart.render();
  window.addEventListener("storage", function (e) { if (e.key === CART_KEY) cart.render(); });
  window.addEventListener("storage", function (e) { if (e.key === KEY) quote.render(); });

  window.MP = {
    D: D, $: $, $$: $$, el: el, ink: ink, slugify: slugify, waLink: waLink, param: param, ARROW: ARROW,
    quote: quote, cart: cart, price: price, money: money, fromPrice: fromPrice, defaults: defaults, productBySlug: productBySlug, prefillQuote: prefillQuote, catById: catById, filterBar: filterBar, openSearch: openSearch, observe: observe, specCard: specCard, pageHead: pageHead, serviceByName: serviceByName
  };

  // Page scripts register via MP_PAGE; run them, then observe whatever they built
  document.addEventListener("DOMContentLoaded", function () {
    var fn = window.MP_PAGES && window.MP_PAGES[page];
    if (fn) fn(window.MP);
    observe();
  });
})();
