/* Majestic Print — homepage */
window.MP_PAGES = window.MP_PAGES || {};
window.MP_PAGES.home = function (MP) {
  "use strict";
  var D = MP.D, $ = MP.$, $$ = MP.$$, el = MP.el, ink = MP.ink, ARROW = MP.ARROW;
  var narrow = window.matchMedia("(max-width: 991px)");

  /* ---------- Hero slider: every slide is a new plate run ---------- */
  (function () {
    var hero = $(".hero"), textWrap = $("#slidesText"), mediaWrap = $("#slidesMedia"), bar = $("#pressBar");
    if (!hero || !textWrap) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    var slides = [{ kicker: "Print. Pack. Promote.", ink: "magenta" }].concat(D.heroSlides || []);
    var total = slides.length, current = 0, paused = false;
    $("#sheetTotal").textContent = String(total).padStart(2, "0");

    // Build slides 2..n from data (text only, no HTML injection)
    D.heroSlides.forEach(function (sl, k) {
      var n = k + 2, inkHex = ink(sl.ink);
      var plates = el("span", { class: "plates", "aria-hidden": "true" });
      var kPlate = el("span", { class: "plate plate-k" });
      sl.lines.forEach(function (line, li) {
        var isLast = li === sl.lines.length - 1 && /\.$/.test(line);
        kPlate.appendChild(document.createTextNode(isLast ? line.slice(0, -1) : line));
        if (isLast) kPlate.appendChild(el("i", { class: "dot", style: "color:" + inkHex, text: "." }));
        if (li < sl.lines.length - 1) kPlate.appendChild(el("br"));
      });
      plates.appendChild(kPlate);
      ["c", "m", "y"].forEach(function (c) {
        var pl = el("span", { class: "plate plate-" + c });
        sl.lines.forEach(function (line, li) { pl.appendChild(document.createTextNode(line)); if (li < sl.lines.length - 1) pl.appendChild(el("br")); });
        plates.appendChild(pl);
      });
      textWrap.appendChild(el("div", { class: "slide-text", role: "group", "aria-roledescription": "slide", "aria-label": n + " of " + total, style: "--ink:" + inkHex }, [
        el("p", { class: "eyebrow" }, [
          el("span", { class: "eb-no", text: String(n).padStart(2, "0") }),
          el("span", { class: "eb-text", text: sl.kicker }),
          el("span", { class: "eb-rule", "aria-hidden": "true" })
        ]),
        el("h2", { class: "register slide-title" }, [el("span", { class: "visually-hidden", text: sl.lines.join(" ") }), plates]),
        el("p", { class: "lead-text", text: sl.lead }),
        el("div", { class: "hero-actions" }, [
          el("a", { class: "btn-mp btn-mp-primary", href: sl.cta[1], text: sl.cta[0] }),
          el("a", { class: "btn-mp btn-mp-outline", href: sl.cta2[1], text: sl.cta2[0] })
        ])
      ]));
      mediaWrap.appendChild(el("figure", { class: "hero-media print-frame" }, [
        el("img", { src: sl.img, alt: sl.alt, width: "1200", height: "1500", loading: "lazy" }),
        el("figcaption", { class: "slug", text: sl.caption })
      ]));
    });

    var texts = $$(".slide-text", textWrap), medias = $$(".hero-media", mediaWrap);
    var labels = ["Brand", "Pack", "Promote", "Season"];
    var tabs = slides.map(function (sl, i) {
      var t = el("button", { type: "button", class: "press-tab", role: "tab", "aria-selected": i === 0 ? "true" : "false",
        "aria-label": "Slide " + (i + 1) + ": " + (sl.lines ? sl.lines.join(" ") : "Print. Pack. Promote."), tabindex: i === 0 ? "0" : "-1",
        style: "--ink:" + ink(sl.ink) }, [
        el("span", { class: "press-patch", "aria-hidden": "true" }, [el("span", { class: "press-fill" })]),
        el("span", { class: "slug", "aria-hidden": "true", text: String(i + 1).padStart(2, "0") + " " + (labels[i] || "") })
      ]);
      t.addEventListener("click", function () { go(i); });
      t.addEventListener("keydown", function (e) {
        var n = e.key === "ArrowRight" ? (i + 1) % total : e.key === "ArrowLeft" ? (i - 1 + total) % total : null;
        if (n !== null) { e.preventDefault(); go(n); tabs[n].focus(); }
      });
      bar.appendChild(t);
      return t;
    });

    function go(i) {
      if (i === current) return;
      [texts, medias].forEach(function (list) {
        list.forEach(function (node, j) {
          node.classList.remove("is-active");
          if (j === i) { void node.offsetWidth; node.classList.add("is-active"); }
          if (j !== i) node.setAttribute("inert", ""); else node.removeAttribute("inert");
        });
      });
      tabs.forEach(function (t, j) {
        t.setAttribute("aria-selected", j === i ? "true" : "false");
        t.setAttribute("tabindex", j === i ? "0" : "-1");
        t.classList.toggle("is-done", j < i);
      });
      // restart the progress fill on the new patch
      var fill = $(".press-fill", tabs[i]); fill.style.animation = "none"; void fill.offsetWidth; fill.style.animation = "";
      $("#sheetNo").textContent = String(i + 1).padStart(2, "0");
      markPlate(slides[i].ink);
      current = i;
    }
    // Density readout: the slide's own ink plate is highlighted; readings drift like a live press check
    var plateOf = { bright: "c", magenta: "m", gold: "y", orange: "y", deep: "k" };
    var base = { c: 1.42, m: 1.38, y: 1.04, k: 1.76 };
    function markPlate(inkKey) {
      $$(".dens").forEach(function (d) { d.classList.toggle("is-hot", d.getAttribute("data-plate") === plateOf[inkKey]); });
    }
    markPlate(slides[0].ink);
    if (!reduce.matches) setInterval(function () {
      if (document.hidden) return;
      $$(".dens").forEach(function (d) {
        var p = d.getAttribute("data-plate"), v = base[p] + (Math.random() - 0.5) * 0.04;
        d.querySelector("em").textContent = v.toFixed(2);
      });
    }, 1800);

    texts.forEach(function (t, j) { if (j) t.setAttribute("inert", ""); });
    medias.forEach(function (m, j) { if (j) m.setAttribute("inert", ""); });

    // Autoplay is driven by the patch fill animation; pausing the animation pauses the slideshow
    bar.addEventListener("animationend", function (e) {
      if (e.target.classList.contains("press-fill") && !paused && !reduce.matches) go((current + 1) % total);
    });
    $("#heroNext").addEventListener("click", function () { go((current + 1) % total); });
    $("#heroPrev").addEventListener("click", function () { go((current - 1 + total) % total); });
    var pauseBtn = $("#heroPause");
    function setPaused(p) {
      paused = p; hero.classList.toggle("is-paused", p);
      pauseBtn.setAttribute("aria-label", p ? "Play slideshow" : "Pause slideshow");
      pauseBtn.innerHTML = p ? '<i class="fa-solid fa-play" aria-hidden="true"></i>' : '<i class="fa-solid fa-pause" aria-hidden="true"></i>';
    }
    pauseBtn.addEventListener("click", function () { setPaused(!paused); });
    if (reduce.matches) setPaused(true);

    // Swipe
    var x0 = null;
    hero.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") x0 = e.clientX; });
    hero.addEventListener("pointerup", function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) go(dx < 0 ? (current + 1) % total : (current - 1 + total) % total);
    });
  })();

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

  /* ---------- Workshop clock (Sri Lanka time) ---------- */
  var clock = $("#workshopTime");
  if (clock) {
    var tick = function () {
      clock.textContent = new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Colombo", hour: "2-digit", minute: "2-digit" });
    };
    tick(); setInterval(tick, 20000);
  }

  /* ---------- Printer's loupe over the hero photo (pointer devices only) ---------- */
  (function () {
    var wrap = $("#heroMediaWrap"), loupe = $("#loupe");
    if (!wrap || !loupe || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    var ZOOM = 2.6;
    wrap.addEventListener("pointermove", function (e) {
      var img = $(".hero-media.is-active img", wrap);
      if (!img) return;
      var r = img.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) { wrap.classList.remove("is-inspecting"); return; }
      wrap.classList.add("is-inspecting");
      var wr = wrap.getBoundingClientRect();
      loupe.style.left = (e.clientX - wr.left) + "px";
      loupe.style.top = (e.clientY - wr.top) + "px";
      loupe.style.backgroundImage = "radial-gradient(circle, rgba(13,36,64,.22) 1px, transparent 1.4px), url('" + img.currentSrc.replace(/'/g, "%27") + "')";
      // match object-fit: cover so the loupe shows exactly what is under the pointer
      var sc = Math.max(r.width / img.naturalWidth, r.height / img.naturalHeight);
      var dw = img.naturalWidth * sc, dh = img.naturalHeight * sc, ox = (r.width - dw) / 2, oy = (r.height - dh) / 2;
      loupe.style.backgroundSize = "5px 5px, " + (dw * ZOOM) + "px " + (dh * ZOOM) + "px";
      loupe.style.backgroundPosition = "0 0, " + (75 - (x - ox) * ZOOM) + "px " + (75 - (y - oy) * ZOOM) + "px";
    });
    wrap.addEventListener("pointerleave", function () { wrap.classList.remove("is-inspecting"); });
  })();

  /* ---------- Capability icons in "Why Majestic" ---------- */
  $$("[data-icon]").forEach(function (n) { n.innerHTML = (window.MP_ICONS || {})[n.getAttribute("data-icon")] || ""; });

  /* ---------- Job ticket + press run ---------- */
  buildTicket(MP, $("#stepList"));
  var run = $("#pressRun");
  if (run) mountPressRun(run);

  $$(".color-strip span").forEach(function (s, i) { s.style.setProperty("--n", i); });
};

/* ---------- Shared with inner pages ---------- */

// Capability index: hover/click a process to see it as a proof. linkToPage = rows open the service page.
function initCapIndex(MP, capIndex, capProof, narrow, linkToPage) {
  var D = MP.D, $ = MP.$, el = MP.el, ink = MP.ink;
  var capLayout = capIndex.parentNode, rows = [], current = -1;
  D.services.forEach(function (s, i) {
    var btn = el("button", { type: "button", class: "cap-row", "aria-expanded": "false", "aria-controls": capProof.id, style: "--ink:" + ink(s.ink) }, [
      el("span", { class: "cap-icon", "aria-hidden": "true", html: (window.MP_ICONS || {})[s.name] || "" }),
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
      var cpi = $(".cp-icon", capProof); if (cpi) cpi.innerHTML = (window.MP_ICONS || {})[s.name] || "";
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

// A four-unit CMYK press: sheets feed in, pick up each plate colour, and land on the delivery stack.
// Brand inks stand in for the process colours: C = Bright Blue, M = Magenta, Y = Gold, K = Deep Blue.
function mountPressRun(host) {
  var units = [["C", "#007CAC", "Bright Blue"], ["M", "#D01C60", "Magenta"], ["Y", "#EAA123", "Gold"], ["K", "#0A2A4A", "Deep Blue"]];
  var svg = '<svg viewBox="0 0 1200 230" class="press-svg" role="img" aria-labelledby="pressTitle"><title id="pressTitle">A sheet running through four print units — cyan, magenta, yellow and key — before landing on the delivery stack</title>';
  // feeder stack
  svg += '<g class="pr-stack">';
  for (var f = 0; f < 6; f++) svg += '<rect x="22" y="' + (126 + f * 7) + '" width="120" height="5" fill="#fff" opacity="' + (0.9 - f * 0.1) + '"/>';
  svg += '<text x="82" y="196" class="pr-label" text-anchor="middle">FEEDER</text></g>';
  // paper path
  svg += '<path d="M150 118H1040" class="pr-path"/>';
  units.forEach(function (u, i) {
    var cx = 280 + i * 200;
    svg += '<g class="pr-unit" style="--u:' + u[1] + '">' +
      '<rect x="' + (cx - 70) + '" y="18" width="140" height="190" class="pr-frame"/>' +
      '<rect x="' + (cx - 46) + '" y="26" width="92" height="12" fill="' + u[1] + '" class="pr-fountain"/>' +
      '<g class="pr-roll"><circle cx="' + cx + '" cy="78" r="34" class="pr-cyl" stroke="' + u[1] + '"/><path d="M' + cx + ' 44v68M' + (cx - 34) + ' 78h68" class="pr-spoke"/></g>' +
      '<g class="pr-roll pr-roll-rev"><circle cx="' + cx + '" cy="158" r="34" class="pr-cyl"/><path d="M' + cx + ' 124v68M' + (cx - 34) + ' 158h68" class="pr-spoke"/></g>' +
      '<text x="' + cx + '" y="226" class="pr-label" text-anchor="middle">' + u[0] + ' · ' + u[2].toUpperCase() + '</text></g>';
  });
  // delivery stack
  svg += '<g class="pr-stack"><rect x="1058" y="160" width="120" height="5" fill="#fff"/><rect x="1058" y="167" width="120" height="5" fill="#fff" opacity=".8"/>' +
    '<rect x="1058" y="160" width="120" height="5" fill="url(#prPrinted)"/><text x="1118" y="196" class="pr-label" text-anchor="middle">DELIVERY</text></g>';
  svg += '<defs><linearGradient id="prPrinted"><stop offset="0" stop-color="#007CAC"/><stop offset=".33" stop-color="#D01C60"/><stop offset=".66" stop-color="#EAA123"/><stop offset="1" stop-color="#0A2A4A"/></linearGradient></defs>';
  // three sheets in flight
  for (var s = 0; s < 3; s++) {
    svg += '<g class="pr-sheet" style="animation-delay:' + (-s * 2.6) + 's"><rect x="0" y="113" width="120" height="10" fill="#fff"/>';
    units.forEach(function (u, i) {
      svg += '<rect x="' + (8 + i * 27) + '" y="115" width="24" height="6" fill="' + u[1] + '" class="pr-band pr-band-' + i + '" style="animation-delay:' + (-s * 2.6) + 's"/>';
    });
    svg += "</g>";
  }
  svg += "</svg>";
  host.innerHTML = svg;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (en) { en.forEach(function (e) { host.classList.toggle("is-running", e.isIntersecting); }); }, { threshold: 0.2 }).observe(host);
  } else host.classList.add("is-running");
}
