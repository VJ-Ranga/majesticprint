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
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }
  function ink(key) { return (D.inks[key] || D.inks.deep).hex; }
  function waLink(text) {
    return "https://wa.me/" + D.contact.whatsapp + (text ? "?text=" + encodeURIComponent(text) : "");
  }
  var ARROW = ' <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';
  var narrow = window.matchMedia("(max-width: 991px)");

  /* ---------- Print / Pack / Promote (duotone plates) ---------- */
  var routeGrid = $("#routeGrid");
  D.routes.forEach(function (r) {
    var link = el("a", { class: "text-link", href: r.target, html: "Explore " + r.title + ARROW });
    link.addEventListener("click", function () { if (r.filter) setFilter(r.filter); });
    routeGrid.appendChild(el("article", { class: "route reveal", style: "--ink:" + ink(r.ink) }, [
      el("figure", { class: "print-frame duo" }, [
        el("div", { class: "duo-img" }, [
          el("img", { class: "duo-base", src: r.img, alt: "", loading: "lazy", width: "900", height: "1125" }),
          el("img", { class: "duo-color", src: r.img, alt: "", loading: "lazy", width: "900", height: "1125" })
        ]),
        el("figcaption", { class: "slug", text: D.inks[r.ink].name + " plate · duotone" })
      ]),
      el("h3", null, [document.createTextNode(r.title), el("span", { text: "." })]),
      el("p", { text: r.text }),
      el("p", { class: "route-items", text: r.items.join("  /  ") }),
      link
    ]));
  });

  /* ---------- Ticker ---------- */
  var track = $("#tickerTrack");
  [0, 1].forEach(function (pass) {
    D.services.forEach(function (s) {
      var li = el("li", { text: s.name });
      if (pass) li.setAttribute("aria-hidden", "true");
      track.appendChild(li);
    });
  });

  /* ---------- Products as spec sheets + filter ---------- */
  var productGrid = $("#productGrid");
  var routeInk = {}; D.routes.forEach(function (r) { routeInk[r.title] = r.ink; });
  D.products.forEach(function (p) {
    var dl = el("dl", { class: "spec" });
    Object.keys(p.specs).forEach(function (k) {
      dl.appendChild(el("dt", { text: k }));
      dl.appendChild(el("dd", { text: p.specs[k] }));
    });
    var cta = el("a", { class: "text-link", href: "#quote", html: "Customise" + ARROW });
    cta.setAttribute("aria-label", "Customise " + p.name);
    cta.addEventListener("click", function () { prefillQuote(p.service, p.name); });
    productGrid.appendChild(el("article", { class: "spec-card reveal", "data-route": p.route, style: "--ink:" + ink(routeInk[p.route]) }, [
      el("figure", { class: "print-frame spec-photo" }, [
        el("div", { class: "spec-img" }, [el("img", { src: p.img, alt: p.name, loading: "lazy", width: "800", height: "600" })]),
        el("span", { class: "spec-plate", text: p.route })
      ]),
      el("h3", { text: p.name }),
      dl,
      cta
    ]));
  });

  function setFilter(route) {
    $$(".filter-tabs .tab").forEach(function (b) {
      var on = b.getAttribute("data-filter") === route;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    $$(".spec-card").forEach(function (c) {
      c.hidden = !(route === "all" || c.getAttribute("data-route") === route);
    });
  }
  $$(".filter-tabs .tab").forEach(function (b) {
    b.addEventListener("click", function () { setFilter(b.getAttribute("data-filter")); });
  });

  /* ---------- Capability index (12 services) ---------- */
  var capIndex = $("#capIndex"), capProof = $("#capProof"), capLayout = capIndex.parentNode, capRows = [];
  D.services.forEach(function (s, i) {
    var btn = el("button", { type: "button", class: "cap-row", "aria-expanded": "false", "aria-controls": "capProof", style: "--ink:" + ink(s.ink) }, [
      el("span", { class: "cap-chip", "aria-hidden": "true" }),
      el("span", { class: "cap-name", text: s.name }),
      el("span", { class: "cap-out", text: s.outputs.split(" · ").slice(0, 3).join(" · ") }),
      el("i", { class: "fa-solid fa-arrow-right cap-arrow", "aria-hidden": "true" })
    ]);
    btn.addEventListener("click", function () { selectService(i, true); });
    btn.addEventListener("mouseenter", function () { if (!narrow.matches) selectService(i, false); });
    btn.addEventListener("focus", function () { if (!narrow.matches) selectService(i, false); });
    var li = el("li", null, [btn]);
    capRows.push({ li: li, btn: btn });
    capIndex.appendChild(li);
  });
  // Warm the cache once the index is near, so swapping photos is instant
  var warmed = false;
  function warm() { if (warmed) return; warmed = true; D.services.forEach(function (s) { var im = new Image(); im.src = s.img; }); }
  capIndex.addEventListener("pointerenter", warm, { once: true });

  var currentService = -1;
  function selectService(i, fromClick) {
    var s = D.services[i];
    capRows.forEach(function (r, j) {
      r.btn.classList.toggle("is-active", i === j);
      r.btn.setAttribute("aria-expanded", i === j ? "true" : "false");
    });
    // On small screens the proof opens under the chosen row
    if (narrow.matches) capRows[i].li.appendChild(capProof);
    else if (capProof.parentNode !== capLayout) capLayout.appendChild(capProof);

    if (i !== currentService) {
      var img = $("#cpImg");
      capProof.classList.remove("is-swapping"); void capProof.offsetWidth; capProof.classList.add("is-swapping");
      img.src = s.img; img.alt = s.name + " (sample image)";
      capProof.style.setProperty("--ink", ink(s.ink));
      $("#cpSlug").textContent = s.name + "  ·  " + D.inks[s.ink].name + " plate  ·  sample image";
      $("#cpName").textContent = s.name;
      $("#cpText").textContent = s.text;
      $("#cpOutputs").textContent = s.outputs;
      var cta = $("#cpCta");
      cta.textContent = "Plan your " + s.name.toLowerCase() + " project";
      cta.onclick = function () { prefillQuote(s.name); };
      currentService = i;
    }
    if (fromClick && narrow.matches) {
      requestAnimationFrame(function () { capRows[i].btn.scrollIntoView({ behavior: "smooth", block: "start" }); });
    }
  }
  selectService(0, false);
  narrow.addEventListener("change", function () { var i = currentService; currentService = -1; selectService(i, false); });

  /* ---------- Showcase ---------- */
  var showcase = $("#showcase");
  D.showcase.forEach(function (w) {
    showcase.appendChild(el("figure", { class: "print-frame work reveal" + (w.size === "large" ? " is-large" : "") }, [
      el("div", { class: "work-img" }, [el("img", { src: w.img, alt: w.title + " (sample image)", loading: "lazy" })]),
      el("figcaption", null, [el("span", { class: "slug", text: w.service }), el("strong", { text: w.title })])
    ]));
  });

  /* ---------- Print calendar (occasions) ---------- */
  var calTabs = $("#calTabs"), tabs = [];
  D.occasions.forEach(function (o, i) {
    var t = el("button", {
      type: "button", class: "cal-bar", "data-ink": o.ink, "data-span": o.span, "data-align": o.start + o.span > 12 ? "end" : "start", role: "tab", id: "tab-" + o.id, "aria-controls": "calPanel",
      "aria-selected": "false", tabindex: "-1",
      style: "--ink:" + ink(o.ink) + ";--start:" + o.start + ";--span:" + o.span + ";--row:" + o.row
    }, [el("span", { class: "cal-label", text: o.label }), el("span", { class: "cal-when", text: o.when })]);
    t.addEventListener("click", function () { showOccasion(i); });
    t.addEventListener("keydown", function (e) {
      var n = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % tabs.length;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") n = 0;
      if (e.key === "End") n = tabs.length - 1;
      if (n !== null) { e.preventDefault(); showOccasion(n); tabs[n].focus(); }
    });
    tabs.push(t); calTabs.appendChild(t);
  });
  function showOccasion(i) {
    var o = D.occasions[i], panel = $("#calPanel");
    tabs.forEach(function (t, j) {
      t.setAttribute("aria-selected", i === j ? "true" : "false");
      t.setAttribute("tabindex", i === j ? "0" : "-1");
    });
    panel.setAttribute("aria-labelledby", "tab-" + o.id);
    panel.style.setProperty("--ink", ink(o.ink));
    panel.classList.remove("is-swapping"); void panel.offsetWidth; panel.classList.add("is-swapping");
    var img = $("#calImg"); img.src = o.img; img.alt = o.label + " (sample image)";
    $("#calWhen").textContent = o.when;
    $("#calName").textContent = o.label;
    var ul = $("#calIdeas"); ul.textContent = "";
    o.ideas.forEach(function (idea) {
      var a = el("a", { href: "#quote", html: "<span></span>" + ARROW });
      a.firstChild.textContent = idea;
      a.setAttribute("aria-label", "Ask about " + idea + " for " + o.label);
      a.addEventListener("click", function () { prefillQuote("Promotional & Corporate Gifts", idea + " for " + o.label); });
      ul.appendChild(el("li", null, [a]));
    });
  }
  showOccasion(0);

  /* ---------- Job ticket steps ---------- */
  var stepList = $("#stepList");
  D.steps.forEach(function (s) {
    stepList.appendChild(el("li", { class: "ticket-step" + (s.stamp ? " is-proof" : "") }, [
      el("span", { class: "tick", "aria-hidden": "true" }),
      el("div", null, [el("h3", { text: s.title }), el("p", { text: s.text })]),
      s.stamp ? el("span", { class: "stamp", "aria-hidden": "true", text: "Approved" }) : null
    ]));
  });

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
    $("#briefSend").href = waLink("Hi Majestic Print, I'd like a quote.\n\n" + rows.map(function (r) { return r[0] + ": " + r[1]; }).join("\n"));

    form.hidden = true; brief.hidden = false;
    $("#briefSend").focus();
  });
  $("#briefEdit").addEventListener("click", function () { brief.hidden = true; form.hidden = false; $("#qName").focus(); });

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

  /* ---------- Header state ---------- */
  var header = $(".site-header");
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  $$("#mobileNav a").forEach(function (a) {
    a.addEventListener("click", function () {
      var oc = window.bootstrap && window.bootstrap.Offcanvas.getInstance($("#mobileNav"));
      if (oc) oc.hide();
    });
  });

  /* ---------- Reveal on scroll (content stays visible without JS) ---------- */
  $$(".color-strip span").forEach(function (s, i) { s.style.setProperty("--n", i); });
  var targets = $$(".reveal, .ticket-step");
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
