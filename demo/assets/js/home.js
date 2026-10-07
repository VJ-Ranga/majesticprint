/* Majestic Print — homepage */
window.MP_PAGES = window.MP_PAGES || {};
window.MP_PAGES.home = function (MP) {
  "use strict";
  var D = MP.D, $ = MP.$, $$ = MP.$$, el = MP.el, ink = MP.ink, ARROW = MP.ARROW;
  var narrow = window.matchMedia("(max-width: 991px)");

  /* ---------- Print / Pack / Promote (duotone plates) ---------- */
  var routeGrid = $("#routeGrid");
  D.routes.forEach(function (r) {
    var href = r.filter ? "shop.html?route=" + r.filter : "solutions.html";
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
      el("a", { class: "text-link", href: href, html: "Explore " + r.title + ARROW })
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
  D.products.forEach(function (p) { productGrid.appendChild(MP.specCard(p, "product.html?p=" + p.slug)); });
  $$(".filter-tabs .tab").forEach(function (b) {
    b.addEventListener("click", function () {
      var route = b.getAttribute("data-filter");
      $$(".filter-tabs .tab").forEach(function (t) {
        var on = t === b; t.classList.toggle("is-active", on); t.setAttribute("aria-pressed", on ? "true" : "false");
      });
      $$(".spec-card", productGrid).forEach(function (c) { c.hidden = !(route === "all" || c.getAttribute("data-route") === route); });
    });
  });

  /* ---------- Capability index ---------- */
  initCapIndex(MP, $("#capIndex"), $("#capProof"), narrow, false);

  /* ---------- Showcase ---------- */
  var showcase = $("#showcase");
  D.showcase.forEach(function (w) {
    showcase.appendChild(el("figure", { class: "print-frame work reveal" + (w.size === "large" ? " is-large" : "") }, [
      el("div", { class: "work-img" }, [el("img", { src: w.img, alt: w.title + " (sample image)", loading: "lazy" })]),
      el("figcaption", null, [el("span", { class: "slug", text: w.service }), el("strong", { text: w.title })])
    ]));
  });

  /* ---------- Print calendar ---------- */
  var calTabs = $("#calTabs"), tabs = [];
  D.occasions.forEach(function (o, i) {
    var t = el("button", {
      type: "button", class: "cal-bar", "data-ink": o.ink, "data-span": o.span, "data-align": o.start + o.span > 12 ? "end" : "start",
      role: "tab", id: "tab-" + o.id, "aria-controls": "calPanel", "aria-selected": "false", tabindex: "-1",
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
    tabs.forEach(function (t, j) { t.setAttribute("aria-selected", i === j ? "true" : "false"); t.setAttribute("tabindex", i === j ? "0" : "-1"); });
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
      a.addEventListener("click", function () { MP.prefillQuote("Promotional & Corporate Gifts", idea + " for " + o.label); });
      ul.appendChild(el("li", null, [a]));
    });
  }
  showOccasion(0);

  /* ---------- Job ticket ---------- */
  buildTicket(MP, $("#stepList"));

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
  $$(".color-strip span").forEach(function (s, i) { s.style.setProperty("--n", i); });
};

/* ---------- Shared with inner pages ---------- */

// Capability index: hover/click a process to see it as a proof. linkToPage = rows open the service page.
function initCapIndex(MP, capIndex, capProof, narrow, linkToPage) {
  var D = MP.D, $ = MP.$, el = MP.el, ink = MP.ink;
  var capLayout = capIndex.parentNode, rows = [], current = -1;
  D.services.forEach(function (s, i) {
    var btn = el("button", { type: "button", class: "cap-row", "aria-expanded": "false", "aria-controls": capProof.id, style: "--ink:" + ink(s.ink) }, [
      el("span", { class: "cap-chip", "aria-hidden": "true" }),
      el("span", { class: "cap-name", text: s.name }),
      el("span", { class: "cap-out", text: s.outputs.split(" · ").slice(0, 3).join(" · ") }),
      el("i", { class: "fa-solid fa-arrow-right cap-arrow", "aria-hidden": "true" })
    ]);
    btn.addEventListener("click", function () { select(i, true); });
    btn.addEventListener("mouseenter", function () { if (!narrow.matches) select(i, false); });
    btn.addEventListener("focus", function () { if (!narrow.matches) select(i, false); });
    var li = el("li", null, [btn]);
    rows.push({ li: li, btn: btn });
    capIndex.appendChild(li);
  });
  capIndex.addEventListener("pointerenter", function () { D.services.forEach(function (s) { var im = new Image(); im.src = s.img; }); }, { once: true });

  function select(i, fromClick) {
    var s = D.services[i];
    rows.forEach(function (r, j) { r.btn.classList.toggle("is-active", i === j); r.btn.setAttribute("aria-expanded", i === j ? "true" : "false"); });
    if (narrow.matches) rows[i].li.appendChild(capProof);
    else if (capProof.parentNode !== capLayout) capLayout.appendChild(capProof);
    if (i !== current) {
      var img = $("img", capProof);
      capProof.classList.remove("is-swapping"); void capProof.offsetWidth; capProof.classList.add("is-swapping");
      img.src = s.img; img.alt = s.name + " (sample image)";
      capProof.style.setProperty("--ink", ink(s.ink));
      $(".cp-slug", capProof).textContent = s.name + "  ·  " + D.inks[s.ink].name + " plate  ·  sample image";
      $(".cp-name", capProof).textContent = s.name;
      $(".cp-text", capProof).textContent = s.text;
      $(".cp-outputs", capProof).textContent = s.outputs;
      var cta = $(".cp-cta", capProof);
      if (linkToPage) {
        cta.textContent = "See " + s.name;
        cta.href = "service.html?s=" + s.slug;
      } else {
        cta.textContent = "Plan your " + s.name + " project";
        cta.onclick = function () { MP.prefillQuote(s.name); };
      }
      var more = $(".cp-more", capProof);
      if (more) more.href = "service.html?s=" + s.slug;
      current = i;
    }
    if (fromClick && narrow.matches) requestAnimationFrame(function () { rows[i].btn.scrollIntoView({ behavior: "smooth", block: "start" }); });
  }
  select(0, false);
  narrow.addEventListener("change", function () { var i = current; current = -1; select(i, false); });
}

// Job ticket steps with tick boxes and the APPROVED stamp
function buildTicket(MP, list) {
  MP.D.steps.forEach(function (s) {
    list.appendChild(MP.el("li", { class: "ticket-step" + (s.stamp ? " is-proof" : "") }, [
      MP.el("span", { class: "tick", "aria-hidden": "true" }),
      MP.el("div", null, [MP.el("h3", { text: s.title }), MP.el("p", { text: s.text })]),
      s.stamp ? MP.el("span", { class: "stamp", "aria-hidden": "true", text: "Approved" }) : null
    ]));
  });
}
