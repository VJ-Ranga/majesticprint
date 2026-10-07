/* Majestic Print — inner pages. Each function builds one page from assets/data.js. */
window.MP_PAGES = window.MP_PAGES || {};

(function () {
  "use strict";
  var P = window.MP_PAGES;

  // Catalogue item → spec-sheet summary (first three option groups + minimum quantity)
  function specsFor(p) {
    var specs = {};
    Object.keys(p.options).slice(0, 3).forEach(function (k) { specs[k] = p.options[k].slice(0, 2).join(" · ") + (p.options[k].length > 2 ? " +" : ""); });
    specs.From = p.quantities[0] + (p.quantities[0] === 1 ? " piece" : " pieces");
    return { slug: p.slug, name: p.name, img: p.img, route: p.route, specs: specs };
  }
  function cta(MP, title, text, href, label) {
    return MP.el("section", { class: "cta-band" }, [
      MP.el("div", { class: "container-xl cta-band-row" }, [
        MP.el("div", null, [MP.el("h2", { text: title }), MP.el("p", { class: "lead-text", text: text })]),
        MP.el("a", { class: "btn-mp btn-mp-light", href: href, html: label + MP.ARROW })
      ])
    ]);
  }
  function mount(MP, node) { MP.$("#pageBody").appendChild(node); }

  /* =================================================================== SHOP */
  P.shop = function (MP) {
    var D = MP.D, el = MP.el, $ = MP.$, $$ = MP.$$;
    MP.pageHead({ kicker: "Shop", title: "Shop", crumbs: [["Shop"]], ink: MP.ink("bright"),
      lead: "Business print, packaging and promotional products. Choose your options, add them to a quote list, and send it in one go." });

    var state = { route: MP.param("route") || "all", occasion: MP.param("occasion") || "", q: "" };
    var routeTabs = el("div", { class: "filter-tabs", role: "group", "aria-label": "Product type" },
      ["all", "Print", "Pack", "Promote"].map(function (r) {
        var b = el("button", { type: "button", class: "tab", "data-route": r, "aria-pressed": "false", text: r === "all" ? "All" : r });
        b.addEventListener("click", function () { state.route = r; render(); });
        return b;
      }));
    var occ = el("div", { class: "occ-filters", role: "group", "aria-label": "Occasion" },
      [{ id: "", label: "Any occasion" }].concat(D.occasions).map(function (o) {
        var b = el("button", { type: "button", class: "occ-chip", "data-occ": o.id, "aria-pressed": "false", text: o.label });
        if (o.ink) b.style.setProperty("--ink", MP.ink(o.ink));
        b.addEventListener("click", function () { state.occasion = o.id; render(); });
        return b;
      }));
    var search = el("input", { type: "search", class: "form-control", id: "shopSearch", placeholder: "Search products", "aria-label": "Search products" });
    search.addEventListener("input", function () { state.q = search.value.trim().toLowerCase(); render(); });
    var count = el("p", { class: "slug result-count", "aria-live": "polite" });
    var grid = el("div", { class: "spec-grid" });
    var empty = el("div", { class: "empty-sheet", hidden: "" }, [
      el("p", { class: "slug", text: "No match" }),
      el("h3", { text: "Nothing on this sheet yet." }),
      el("p", { text: "Try another filter — or describe what you need and we'll quote it." }),
      el("a", { class: "btn-mp btn-mp-primary", href: "contact.html#quote", text: "Plan a custom project" })
    ]);

    D.catalogue.forEach(function (p) {
      var card = MP.specCard(specsFor(p), "product.html?p=" + p.slug);
      card.setAttribute("data-occ", p.occasions.join(" "));
      card.setAttribute("data-name", (p.name + " " + p.service + " " + p.blurb).toLowerCase());
      grid.appendChild(card);
    });

    mount(MP, el("section", { class: "section section-tight" }, [
      el("div", { class: "container-xl" }, [
        el("div", { class: "shop-bar" }, [routeTabs, el("div", { class: "shop-search" }, [el("i", { class: "fa-solid fa-magnifying-glass", "aria-hidden": "true" }), search])]),
        occ,
        count,
        grid,
        empty
      ])
    ]));
    mount(MP, cta(MP, "Can't see it here?", "Most of what we print is made to order. Tell us what you need and we'll put a quote together.", "contact.html#quote", "Plan a custom project"));

    function render() {
      $$("[data-route]", routeTabs).forEach(function (b) { var on = b.getAttribute("data-route") === state.route; b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", on); });
      $$("[data-occ]", occ).forEach(function (b) { var on = b.getAttribute("data-occ") === state.occasion; b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", on); });
      var n = 0;
      $$(".spec-card", grid).forEach(function (c) {
        var show = (state.route === "all" || c.getAttribute("data-route") === state.route) &&
          (!state.occasion || (" " + c.getAttribute("data-occ") + " ").indexOf(" " + state.occasion + " ") !== -1) &&
          (!state.q || c.getAttribute("data-name").indexOf(state.q) !== -1);
        c.hidden = !show; if (show) { n++; c.classList.add("is-in"); }
      });
      count.textContent = n + (n === 1 ? " product" : " products") + "  ·  sheet 01";
      empty.hidden = n > 0;
      var url = new URL(location.href);
      ["route", "occasion"].forEach(function (k) { if (state[k] && state[k] !== "all") url.searchParams.set(k, state[k]); else url.searchParams.delete(k); });
      history.replaceState(null, "", url);
    }
    render();
  };

  /* ================================================================ PRODUCT */
  P.product = function (MP) {
    var D = MP.D, el = MP.el, $ = MP.$, $$ = MP.$$;
    var p = D.catalogue.filter(function (x) { return x.slug === MP.param("p"); })[0] || D.catalogue[0];
    var routeInk = {}; D.routes.forEach(function (r) { routeInk[r.title] = r.ink; });
    var inkHex = MP.ink(routeInk[p.route]);
    MP.pageHead({ crumbs: [["Shop", "shop.html"], [p.name]] });
    $("#pageHead").classList.add("page-head-slim");

    /* Gallery: one sample photo, with detail crops a press operator would inspect */
    var main = el("img", { src: p.img, alt: p.name + " (sample image)", width: "1200", height: "900" });
    var views = [["Full sheet", "50% 50%", 1], ["Detail", "30% 40%", 1.9], ["Edge", "70% 65%", 2.4]];
    var thumbs = el("div", { class: "pd-thumbs", role: "group", "aria-label": "Image views" }, views.map(function (v, i) {
      var b = el("button", { type: "button", class: "pd-thumb", "aria-pressed": i === 0 ? "true" : "false", "aria-label": v[0] }, [
        el("img", { src: p.img, alt: "", style: "object-position:" + v[1] + ";transform:scale(" + v[2] + ");transform-origin:" + v[1] }),
        el("span", { class: "slug", text: v[0] })
      ]);
      b.addEventListener("click", function () {
        $$(".pd-thumb", thumbs).forEach(function (t) { t.setAttribute("aria-pressed", t === b ? "true" : "false"); });
        main.style.transformOrigin = v[1]; main.style.transform = "scale(" + v[2] + ")";
      });
      return b;
    }));
    var gallery = el("div", { class: "pd-gallery" }, [
      el("figure", { class: "print-frame pd-main" }, [el("div", { class: "pd-main-img" }, [main]), el("figcaption", { class: "slug", text: p.name + "  ·  sample image  ·  real product photography to come" })]),
      thumbs
    ]);

    /* Configurator */
    var chosen = {};
    var form = el("form", { class: "configurator", novalidate: "" });
    Object.keys(p.options).forEach(function (group, gi) {
      chosen[group] = p.options[group][0];
      var fs = el("fieldset", { class: "opt-group" }, [el("legend", { class: "slug", text: group })]);
      var row = el("div", { class: "opt-row" });
      p.options[group].forEach(function (val, vi) {
        var id = "opt-" + gi + "-" + vi;
        var input = el("input", { type: "radio", name: "g" + gi, id: id, value: val, class: "visually-hidden" });
        if (vi === 0) input.checked = true;
        input.addEventListener("change", function () { chosen[group] = val; update(); });
        row.appendChild(el("label", { class: "opt", for: id }, [input, el("span", { text: val })]));
      });
      fs.appendChild(row); form.appendChild(fs);
    });

    // Quantity
    var qty = p.quantities[0];
    var qfs = el("fieldset", { class: "opt-group" }, [el("legend", { class: "slug", text: "Quantity" })]);
    var qrow = el("div", { class: "opt-row" });
    p.quantities.forEach(function (q, qi) {
      var input = el("input", { type: "radio", name: "qty", id: "q-" + qi, value: q, class: "visually-hidden" });
      if (qi === 0) input.checked = true;
      input.addEventListener("change", function () { qty = q; custom.value = ""; update(); });
      qrow.appendChild(el("label", { class: "opt", for: "q-" + qi }, [input, el("span", { text: String(q) })]));
    });
    var custom = el("input", { type: "number", min: "1", max: "100000", inputmode: "numeric", class: "form-control opt-custom", placeholder: "Other", "aria-label": "Other quantity" });
    custom.addEventListener("input", function () {
      var v = parseInt(custom.value, 10);
      if (v > 0 && v <= 100000) { qty = v; $$("input[name=qty]", form).forEach(function (r) { r.checked = false; }); }
      update();
    });
    qrow.appendChild(custom); qfs.appendChild(qrow); form.appendChild(qfs);

    // Artwork
    var artMode = "upload", artFile = "";
    var file = el("input", { type: "file", id: "artFile", accept: ".pdf,.ai,.eps,.psd,.svg,.jpg,.jpeg,.png", class: "visually-hidden" });
    var fileInfo = el("p", { class: "file-info", "aria-live": "polite" });
    file.addEventListener("change", function () {
      var f = file.files[0]; artFile = "";
      fileInfo.className = "file-info";
      if (!f) { fileInfo.textContent = ""; update(); return; }
      var ok = /\.(pdf|ai|eps|psd|svg|jpe?g|png)$/i.test(f.name), mb = f.size / 1048576;
      if (!ok) { fileInfo.textContent = "That file type can't be printed. Use PDF, AI, EPS, PSD, SVG, JPG or PNG."; fileInfo.classList.add("is-error"); file.value = ""; }
      else if (mb > 50) { fileInfo.textContent = "That file is over 50 MB. Send it on WhatsApp or by email instead."; fileInfo.classList.add("is-error"); file.value = ""; }
      else { artFile = f.name; fileInfo.textContent = f.name + "  ·  " + mb.toFixed(1) + " MB  ·  checked for print before your proof"; fileInfo.classList.add("is-ok"); }
      update();
    });
    var artModes = [["upload", "Upload my file", "PDF, AI, PSD, JPG or PNG"], ["design", "Design it for me", "Our team prepares artwork for you to approve"], ["later", "Send it later", "Share it on WhatsApp after ordering"]];
    var afs = el("fieldset", { class: "opt-group" }, [el("legend", { class: "slug", text: "Artwork" })]);
    var arow = el("div", { class: "art-row" });
    artModes.forEach(function (m, i) {
      var input = el("input", { type: "radio", name: "art", id: "art-" + m[0], value: m[0], class: "visually-hidden" });
      if (i === 0) input.checked = true;
      input.addEventListener("change", function () { artMode = m[0]; dropzone.hidden = artMode !== "upload"; update(); });
      arow.appendChild(el("label", { class: "art-opt", for: "art-" + m[0] }, [input, el("span", null, [el("strong", { text: m[1] }), el("small", { text: m[2] })])]));
    });
    var dropzone = el("label", { class: "dropzone", for: "artFile" }, [
      el("i", { class: "fa-solid fa-file-arrow-up", "aria-hidden": "true" }),
      el("span", null, [el("strong", { text: "Choose a file" }), document.createTextNode(" or drop it here")]),
      el("small", { class: "slug", text: "Demo: the file stays on your device" })
    ]);
    ["dragover", "dragenter"].forEach(function (ev) { dropzone.addEventListener(ev, function (e) { e.preventDefault(); dropzone.classList.add("is-over"); }); });
    ["dragleave", "drop"].forEach(function (ev) { dropzone.addEventListener(ev, function () { dropzone.classList.remove("is-over"); }); });
    dropzone.addEventListener("drop", function (e) { e.preventDefault(); if (e.dataTransfer.files.length) { file.files = e.dataTransfer.files; file.dispatchEvent(new Event("change")); } });
    afs.appendChild(arow); afs.appendChild(file); afs.appendChild(dropzone); afs.appendChild(fileInfo);
    form.appendChild(afs);

    var notes = el("textarea", { class: "form-control", rows: "3", maxlength: "500", id: "pdNotes", placeholder: "Anything else — colours, wording, deadline…" });
    notes.addEventListener("input", update);
    form.appendChild(el("div", { class: "opt-group" }, [el("label", { class: "slug", for: "pdNotes", text: "Notes (optional)" }), notes]));

    /* Live job ticket */
    var tRows = el("dl", { class: "ticket-spec" });
    var stamp = el("span", { class: "stamp stamp-added", "aria-hidden": "true", text: "Added" });
    var addBtn = el("button", { type: "button", class: "btn-mp btn-mp-primary w-100", html: '<i class="fa-solid fa-clipboard-list" aria-hidden="true"></i> Add to quote list' });
    var waBtn = el("a", { class: "btn-mp btn-mp-whatsapp w-100", target: "_blank", rel: "noopener", html: '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Order on WhatsApp' });
    var status = el("p", { class: "ticket-status", "aria-live": "polite" });
    var ticket = el("aside", { class: "ticket pd-ticket", "aria-label": "Your order summary" }, [
      el("div", { class: "ticket-head" }, [el("span", { class: "ticket-title", text: "Job ticket" }), el("span", { class: "slug", text: p.service })]),
      tRows,
      el("div", { class: "ticket-price" }, [el("span", { class: "slug", text: "Price" }), el("strong", { text: "Confirmed with your proof" })]),
      el("div", { class: "ticket-actions" }, [addBtn, waBtn]),
      status,
      stamp
    ]);
    function item() {
      return { slug: p.slug, name: p.name, options: JSON.parse(JSON.stringify(chosen)), qty: qty,
        artwork: artMode === "upload" ? (artFile || "file to follow") : artMode === "design" ? "design requested" : "to follow on WhatsApp",
        notes: notes.value.trim() };
    }
    function update() {
      tRows.textContent = "";
      var rows = Object.keys(chosen).map(function (k) { return [k, chosen[k]]; });
      rows.push(["Quantity", String(qty)]);
      rows.push(["Artwork", item().artwork]);
      rows.forEach(function (r) { tRows.appendChild(el("dt", { text: r[0] })); tRows.appendChild(el("dd", { text: r[1] })); });
      waBtn.href = MP.waLink("Hi Majestic Print, I'd like to order:\n\n" + MP.quote.describe(item()));
    }
    addBtn.addEventListener("click", function () {
      MP.quote.add(item());
      ticket.classList.remove("is-added"); void ticket.offsetWidth; ticket.classList.add("is-added");
      status.textContent = "";
      status.appendChild(document.createTextNode("Added. "));
      status.appendChild(el("a", { href: "contact.html#quote", text: "View quote list (" + MP.quote.list().length + ")" }));
    });
    update();

    var plate = el("p", { class: "pd-plate", style: "--ink:" + inkHex }, [el("span", { text: p.route }), document.createTextNode("  ·  " + p.service)]);
    var title = el("h1", { class: "pd-title" }, [document.createTextNode(p.name), el("span", { class: "dot", style: "color:" + inkHex, text: "." })]);
    document.title = p.name + " — Majestic Print Solutions";

    mount(MP, el("section", { class: "section section-tight pd" }, [
      el("div", { class: "container-xl pd-grid" }, [
        gallery,
        el("div", { class: "pd-info" }, [plate, title, el("p", { class: "lead-text", text: p.blurb }), form, ticket])
      ])
    ]));

    /* Artwork checklist + related */
    var svc = MP.serviceByName(p.service);
    var checklist = el("ul", { class: "art-checklist" }, D.artwork.slice(0, 4).map(function (a) {
      return el("li", null, [el("span", { class: "art-val", text: a.value }), el("span", null, [el("strong", { text: a.term }), el("span", { text: a.text })])]);
    }));
    var related = el("div", { class: "spec-grid" });
    D.catalogue.filter(function (x) { return x.route === p.route && x.slug !== p.slug; }).slice(0, 3).forEach(function (x) {
      related.appendChild(MP.specCard(specsFor(x), "product.html?p=" + x.slug));
    });
    mount(MP, el("section", { class: "section section-tint" }, [
      el("div", { class: "container-xl" }, [
        el("div", { class: "pd-help" }, [
          el("div", null, [
            el("p", { class: "kicker", text: "Before you upload" }),
            el("h2", { text: "Print-ready in four checks" }),
            checklist,
            el("a", { class: "text-link", href: "how-to-order.html#artwork", html: "Full artwork guide" + MP.ARROW })
          ]),
          svc ? el("a", { class: "made-with", href: "service.html?s=" + svc.slug, style: "--ink:" + MP.ink(svc.ink) }, [
            el("figure", { class: "print-frame" }, [el("div", { class: "made-with-img" }, [el("img", { src: svc.img, alt: "", loading: "lazy" })])]),
            el("p", { class: "slug", text: "Made with" }),
            el("strong", { text: svc.name }),
            el("span", { class: "text-link", html: "About this process" + MP.ARROW })
          ]) : null
        ])
      ])
    ]));
    mount(MP, el("section", { class: "section" }, [
      el("div", { class: "container-xl" }, [
        el("div", { class: "section-head" }, [el("p", { class: "kicker", text: "Also in " + p.route }), el("h2", { text: "You might also need" })]),
        related
      ])
    ]));
  };

  /* ============================================================== SOLUTIONS */
  P.solutions = function (MP) {
    var el = MP.el;
    MP.pageHead({ kicker: "Solutions", title: "Twelve ways to make it", crumbs: [["Solutions"]], ink: MP.ink("magenta"),
      lead: "Every process under one roof — so one team can take a job from paper to packaging to the sign above your door." });
    var index = el("ol", { class: "cap-index", id: "capIndexS" });
    var proof = el("aside", { class: "cap-proof", id: "capProofS", "aria-live": "polite" }, [
      el("figure", { class: "print-frame cap-photo" }, [el("img", { src: "", alt: "", width: "1600", height: "1067" }), el("figcaption", { class: "slug cp-slug" })]),
      el("div", { class: "cap-copy" }, [
        el("span", { class: "cp-icon", "aria-hidden": "true" }),
        el("h3", { class: "cp-name" }), el("p", { class: "cp-text" }), el("p", { class: "cap-outputs cp-outputs" }),
        el("div", { class: "cap-actions" }, [el("a", { class: "btn-mp btn-mp-primary cp-cta", href: "#" })])
      ])
    ]);
    MP.$("#pageBody").appendChild(el("section", { class: "section section-tight" }, [
      el("div", { class: "container-xl" }, [el("div", { class: "cap-layout" }, [index, proof])])
    ]));
    initCapIndex(MP, index, proof, window.matchMedia("(max-width: 991px)"), true);

    // Print / Pack / Promote map
    var groups = [
      ["Print", "bright", ["Offset Printing", "Digital Offset Printing", "Digital Printing", "UV Printing"]],
      ["Pack", "gold", ["Packaging & Branding", "Digital Printing", "Offset Printing"]],
      ["Promote", "magenta", ["Large Format Printing", "Signage & 3D Signage", "Vehicle Branding", "CNC Cutting & Engraving", "Laser Cutting & Engraving", "Sublimation Printing", "Promotional & Corporate Gifts"]]
    ];
    MP.$("#pageBody").appendChild(el("section", { class: "section section-tint" }, [
      el("div", { class: "container-xl" }, [
        el("div", { class: "section-head" }, [el("p", { class: "kicker", text: "By purpose" }), el("h2", { text: "Which processes make what" })]),
        el("div", { class: "plate-map" }, groups.map(function (g) {
          return el("div", { class: "plate-col reveal", style: "--ink:" + MP.ink(g[1]) }, [
            el("h3", null, [document.createTextNode(g[0]), el("span", { text: "." })]),
            el("ul", null, g[2].map(function (n) {
              var s = MP.serviceByName(n);
              return el("li", null, [el("a", { href: "service.html?s=" + s.slug, style: "--ink:" + MP.ink(s.ink), html: '<span class="pm-icon" aria-hidden="true">' + ((window.MP_ICONS || {})[n] || "") + "</span><span></span>" + MP.ARROW })]);
            }))
          ]);
        }))
      ])
    ]));
    // fill link text safely
    MP.$$(".plate-col").forEach(function (col, gi) {
      MP.$$("a", col).forEach(function (a, i) { a.children[1].textContent = groups[gi][2][i]; });
    });
    MP.$("#pageBody").appendChild(cta(MP, "Not sure which process you need?", "Describe the result you want. We'll recommend the process, material and finish.", "contact.html#quote", "Help me choose"));
  };

  /* ================================================================ SERVICE */
  P.service = function (MP) {
    var D = MP.D, el = MP.el;
    var i = 0;
    D.services.forEach(function (s, j) { if (s.slug === MP.param("s")) i = j; });
    var s = D.services[i], det = D.serviceDetail[s.name] || { materials: [], weNeed: [] }, inkHex = MP.ink(s.ink);
    MP.pageHead({ kicker: D.inks[s.ink].name + " plate", title: s.name, crumbs: [["Solutions", "solutions.html"], [s.name]], ink: inkHex, lead: s.text, icon: (window.MP_ICONS || {})[s.name] });

    var outputs = s.outputs.split(" · ").map(function (o) { return o.charAt(0).toUpperCase() + o.slice(1); });
    var need = el("ul", { class: "need-list" }, det.weNeed.map(function (n) { return el("li", null, [el("span", { class: "tick", "aria-hidden": "true" }), el("span", { text: n })]); }));
    var body = MP.$("#pageBody");
    body.appendChild(el("section", { class: "section section-tight" }, [
      el("div", { class: "container-xl" }, [
        el("figure", { class: "print-frame svc-hero reveal" }, [
          el("div", { class: "svc-hero-img" }, [el("img", { src: s.img, alt: s.name + " (sample image)", width: "1600", height: "1067" })]),
          el("figcaption", { class: "slug", text: s.name + "  ·  " + D.inks[s.ink].name + " plate  ·  sample image — Majestic workshop photography to come" })
        ]),
        el("div", { class: "svc-grid", style: "--ink:" + inkHex }, [
          el("div", { class: "reveal" }, [
            el("p", { class: "kicker", text: "What we make" }),
            el("ul", { class: "make-list" }, outputs.map(function (o) { return el("li", null, [el("span", { class: "cap-chip", "aria-hidden": "true" }), el("span", { text: o })]); }))
          ]),
          el("div", { class: "reveal" }, [
            el("p", { class: "kicker", text: "Materials" }),
            el("dl", { class: "spec" }, [].concat.apply([], det.materials.map(function (m, k) { return [el("dt", { text: String(k + 1).padStart(2, "0") }), el("dd", { text: m })]; }))),
            el("p", { class: "fine-print", text: "Typical materials. Ask about anything not listed." })
          ]),
          el("div", { class: "ticket svc-ticket reveal" }, [
            el("div", { class: "ticket-head" }, [el("span", { class: "ticket-title", text: "To quote" }), el("span", { class: "slug", text: "we need" })]),
            need,
            el("a", { class: "btn-mp btn-mp-primary w-100", href: "contact.html?service=" + encodeURIComponent(s.name) + "#quote", text: "Plan your " + s.name + " project" })
          ])
        ])
      ])
    ]));

    var related = D.catalogue.filter(function (p) { return p.service === s.name; });
    if (related.length) {
      var grid = el("div", { class: "spec-grid" });
      related.forEach(function (p) { grid.appendChild(MP.specCard(specsFor(p), "product.html?p=" + p.slug)); });
      body.appendChild(el("section", { class: "section section-tint" }, [el("div", { class: "container-xl" }, [
        el("div", { class: "section-head" }, [el("p", { class: "kicker", text: "Order online" }), el("h2", { text: "Products made this way" })]), grid
      ])]));
    }

    // Next / previous process, like turning the page of a swatch book
    var prev = D.services[(i - 1 + D.services.length) % D.services.length], next = D.services[(i + 1) % D.services.length];
    var pager = function (x, dir) {
      return el("a", { class: "pager pager-" + dir, href: "service.html?s=" + x.slug, style: "--ink:" + MP.ink(x.ink) }, [
        el("span", { class: "slug", text: dir === "prev" ? "Previous process" : "Next process" }),
        el("strong", { text: x.name }),
        el("i", { class: "fa-solid fa-arrow-" + (dir === "prev" ? "left" : "right"), "aria-hidden": "true" })
      ]);
    };
    body.appendChild(el("nav", { class: "pagers", "aria-label": "Other processes" }, [el("div", { class: "container-xl pagers-row" }, [pager(prev, "prev"), pager(next, "next")])]));
  };

  /* =================================================================== WORK */
  P.work = function (MP) {
    var D = MP.D, el = MP.el, $$ = MP.$$;
    MP.pageHead({ kicker: "Our work", title: "Made to be noticed", crumbs: [["Our work"]], ink: MP.ink("gold"),
      lead: "Signs, vehicles, packaging and gifts from the workshop floor. Sample images shown until customer-approved projects are added." });
    var used = []; D.work.forEach(function (w) { if (used.indexOf(w.service) === -1) used.push(w.service); });
    var tabs = el("div", { class: "filter-tabs", role: "group", "aria-label": "Filter by process" }, ["All"].concat(used).map(function (n) {
      var b = el("button", { type: "button", class: "tab" + (n === "All" ? " is-active" : ""), "aria-pressed": n === "All" ? "true" : "false", text: n });
      b.addEventListener("click", function () {
        $$(".tab", tabs).forEach(function (t) { t.classList.toggle("is-active", t === b); t.setAttribute("aria-pressed", t === b); });
        $$(".work", grid).forEach(function (w) { w.hidden = !(n === "All" || w.getAttribute("data-svc") === n); });
      });
      return b;
    }));
    var dialog = el("dialog", { class: "lightbox", "aria-label": "Project image" }, [
      el("button", { type: "button", class: "lightbox-close", "aria-label": "Close", html: '<i class="fa-solid fa-xmark" aria-hidden="true"></i>' }),
      el("figure", { class: "print-frame" }, [el("img", { src: "", alt: "" }), el("figcaption", { class: "slug" })])
    ]);
    dialog.querySelector(".lightbox-close").addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
    var grid = el("div", { class: "work-grid" });
    D.work.forEach(function (w, k) {
      var btn = el("button", { type: "button", class: "work-open print-frame", "aria-label": "Enlarge " + w.title }, [el("div", { class: "work-img" }, [el("img", { src: w.img, alt: w.title + " (sample image)", loading: "lazy" })])]);
      btn.addEventListener("click", function () {
        dialog.querySelector("img").src = w.img; dialog.querySelector("img").alt = w.title;
        dialog.querySelector("figcaption").textContent = w.title + "  ·  " + w.service + "  ·  sample image";
        dialog.showModal();
      });
      var svc = MP.serviceByName(w.service);
      grid.appendChild(el("figure", { class: "work reveal" + (k % 4 === 0 ? " is-tall" : ""), "data-svc": w.service }, [
        btn,
        el("figcaption", null, [el("strong", { text: w.title }), el("a", { class: "slug", href: "service.html?s=" + svc.slug, text: w.service })])
      ]));
    });
    MP.$("#pageBody").appendChild(el("section", { class: "section section-tight" }, [el("div", { class: "container-xl" }, [tabs, grid])]));
    MP.$("#pageBody").appendChild(dialog);
    MP.$("#pageBody").appendChild(cta(MP, "Your project could be next.", "Tell us about it — we'll come back with a proof and a quote.", "contact.html#quote", "Start a project"));
  };

  /* ================================================================== ABOUT */
  P.about = function (MP) {
    var D = MP.D, el = MP.el;
    MP.pageHead({ kicker: "About Majestic", title: "One partner. Every printing solution", crumbs: [["About"]], ink: MP.ink("magenta") });
    var body = MP.$("#pageBody");
    body.appendChild(el("section", { class: "section section-tight" }, [el("div", { class: "container-xl" }, [
      el("div", { class: "about-grid" }, [
        el("figure", { class: "print-frame about-photo reveal" }, [
          el("img", { src: "assets/img/photos/workshop.jpg", alt: "Printing in the workshop (sample image)", width: "1600", height: "1067" }),
          el("figcaption", { class: "slug", text: "Sample image · Majestic workshop photography to come" })
        ]),
        el("div", { class: "about-copy reveal" }, [
          el("p", { class: "statement", text: "Majestic Print Solutions brings printing, packaging, signage and promotional work together in one workshop in Pannala." }),
          el("p", { class: "lead-text", text: "One team handles your job from file to finish — so colours match across your cards, boxes and shop sign, and you only explain your brand once." }),
          el("p", { class: "fine-print", text: "Waiting on client: founding year, company story, team and verified milestones." })
        ])
      ])
    ])]));

    var pillars = [
      ["Print", "bright", "Business stationery, marketing print, publications and labels — offset for volume, digital for speed."],
      ["Pack", "gold", "Boxes, sleeves, bags and labels that make a product look ready for the shelf."],
      ["Promote", "magenta", "Signage, vehicle graphics, large format and branded gifts that keep a name in sight."]
    ];
    body.appendChild(el("section", { class: "section section-tint" }, [el("div", { class: "container-xl" }, [
      el("div", { class: "section-head" }, [el("p", { class: "kicker", text: "What we do" }), el("h2", { text: "Three plates, one impression" }),
        el("p", { text: "Like cyan, magenta and yellow on a press, our three services overlap to make a complete brand." })]),
      el("div", { class: "pillars" }, pillars.map(function (p) {
        return el("div", { class: "pillar reveal", style: "--ink:" + MP.ink(p[1]) }, [
          el("span", { class: "pillar-plate", "aria-hidden": "true" }),
          el("h3", null, [document.createTextNode(p[0]), el("span", { text: "." })]),
          el("p", { text: p[2] })
        ]);
      }))
    ])]));

    var traits = ["Professional", "Modern", "Reliable", "Creative", "Innovative", "Technology-driven"];
    var inks = ["deep", "bright", "magenta", "orange", "gold", "deep"];
    body.appendChild(el("section", { class: "section" }, [el("div", { class: "container-xl" }, [
      el("div", { class: "section-head" }, [el("p", { class: "kicker", text: "How we work" }), el("h2", { text: "The way we print" })]),
      el("ol", { class: "traits" }, traits.map(function (t, k) {
        return el("li", { class: "reveal", style: "--ink:" + MP.ink(inks[k]) }, [el("span", { class: "slug", text: String(k + 1).padStart(2, "0") }), el("strong", { text: t })]);
      }))
    ])]));

    var mapHref = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Majestic Print Solutions, " + D.contact.address);
    body.appendChild(el("section", { class: "section section-deep" }, [el("div", { class: "container-xl" }, [
      el("div", { class: "visit-grid" }, [
        el("div", null, [
          el("p", { class: "kicker", text: "Visit the workshop" }),
          el("h2", { text: "Come and see your proof in person" }),
          el("p", { class: "lead-text", text: "Bring your ideas, feel the paper stocks and finishes, and collect your order when it's ready." })
        ]),
        el("div", { class: "ticket visit-ticket" }, [
          el("div", { class: "ticket-head" }, [el("span", { class: "ticket-title", text: "Pannala" }), el("span", { class: "slug", text: "Sri Lanka" })]),
          el("ul", { class: "contact-list", id: "visitContact" }),
          el("a", { class: "btn-mp btn-mp-primary w-100", href: mapHref, target: "_blank", rel: "noopener", html: "Open in Google Maps" + MP.ARROW })
        ])
      ])
    ])]));
    // reuse the shared contact list builder by cloning the footer list once it exists
    requestAnimationFrame(function () { var f = MP.$("#footerContact"); if (f) MP.$("#visitContact").innerHTML = f.innerHTML; });
  };

  /* ===================================================== HOW TO ORDER */
  P.order = function (MP) {
    var D = MP.D, el = MP.el, $$ = MP.$$;
    MP.pageHead({ kicker: "Help", title: "How to order", crumbs: [["How to order"]], ink: MP.ink("bright"),
      lead: "Two ways to work with us — order a standard product online, or plan something custom. Either way, nothing prints until you approve the proof." });
    var body = MP.$("#pageBody");
    var routes = [
      ["Standard product", "Order online", ["Choose a product and options", "Upload artwork or ask us to design", "Approve your proof", "We print — collect or get it delivered"], "shop.html", "Browse the shop"],
      ["Custom project", "Plan with us", ["Tell us what you want to make", "We recommend process and material", "Approve the quote and proof", "We produce — and install if needed"], "contact.html#quote", "Plan a custom project"]
    ];
    body.appendChild(el("section", { class: "section section-tight" }, [el("div", { class: "container-xl" }, [
      el("div", { class: "order-routes" }, routes.map(function (r, k) {
        return el("div", { class: "ticket order-ticket reveal" }, [
          el("div", { class: "ticket-head" }, [el("span", { class: "ticket-title", text: r[0] }), el("span", { class: "slug", text: r[1] })]),
          el("ol", { class: "ticket-steps" }, r[2].map(function (st, j) {
            return el("li", { class: "ticket-step" + (j === 2 ? " is-proof" : "") }, [
              el("span", { class: "tick", "aria-hidden": "true" }), el("div", null, [el("h3", { text: st })]),
              j === 2 ? el("span", { class: "stamp", "aria-hidden": "true", text: "Approved" }) : null
            ]);
          })),
          el("a", { class: "btn-mp " + (k ? "btn-mp-outline" : "btn-mp-primary") + " w-100", href: r[3], text: r[4] })
        ]);
      }))
    ])]));

    // Artwork guide with an interactive bleed / trim / safe diagram
    var zones = [["bleed", "Bleed", "magenta"], ["trim", "Trim", "ink"], ["safe", "Safe zone", "bright"]];
    var svg = '<svg viewBox="0 0 400 260" class="bleed-svg" role="img" aria-labelledby="bleedTitle"><title id="bleedTitle">Business card artwork showing bleed, trim and safe zone</title>' +
      '<rect class="z-bleed-fill" x="10" y="10" width="380" height="240" fill="#13477A"/>' +
      '<rect x="10" y="10" width="380" height="240" fill="url(#hatch)" opacity=".25"/>' +
      '<defs><pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="8" fill="#fff"/></pattern></defs>' +
      '<rect class="z-trim-fill" x="30" y="30" width="340" height="200" fill="#13477A"/>' +
      '<rect x="62" y="70" width="90" height="10" fill="#EAA123"/><rect x="62" y="96" width="180" height="7" fill="#fff" opacity=".85"/><rect x="62" y="112" width="140" height="7" fill="#fff" opacity=".6"/>' +
      '<rect x="62" y="186" width="120" height="7" fill="#fff" opacity=".6"/><circle cx="318" cy="96" r="26" fill="#D01C60"/>' +
      '<rect class="z z-bleed" x="10" y="10" width="380" height="240" fill="none" stroke="#D01C60" stroke-width="2" stroke-dasharray="6 5"/>' +
      '<rect class="z z-trim" x="30" y="30" width="340" height="200" fill="none" stroke="#0D2440" stroke-width="2.5"/>' +
      '<rect class="z z-safe" x="46" y="46" width="308" height="168" fill="none" stroke="#EAA123" stroke-width="2" stroke-dasharray="3 4"/>' +
      '</svg>';
    var legend = el("div", { class: "bleed-legend" }, zones.map(function (z) {
      var b = el("button", { type: "button", class: "zone-key zone-" + z[0], "data-zone": z[0] }, [el("span", { class: "zone-swatch", "aria-hidden": "true" }), el("span", { text: z[1] })]);
      ["mouseenter", "focus"].forEach(function (ev) { b.addEventListener(ev, function () { diagram.setAttribute("data-focus", z[0]); }); });
      ["mouseleave", "blur"].forEach(function (ev) { b.addEventListener(ev, function () { diagram.removeAttribute("data-focus"); }); });
      return b;
    }));
    var diagram = el("figure", { class: "print-frame bleed-diagram", html: svg });
    diagram.appendChild(el("figcaption", { class: "slug", text: "90 × 55 mm business card  ·  3 mm bleed  ·  4 mm safe zone" }));
    var table = el("dl", { class: "art-table" });
    D.artwork.forEach(function (a) {
      table.appendChild(el("dt", null, [el("span", { class: "art-val", text: a.value }), el("strong", { text: a.term })]));
      table.appendChild(el("dd", { text: a.text }));
    });
    body.appendChild(el("section", { class: "section section-tint", id: "artwork" }, [el("div", { class: "container-xl" }, [
      el("div", { class: "section-head" }, [el("p", { class: "kicker", text: "Artwork guide" }), el("h2", { text: "Make your file print-ready" }),
        el("p", { text: "Standard prepress settings. We check every file before your proof — and fix small issues for you." })]),
      el("div", { class: "art-grid" }, [el("div", { class: "reveal" }, [diagram, legend]), el("div", { class: "reveal" }, [table, el("p", { class: "fine-print", text: "Standard industry guidance — Majestic to confirm exact file requirements." })])])
    ])]));

    // FAQ
    body.appendChild(el("section", { class: "section", id: "faq" }, [el("div", { class: "container-xl faq-grid" }, [
      el("div", { class: "section-head" }, [el("p", { class: "kicker", text: "FAQ" }), el("h2", { text: "Questions we hear at the counter" }),
        el("p", { text: "Can't find yours? Ask us on WhatsApp." })]),
      el("div", { class: "faq" }, D.faqs.map(function (f) {
        return el("details", { class: "faq-item" }, [el("summary", { text: f.q }), el("p", { text: f.a })]);
      }))
    ])]));
    body.appendChild(cta(MP, "Ready when you are.", "Pick a product or tell us about your project.", "shop.html", "Browse the shop"));
    if (location.hash) requestAnimationFrame(function () { var t = document.querySelector(location.hash); if (t) t.scrollIntoView(); });
  };

  /* ================================================================ CONTACT */
  P.contact = function (MP) {
    var el = MP.el, $ = MP.$;
    MP.pageHead({ kicker: "Contact", title: "Let's make it", crumbs: [["Contact"]], ink: MP.ink("magenta"),
      lead: "Send your quote list or describe your project. We reply on WhatsApp with questions, a quote and your proof." });

    var listWrap = $("#quoteList");
    function renderList() {
      var items = MP.quote.list();
      listWrap.textContent = "";
      if (!items.length) {
        listWrap.appendChild(el("div", { class: "ql-empty" }, [
          el("p", { class: "slug", text: "Quote list · empty" }),
          el("p", { text: "Add products from the shop to quote several items at once — or just describe your project below." }),
          el("a", { class: "text-link", href: "shop.html", html: "Browse the shop" + MP.ARROW })
        ]));
        return;
      }
      var ol = el("ol", { class: "ql-items" });
      items.forEach(function (it, k) {
        var opts = Object.keys(it.options || {}).map(function (o) { return it.options[o]; }).join(" · ");
        var rm = el("button", { type: "button", class: "ql-remove", "aria-label": "Remove " + it.name, html: '<i class="fa-solid fa-xmark" aria-hidden="true"></i>' });
        rm.addEventListener("click", function () { MP.quote.remove(k); });
        ol.appendChild(el("li", null, [
          el("span", { class: "ql-qty", text: "× " + it.qty }),
          el("div", null, [el("a", { href: "product.html?p=" + it.slug, text: it.name }), el("p", { text: opts }), el("p", { class: "slug", text: "Artwork: " + it.artwork })]),
          rm
        ]));
      });
      var clear = el("button", { type: "button", class: "btn-mp btn-mp-ghost", text: "Clear list" });
      clear.addEventListener("click", function () { MP.quote.clear(); });
      listWrap.appendChild(el("div", { class: "ticket-head" }, [el("span", { class: "ticket-title", text: "Quote list" }), el("span", { class: "slug", text: items.length + (items.length === 1 ? " item" : " items") })]));
      listWrap.appendChild(ol);
      listWrap.appendChild(clear);
    }
    document.addEventListener("mp:quote-change", renderList);
    renderList();
  };
})();
