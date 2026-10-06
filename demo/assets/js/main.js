/* Majestic Print — homepage demo behaviour */
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
      else if (k === "style") node.setAttribute("style", attrs[k]);
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function ink(key) { return (D.inks[key] || D.inks.deep).hex; }
  function waLink(text) {
    return "https://wa.me/" + D.contact.whatsapp + (text ? "?text=" + encodeURIComponent(text) : "");
  }

  var IDEA_ICONS = ["fa-gift", "fa-pen-nib", "fa-box-open", "fa-shirt"];

  /* ---------- Routes ---------- */
  var routeGrid = $("#routeGrid");
  D.routes.forEach(function (r) {
    var list = el("ul", null, r.items.map(function (t) { return el("li", { text: t }); }));
    var link = el("a", { href: r.id === "print" ? "#products" : "#solutions", html: 'Explore ' + r.title + ' <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>' });
    link.addEventListener("click", function () { if (r.id === "print") setFilter("Print"); });
    var h3 = el("h3", null, [document.createTextNode(r.title), el("span", { text: "." })]);
    var media = el("div", { class: "route-media" }, [el("img", { src: r.img, alt: "", loading: "lazy", width: "800", height: "500" })]);
    var card = el("article", { class: "route-card", style: "--ink:" + ink(r.ink) }, [media, el("div", { class: "route-body" }, [h3, el("p", { text: r.text }), list, link])]);
    routeGrid.appendChild(el("div", { class: "col-md-4 reveal" }, [card]));
  });

  /* ---------- Ticker ---------- */
  var track = $("#tickerTrack"), tickInks = ["bright", "magenta", "gold", "orange"];
  [0, 1].forEach(function (pass) {
    D.services.forEach(function (s, i) {
      var li = el("li", { text: s.name, style: "--tick:" + ink(tickInks[i % tickInks.length]) });
      if (pass) li.setAttribute("aria-hidden", "true");
      track.appendChild(li);
    });
  });

  /* ---------- Showcase ---------- */
  var showcase = $("#showcase");
  D.showcase.forEach(function (w) {
    showcase.appendChild(el("article", { class: "work-card reveal" + (w.size === "large" ? " is-large" : "") }, [
      el("img", { src: w.img, alt: w.title + " (sample image)", loading: "lazy" }),
      el("div", { class: "work-info" }, [el("p", { class: "slug", text: w.service }), el("h3", { text: w.title })])
    ]));
  });

  /* ---------- Products + filter ---------- */
  var productGrid = $("#productGrid");
  var routeInk = {}; D.routes.forEach(function (r) { routeInk[r.title] = r.ink; });
  D.products.forEach(function (p) {
    var btn = el("a", { class: "btn-mp btn-mp-outline", href: "#quote", html: 'Customise <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>' });
    btn.setAttribute("aria-label", "Customise " + p.name);
    btn.addEventListener("click", function () { prefillQuote(p.service, p.name); });
    var card = el("article", { class: "product-card" }, [
      el("div", { class: "product-art" }, [
        el("span", { class: "product-tag", style: "--ink:" + ink(routeInk[p.route]), text: p.route }),
        el("img", { src: p.img, alt: p.name, loading: "lazy", width: "800", height: "600" })
      ]),
      el("div", { class: "product-body" }, [
        el("h3", { text: p.name }),
        el("p", { text: p.options }),
        btn
      ])
    ]);
    productGrid.appendChild(el("div", { class: "col-sm-6 col-lg-4 product-col", "data-route": p.route }, [card]));
  });

  function setFilter(route) {
    $$(".filter-tabs .chip").forEach(function (b) {
      var on = b.getAttribute("data-filter") === route;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    $$(".product-col").forEach(function (c) {
      c.hidden = !(route === "all" || c.getAttribute("data-route") === route);
    });
  }
  $$(".filter-tabs .chip").forEach(function (b) {
    b.addEventListener("click", function () { setFilter(b.getAttribute("data-filter")); });
  });

  /* ---------- Swatch book ---------- */
  var swatchGrid = $("#swatchGrid");
  var swatches = [];
  D.services.forEach(function (s, i) {
    var inkObj = D.inks[s.ink];
    var b = el("button", {
      type: "button", class: "swatch", role: "listitem", "aria-pressed": "false",
      style: "--ink:" + inkObj.hex + ";--tint:" + (s.tint / 100) + ";--n:" + i + ";--fan:" + ((i % 4) * 8 - 12)
    }, [
      el("span", { class: "swatch-ink", "aria-hidden": "true" }),
      el("span", { class: "swatch-label" }, [
        el("span", { class: "slug", text: inkObj.name + " · " + s.tint + "%" }),
        el("strong", { text: s.name })
      ])
    ]);
    b.addEventListener("click", function () { selectService(i, true); });
    swatches.push(b);
    swatchGrid.appendChild(b);
  });

  function selectService(i, fromUser) {
    var s = D.services[i], inkObj = D.inks[s.ink];
    swatches.forEach(function (b, j) { b.setAttribute("aria-pressed", i === j ? "true" : "false"); });
    var detail = $("#swatchDetail");
    detail.style.setProperty("--detail-ink", inkObj.hex);
    $("#sdInk").textContent = inkObj.name + " · " + s.tint + "% tint";
    $("#sdName").textContent = s.name;
    $("#sdText").textContent = s.text;
    var ul = $("#sdExamples"); ul.textContent = "";
    s.examples.forEach(function (e) { ul.appendChild(el("li", { text: e })); });
    var cta = $("#sdCta");
    cta.textContent = "Plan your " + s.name.toLowerCase() + " project";
    cta.onclick = function () { prefillQuote(s.name); };
    // On small screens the detail sits below the grid — bring it into view
    if (fromUser && window.innerWidth < 992) detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  selectService(0, false);

  /* ---------- Occasions (tabs) ---------- */
  var tabWrap = $("#occasionTabs"), panel = $("#occasionPanel"), tabs = [];
  D.occasions.forEach(function (o, i) {
    var t = el("button", { type: "button", class: "chip", role: "tab", id: "tab-" + o.id, "aria-controls": "occasionPanel", "aria-selected": "false", tabindex: "-1", text: o.label });
    t.addEventListener("click", function () { showOccasion(i); });
    t.addEventListener("keydown", function (e) {
      var n = null;
      if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
      if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") n = 0;
      if (e.key === "End") n = tabs.length - 1;
      if (n !== null) { e.preventDefault(); showOccasion(n); tabs[n].focus(); }
    });
    tabs.push(t); tabWrap.appendChild(t);
  });
  function showOccasion(i) {
    var o = D.occasions[i];
    tabs.forEach(function (t, j) {
      t.setAttribute("aria-selected", i === j ? "true" : "false");
      t.setAttribute("tabindex", i === j ? "0" : "-1");
    });
    panel.setAttribute("aria-labelledby", "tab-" + o.id);
    panel.textContent = "";
    panel.appendChild(el("p", { class: "occasion-note slug", text: "Season · " + o.note }));
    o.ideas.forEach(function (idea, k) {
      var a = el("a", { href: "#quote", html: 'Ask about this <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>' });
      a.setAttribute("aria-label", "Ask about " + idea);
      a.addEventListener("click", function () { prefillQuote("Promotional & Corporate Gifts", idea + " for " + o.label); });
      panel.appendChild(el("div", { class: "idea", style: "--n:" + k }, [
        el("i", { class: "fa-solid " + IDEA_ICONS[k % IDEA_ICONS.length], "aria-hidden": "true" }),
        el("span", { text: idea }),
        a
      ]));
    });
  }
  showOccasion(0);

  /* ---------- Process steps ---------- */
  var stepList = $("#stepList");
  D.steps.forEach(function (s) {
    stepList.appendChild(el("li", { class: "step reveal" + (s.stamp ? " step-proof" : "") }, [
      s.stamp ? el("span", { class: "stamp", "aria-hidden": "true", text: "Approved" }) : null,
      el("h3", { text: s.title }),
      el("p", { text: s.text })
    ]));
  });

  /* ---------- Contacts ---------- */
  function contactItems() {
    var c = D.contact;
    return [
      ["fa-location-dot", c.address, null],
      ["fa-brands fa-whatsapp", "WhatsApp " + c.phoneDisplay, waLink()],
      ["fa-envelope", c.email, "mailto:" + c.email],
      ["fa-clock", c.hours, null]
    ].map(function (r) {
      var iconClass = r[0].indexOf("fa-brands") === 0 ? r[0] : "fa-solid " + r[0];
      var body = r[2] ? el("a", { href: r[2], text: r[1] }) : el("span", { text: r[1] });
      if (r[2] && r[2].indexOf("https://") === 0) { body.setAttribute("target", "_blank"); body.setAttribute("rel", "noopener"); }
      return el("li", null, [el("i", { class: iconClass, "aria-hidden": "true" }), body]);
    });
  }
  contactItems().forEach(function (li) { $("#contactList").appendChild(li); });
  contactItems().forEach(function (li) { $("#footerContact").appendChild(li); });
  $("#waFloat").href = waLink("Hi Majestic Print, I'd like to ask about an order.");
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Quote form → WhatsApp brief ---------- */
  var form = $("#quoteForm"), brief = $("#brief"), select = $("#qService");
  D.services.forEach(function (s) { select.appendChild(el("option", { value: s.name, text: s.name })); });
  var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  $("#qDate").min = today.toISOString().slice(0, 10);

  function prefillQuote(service, detail) {
    if (service) select.value = service;
    var d = $("#qDetails");
    if (detail && !d.value.trim()) d.value = detail + " — ";
    brief.hidden = true; form.hidden = false;
  }

  function setError(id, msg) {
    var input = $("#" + id), box = $("#" + id + "Error");
    input.classList.toggle("is-invalid", !!msg);
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (msg) input.setAttribute("aria-describedby", id + "Error"); else input.removeAttribute("aria-describedby");
    box.textContent = msg || "";
    return !msg;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("#qName").value.trim();
    var service = select.value;
    var details = $("#qDetails").value.trim();
    var ok = [
      setError("qName", name ? "" : "Enter your name so we know who to reply to."),
      setError("qService", service ? "" : "Choose the service closest to your project."),
      setError("qDetails", details.length >= 10 ? "" : "Add a few details — size, material or where it will be used.")
    ];
    if (ok.indexOf(false) !== -1) {
      var firstBad = $(".is-invalid", form); if (firstBad) firstBad.focus();
      return;
    }

    var qty = $("#qQty").value.trim(), date = $("#qDate").value;
    var rows = [["Name", name], ["Service", service]];
    if (qty) rows.push(["Quantity", qty]);
    if (date) rows.push(["Needed by", new Date(date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })]);
    rows.push(["Details", details]);

    var dl = $("#briefList"); dl.textContent = "";
    rows.forEach(function (r) { dl.appendChild(el("dt", { text: r[0] })); dl.appendChild(el("dd", { text: r[1] })); });

    var msg = "Hi Majestic Print, I'd like a quote.\n\n" + rows.map(function (r) { return r[0] + ": " + r[1]; }).join("\n");
    $("#briefSend").href = waLink(msg);

    form.hidden = true; brief.hidden = false;
    $("#briefSend").focus();
  });

  $("#briefEdit").addEventListener("click", function () {
    brief.hidden = true; form.hidden = false; $("#qName").focus();
  });

  /* ---------- Demo view switcher (demo only) ---------- */
  var root = document.documentElement;
  function syncDemo() {
    $$(".seg button").forEach(function (b) {
      b.setAttribute("aria-pressed", root.getAttribute("data-" + b.getAttribute("data-set")) === b.getAttribute("data-value") ? "true" : "false");
    });
  }
  $$(".seg button").forEach(function (b) {
    b.addEventListener("click", function () {
      root.setAttribute("data-" + b.getAttribute("data-set"), b.getAttribute("data-value"));
      try { localStorage.setItem("mp-demo-view", JSON.stringify({ layout: root.getAttribute("data-layout"), media: root.getAttribute("data-media") })); } catch (e) {}
      syncDemo();
    });
  });
  syncDemo();
  $("#demoClose").addEventListener("click", function () { $("#demoBar").hidden = true; });

  /* ---------- Header state + current section ---------- */
  var header = $(".site-header");
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // Close mobile menu after choosing a link
  $$("#mobileNav a").forEach(function (a) {
    a.addEventListener("click", function () {
      var oc = window.bootstrap && window.bootstrap.Offcanvas.getInstance($("#mobileNav"));
      if (oc) oc.hide();
    });
  });

  /* ---------- Reveal on scroll (content stays visible without JS) ---------- */
  $$(".color-strip span").forEach(function (s, i) { s.style.setProperty("--n", i); });

  var targets = $$(".reveal, .swatch-book, .step");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (t) { io.observe(t); });

    var navLinks = $$(".main-nav a");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle("is-current", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["products", "solutions", "work", "gifts", "process", "contact"].forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  } else {
    targets.forEach(function (t) { t.classList.add("is-in"); });
  }
})();
