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
    return { slug: p.slug, name: p.name, img: p.img, cat: p.cat, specs: specs };
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
      lead: "Cards, marketing print, banners, printed packaging and gifts. Choose your options, add them to your cart, or send a quote request." });

    function num(v) { var n = parseInt(v, 10); return isNaN(n) || n < 0 ? "" : n; }
    var state = {
      cat: MP.param("cat") || "all",
      subs: (MP.param("sub") || "").split(",").filter(Boolean),
      min: num(MP.param("min")), max: num(MP.param("max")),
      days: [2, 5].indexOf(parseInt(MP.param("days"), 10)) !== -1 ? parseInt(MP.param("days"), 10) : 0,
      pers: MP.param("pers") === "1",
      sort: ["price-asc", "price-desc", "fastest"].indexOf(MP.param("sort")) !== -1 ? MP.param("sort") : "popular",
      q: (MP.param("q") || "").trim().toLowerCase()
    };
    var info = {}; // slug -> {p, from}
    D.catalogue.forEach(function (p) { info[p.slug] = { p: p, from: MP.fromPrice(p).total }; });
    var subParent = {}, subTitle = {};
    D.categories.forEach(function (c) { (c.subs || []).forEach(function (sb) { subParent[sb.id] = c.id; subTitle[sb.id] = sb.title; }); });
    function countWhere(fn) { return D.catalogue.filter(fn).length; }

    /* top: category chips */
    var bar = MP.filterBar({
      label: "Product category", active: state.cat,
      items: [{ id: "all", title: "All products" }].concat(D.categories.map(function (c) { return { id: c.id, title: c.title, ink: c.ink }; })),
      onChange: function (id) { state.cat = id; state.subs = []; render(); }
    });

    /* sidebar */
    var catBoxes = {}, subBoxes = {}, daysRadios = [];
    function checkRow(id, label, count, cls) {
      var input = el("input", { type: "checkbox", id: id, class: "ck-input" });
      return { input: input, row: el("label", { class: "ck-row " + (cls || ""), for: id }, [input, el("span", { class: "ck-box", "aria-hidden": "true" }), el("span", { class: "ck-label", text: label }), el("span", { class: "ck-count", text: String(count) })]) };
    }
    var tree = el("div", { class: "sf-tree" });
    D.categories.forEach(function (c) {
      var cr = checkRow("sf-c-" + c.id, c.title, countWhere(function (p) { return p.cat === c.id; }), "ck-cat");
      cr.row.style.setProperty("--ink", MP.ink(c.ink));
      catBoxes[c.id] = cr.input;
      cr.input.addEventListener("change", function () {
        if (cr.input.checked) { state.cat = c.id; state.subs = state.subs.filter(function (x) { return subParent[x] === c.id; }); } else { state.cat = "all"; }
        render();
      });
      var grp = el("div", { class: "sf-group" }, [cr.row]);
      (c.subs || []).forEach(function (sb) {
        var sr = checkRow("sf-s-" + sb.id, sb.title, countWhere(function (p) { return p.sub === sb.id; }), "ck-sub");
        sr.row.style.setProperty("--ink", MP.ink(c.ink));
        subBoxes[sb.id] = sr.input;
        sr.input.addEventListener("change", function () {
          var i = state.subs.indexOf(sb.id);
          if (sr.input.checked && i === -1) { if (state.cat !== "all" && state.cat !== c.id) state.cat = "all"; state.subs.push(sb.id); }
          if (!sr.input.checked && i !== -1) state.subs.splice(i, 1);
          render();
        });
        grp.appendChild(sr.row);
      });
      tree.appendChild(grp);
    });

    var minIn = el("input", { type: "number", min: "0", step: "100", class: "form-control", id: "sf-min", placeholder: "Min", "aria-label": "Minimum price in LKR" });
    var maxIn = el("input", { type: "number", min: "0", step: "100", class: "form-control", id: "sf-max", placeholder: "Max", "aria-label": "Maximum price in LKR" });
    var applyBtn = el("button", { type: "button", class: "btn-mp btn-mp-outline btn-mp-sm", text: "Apply" });
    function applyPrice() { state.min = num(minIn.value); state.max = num(maxIn.value); render(); }
    applyBtn.addEventListener("click", applyPrice);
    [minIn, maxIn].forEach(function (i) { i.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); applyPrice(); } }); });

    var daysList = el("div", { class: "sf-radios", role: "radiogroup", "aria-label": "Turnaround" });
    [[0, "Any"], [2, "Ready in 2 days or less"], [5, "Ready in 5 days or less"]].forEach(function (d, i) {
      var input = el("input", { type: "radio", name: "sf-days", id: "sf-d-" + i, class: "ck-input" });
      input.addEventListener("change", function () { state.days = d[0]; render(); });
      daysRadios.push([d[0], input]);
      daysList.appendChild(el("label", { class: "ck-row ck-radio", for: "sf-d-" + i }, [input, el("span", { class: "ck-box", "aria-hidden": "true" }), el("span", { class: "ck-label", text: d[1] })]));
    });

    var pr = checkRow("sf-pers", "Personalised products only", countWhere(function (p) { return p.personalise; }), "");
    pr.input.addEventListener("change", function () { state.pers = pr.input.checked; render(); });
    var clearAll = el("button", { type: "button", class: "sf-clear", text: "Clear all" });
    clearAll.addEventListener("click", function () { state.cat = "all"; state.subs = []; state.min = state.max = ""; state.days = 0; state.pers = false; state.q = ""; render(); });

    function section(title, body) { return el("section", { class: "sf-section" }, [el("h2", { class: "slug sf-title", text: title }), body]); }
    var panel = el("aside", { class: "offcanvas-lg offcanvas-start shop-filters", tabindex: "-1", id: "shopFilters", "aria-labelledby": "shopFiltersLabel" }, [
      el("div", { class: "offcanvas-header sf-mobile-head" }, [
        el("h2", { class: "slug", id: "shopFiltersLabel", text: "Filters" }),
        el("button", { type: "button", class: "mn-close", "data-bs-dismiss": "offcanvas", "data-bs-target": "#shopFilters", "aria-label": "Close filters", html: '<i class="fa-solid fa-xmark" aria-hidden="true"></i>' })
      ]),
      el("div", { class: "offcanvas-body sf-body" }, [
        el("div", { class: "sf-head d-none d-lg-flex" }, [el("h2", { class: "slug sf-title", text: "Filters" }), clearAll]),
        section("Category", tree),
        section("Price (LKR)", el("div", { class: "sf-price" }, [minIn, el("span", { text: "–", "aria-hidden": "true" }), maxIn, applyBtn])),
        section("Turnaround", daysList),
        section("Personalise", pr.row)
      ])
    ]);
    // On small screens the Clear all link also sits at the foot of the offcanvas
    var clearMobile = el("button", { type: "button", class: "sf-clear d-lg-none", text: "Clear all" });
    clearMobile.addEventListener("click", function () { clearAll.click(); });
    $(".sf-body", panel).appendChild(clearMobile);

    /* results */
    var filterBtn = el("button", { type: "button", class: "btn-mp btn-mp-outline btn-mp-sm d-lg-none", "data-bs-toggle": "offcanvas", "data-bs-target": "#shopFilters", "aria-controls": "shopFilters", html: '<i class="fa-solid fa-sliders" aria-hidden="true"></i> Filters' });
    var count = el("p", { class: "slug result-count-text", "aria-live": "polite" });
    var sortSel = el("select", { class: "form-select sort-select", id: "shopSort", "aria-label": "Sort products" });
    [["popular", "Popular"], ["price-asc", "Price: low to high"], ["price-desc", "Price: high to low"], ["fastest", "Fastest"]].forEach(function (o) { sortSel.appendChild(el("option", { value: o[0], text: o[1] })); });
    sortSel.addEventListener("change", function () { state.sort = sortSel.value; render(); });
    var toolbar = el("div", { class: "shop-toolbar" }, [
      el("div", { class: "shop-toolbar-l" }, [filterBtn, count]),
      el("label", { class: "sort-wrap" }, [el("span", { class: "slug", text: "Sort" }), sortSel])
    ]);
    var active = el("div", { class: "active-filters", "aria-label": "Active filters" });
    var grid = el("div", { class: "spec-grid" });
    var empty = el("div", { class: "empty-sheet", hidden: "" }, [
      el("p", { class: "slug", text: "No match" }),
      el("h3", { text: "Nothing on this sheet yet." }),
      el("p", { text: "Try removing a filter — or describe what you need and we'll quote it." }),
      el("a", { class: "btn-mp btn-mp-primary", href: "contact.html#quote", text: "Plan a custom project" })
    ]);
    var cards = {};
    D.catalogue.forEach(function (p) {
      var card = MP.specCard(specsFor(p), "product.html?p=" + p.slug);
      card.classList.add("is-in");
      cards[p.slug] = card;
      grid.appendChild(card);
    });

    mount(MP, el("section", { class: "section section-tight" }, [
      el("div", { class: "container-xl" }, [
        bar,
        el("div", { class: "shop-layout" }, [panel, el("div", { class: "shop-results" }, [toolbar, active, grid, empty])])
      ])
    ]));
    mount(MP, cta(MP, "Can't see it here?", "Most of what we print is made to order. Tell us what you need and we'll put a quote together.", "contact.html#quote", "Plan a custom project"));

    // Parent sections create stacking contexts; lift the panel to <body> while it is open as an offcanvas
    var panelHome = panel.parentNode, panelNext = panel.nextSibling;
    panel.addEventListener("show.bs.offcanvas", function () { document.body.appendChild(panel); });
    panel.addEventListener("hidden.bs.offcanvas", function () { panelHome.insertBefore(panel, panelNext); });

    function chip(label, kind, onRemove, ink) {
      var b = el("button", { type: "button", class: "occ-chip af-chip", style: "--ink:" + (ink || MP.ink("deep")), "aria-label": "Remove filter: " + label }, [
        el("span", { text: label }), el("i", { class: "fa-solid fa-xmark", "aria-hidden": "true" })
      ]);
      b.addEventListener("click", onRemove);
      return b;
    }
    function matches(p) {
      var f = info[p.slug].from;
      if (state.cat !== "all" && p.cat !== state.cat) return false;
      if (state.subs.length && state.subs.indexOf(p.sub) === -1) return false;
      if (state.min !== "" && f < state.min) return false;
      if (state.max !== "" && f > state.max) return false;
      if (state.days && p.days > state.days) return false;
      if (state.pers && !p.personalise) return false;
      if (state.q && (p.name + " " + p.service + " " + p.blurb + " " + (subTitle[p.sub] || "")).toLowerCase().indexOf(state.q) === -1) return false;
      return true;
    }

    function render() {
      bar.setActive(state.cat);
      D.categories.forEach(function (c) { catBoxes[c.id].checked = state.cat === c.id; });
      Object.keys(subBoxes).forEach(function (id) { subBoxes[id].checked = state.subs.indexOf(id) !== -1; });
      minIn.value = state.min; maxIn.value = state.max;
      daysRadios.forEach(function (d) { d[1].checked = d[0] === state.days; });
      pr.input.checked = state.pers; sortSel.value = state.sort;

      active.textContent = "";
      var cat = state.cat !== "all" ? MP.catById(state.cat) : null;
      if (cat) active.appendChild(chip(cat.title, "cat", function () { state.cat = "all"; state.subs = []; render(); }, MP.ink(cat.ink)));
      state.subs.forEach(function (id) {
        var c = MP.catById(subParent[id]);
        active.appendChild(chip(subTitle[id], "sub", function () { state.subs.splice(state.subs.indexOf(id), 1); render(); }, MP.ink(c.ink)));
      });
      if (state.min !== "" || state.max !== "") {
        var lbl = state.min !== "" && state.max !== "" ? MP.money(state.min) + " – " + MP.money(state.max).replace("LKR ", "") : state.min !== "" ? "From " + MP.money(state.min) : "Up to " + MP.money(state.max);
        active.appendChild(chip(lbl, "price", function () { state.min = state.max = ""; render(); }));
      }
      if (state.days) active.appendChild(chip("Ready in " + state.days + " days or less", "days", function () { state.days = 0; render(); }));
      if (state.pers) active.appendChild(chip("Personalised", "pers", function () { state.pers = false; render(); }));
      if (state.q) active.appendChild(chip("Search: “" + state.q + "”", "q", function () { state.q = ""; render(); }));
      if (active.children.length) {
        var ca = el("button", { type: "button", class: "af-clear", text: "Clear all" });
        ca.addEventListener("click", function () { clearAll.click(); });
        active.appendChild(ca);
      }

      var list = D.catalogue.filter(matches);
      list.sort(function (a, b) {
        if (state.sort === "price-asc") return info[a.slug].from - info[b.slug].from;
        if (state.sort === "price-desc") return info[b.slug].from - info[a.slug].from;
        if (state.sort === "fastest") return a.days - b.days;
        return D.catalogue.indexOf(a) - D.catalogue.indexOf(b);
      });
      var shown = {};
      list.forEach(function (p) { shown[p.slug] = 1; grid.appendChild(cards[p.slug]); });
      D.catalogue.forEach(function (p) { cards[p.slug].hidden = !shown[p.slug]; });
      var n = list.length;
      count.textContent = n + (n === 1 ? " product" : " products");
      empty.hidden = n > 0;

      var url = new URL(location.href), sp = url.searchParams;
      function put(k, v, skip) { if (v !== skip && v !== "" && v !== false && v != null) sp.set(k, v); else sp.delete(k); }
      put("cat", state.cat, "all"); put("sub", state.subs.join(","), ""); put("min", state.min, ""); put("max", state.max, "");
      put("days", state.days, 0); put("pers", state.pers ? "1" : "", ""); put("sort", state.sort, "popular"); put("q", state.q, "");
      history.replaceState(null, "", url);
    }
    render();
  };

  /* ================================================================== CART */
  P.cart = function (MP) {
    var el = MP.el;
    MP.pageHead({ kicker: "Cart", title: "Your cart", crumbs: [["Shop", "shop.html"], ["Cart"]], ink: MP.ink("bright") });
    var box = el("div", { class: "container-xl cart-wrap" });
    mount(MP, el("section", { class: "section section-tight" }, [box]));

    function render() {
      box.textContent = "";
      var items = MP.cart.list();
      if (!items.length) {
        box.appendChild(el("div", { class: "empty-sheet" }, [
          el("p", { class: "slug", text: "Empty" }),
          el("h3", { text: "Your cart is empty." }),
          el("p", { text: "Add a product from the shop and it will appear here." }),
          el("a", { class: "btn-mp btn-mp-primary", href: "shop.html", text: "Continue shopping" })
        ]));
        return;
      }
      var list = el("ul", { class: "cart-items" });
      items.forEach(function (it, i) {
        var opts = Object.keys(it.options || {}).map(function (k) { return k + ": " + it.options[k]; }).join(" · ");
        var q = el("input", { type: "number", min: "1", class: "form-control cart-qty", value: String(it.qty), id: "cq-" + i, "aria-label": "Quantity for " + it.name });
        q.addEventListener("change", function () { MP.cart.update(i, q.value); render(); });
        var rm = el("button", { type: "button", class: "ql-remove", "aria-label": "Remove " + it.name, html: '<i class="fa-solid fa-xmark" aria-hidden="true"></i>' });
        rm.addEventListener("click", function () { MP.cart.remove(i); render(); });
        list.appendChild(el("li", null, [
          el("a", { href: "product.html?p=" + it.slug, class: "cart-thumb" }, [el("img", { src: it.img, alt: "", width: "96", height: "72" })]),
          el("div", { class: "cart-info" }, [
            el("a", { href: "product.html?p=" + it.slug, class: "cart-name", text: it.name }),
            el("p", { text: opts }),
            it.express ? el("p", { text: "Express — ready in 1–2 days (+25%)" }) : null,
            it.personal && (it.personal.name || it.personal.message || typeof it.personal === "string") ? el("p", { text: "Personalisation: " + (typeof it.personal === "string" ? it.personal : [it.personal.name, it.personal.message].filter(Boolean).join(" — ")) }) : null,
            it.ready ? el("p", { text: "Ready by " + it.ready }) : null,
            el("p", { class: "slug", text: MP.money(it.unit) + " each" })
          ]),
          el("label", { class: "cart-qty-wrap", for: "cq-" + i }, [el("span", { class: "slug", text: "Qty" }), q]),
          el("strong", { class: "cart-line", text: MP.money(it.total) }),
          rm
        ]));
      });
      box.appendChild(list);
      box.appendChild(el("div", { class: "cart-summary" }, [
        el("p", { class: "cart-subtotal" }, [el("span", { class: "slug", text: "Subtotal" }), el("strong", { text: MP.money(MP.cart.subtotal()) })]),
        el("p", { class: "cart-note", text: "Sample prices. Delivery and final price are confirmed with your proof." }),
        el("div", { class: "cap-actions" }, [
          el("a", { class: "text-link", href: "shop.html", text: "Continue shopping" }),
          el("a", { class: "btn-mp btn-mp-primary", href: "checkout.html", role: "button", html: "Checkout" + MP.ARROW })
        ])
      ]));
    }
    render();
  };

  /* ================================================================ PRODUCT */
  P.product = function (MP) {
    var D = MP.D, el = MP.el, $ = MP.$, $$ = MP.$$;
    var p = D.catalogue.filter(function (x) { return x.slug === MP.param("p"); })[0] || D.catalogue[0];
    var cat = MP.catById(p.cat);
    var inkHex = MP.ink(cat.ink);
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
    var mockKind = p.sub === "mugs" ? "mug" : (p.sub === "apparel" && /shirt/i.test(p.name)) ? "shirt" : "";
    var mockImg = null, mockTxt = null, mock = null;
    function setMock(url) { if (!mock) return; if (url) { mockImg.setAttributeNS("http://www.w3.org/1999/xlink", "href", url); mockImg.setAttribute("href", url); mockImg.style.display = ""; } else { mockImg.removeAttribute("href"); mockImg.style.display = "none"; } }
    function setMockText() { if (mockTxt) mockTxt.textContent = pName ? pName.value : ""; }
    if (mockKind) {
      var NS = "http://www.w3.org/2000/svg";
      var mk = function (n, a) { var e = document.createElementNS(NS, n); Object.keys(a || {}).forEach(function (k) { e.setAttribute(k, a[k]); }); return e; };
      var svg = mk("svg", { viewBox: "0 0 400 300", role: "img", "aria-label": "Live preview of your " + (mockKind === "mug" ? "mug" : "T-shirt"), class: "pd-mock-svg" });
      var area;
      if (mockKind === "mug") {
        svg.appendChild(mk("path", { d: "M300 100h30a40 40 0 0 1 0 100h-30v-16h28a24 24 0 0 0 0-68h-28z", fill: "#E6EBF1", stroke: "#13477A", "stroke-width": "3" }));
        svg.appendChild(mk("rect", { x: "90", y: "60", width: "220", height: "180", fill: "#fff", stroke: "#13477A", "stroke-width": "3" }));
        area = { x: 115, y: 85, w: 170, h: 130 };
      } else {
        svg.appendChild(mk("path", { d: "M140 40l-90 45 30 55 35-18v138h150V122l35 18 30-55-90-45c-8 18-28 28-55 28s-47-10-55-28z", fill: "#fff", stroke: "#13477A", "stroke-width": "3", "stroke-linejoin": "miter" }));
        area = { x: 140, y: 85, w: 120, h: 120 };
      }
      svg.appendChild(mk("rect", { x: area.x, y: area.y, width: area.w, height: area.h, fill: "none", stroke: "#007CAC", "stroke-width": "1.5", "stroke-dasharray": "5 4" }));
      mockImg = mk("image", { x: area.x, y: area.y, width: area.w, height: area.h - 34, preserveAspectRatio: "xMidYMid meet" });
      mockImg.style.display = "none";
      svg.appendChild(mockImg);
      mockTxt = mk("text", { x: area.x + area.w / 2, y: area.y + area.h - 10, "text-anchor": "middle", "font-family": "Poppins, sans-serif", "font-weight": "700", "font-size": "17", fill: "#13477A" });
      svg.appendChild(mockTxt);
      mock = el("figure", { class: "print-frame pd-mock" }, [el("div", { class: "pd-mock-stage" }), el("figcaption", { class: "slug", text: "Preview — not to scale" })]);
      mock.firstChild.appendChild(svg);
    }
    var gallery = el("div", { class: "pd-gallery" }, [
      el("figure", { class: "print-frame pd-main" }, [el("div", { class: "pd-main-img" }, [main]), el("figcaption", { class: "slug", text: p.name + "  ·  sample image  ·  real product photography to come" })])
    ].concat(mock ? [mock] : [thumbs]));

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
        var addon = p.price && p.price.add && p.price.add[group] && p.price.add[group][val];
        var kids = [document.createTextNode(val)];
        if (addon) kids.push(el("small", { class: "opt-sub", text: (addon > 0 ? "+ " : "− ") + MP.money(Math.abs(addon)).replace(/^LKR /, "LKR ") + "/unit" }));
        row.appendChild(el("label", { class: "opt", for: id }, [input, el("span", null, kids)]));
      });
      fs.appendChild(row); form.appendChild(fs);
    });

    // Quantity
    var qty = p.quantities[0], qPrices = [];
    var qfs = el("fieldset", { class: "opt-group" }, [el("legend", { class: "slug", text: "Quantity" })]);
    var qrow = el("div", { class: "opt-row" });
    p.quantities.forEach(function (q, qi) {
      var input = el("input", { type: "radio", name: "qty", id: "q-" + qi, value: q, class: "visually-hidden" });
      if (qi === 0) input.checked = true;
      input.addEventListener("change", function () { qty = q; custom.value = ""; update(); });
      var qp = el("small", { class: "opt-sub" });
      qPrices.push([q, qp]);
      qrow.appendChild(el("label", { class: "opt", for: "q-" + qi }, [input, el("span", null, [document.createTextNode(String(q)), qp])]));
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

    var lowRes = el("p", { class: "file-info is-warn", hidden: "", role: "status", text: "Low resolution for print — we'll check it before printing." });
    afs.insertBefore(lowRes, fileInfo.nextSibling);
    var artURL = "";
    file.addEventListener("change", function () {
      lowRes.hidden = true;
      if (artURL) { try { URL.revokeObjectURL(artURL); } catch (e) {} artURL = ""; }
      var f = file.files[0];
      if (!artFile || !f) { setMock(""); return; }
      if (/\.(jpe?g|png|svg)$/i.test(f.name)) {
        try { artURL = URL.createObjectURL(f); } catch (e) { artURL = ""; }
        var im = new Image();
        im.onload = function () { if (/\.(jpe?g|png)$/i.test(f.name) && im.naturalWidth < 1000) lowRes.hidden = false; setMock(artURL); };
        im.onerror = function () { setMock(""); };
        im.src = artURL;
      } else setMock("");
    });

    // Personalisation
    var pName = null, pMsg = null;
    if (p.personalise) {
      var pfs = el("fieldset", { class: "opt-group" }, [el("legend", { class: "slug", text: "Personalise" })]);
      pName = el("input", { type: "text", class: "form-control", id: "pdName", maxlength: "40", placeholder: "e.g. Nimal's Hardware" });
      pName.addEventListener("input", function () { setMockText(); update(); });
      pfs.appendChild(el("label", { class: "pd-field-label", for: "pdName", text: "Name / text to print (max 40 characters)" }));
      pfs.appendChild(pName);
      if (p.cat === "stationery" && p.sub === "invitations") {
        pMsg = el("textarea", { class: "form-control", rows: "3", maxlength: "200", id: "pdMsg", placeholder: "Message printed inside the card" });
        pMsg.addEventListener("input", update);
        pfs.appendChild(el("label", { class: "pd-field-label mt-3", for: "pdMsg", text: "Inside message (max 200 characters)" }));
        pfs.appendChild(pMsg);
      }
      form.appendChild(pfs);
    }

    var notes = el("textarea", { class: "form-control", rows: "3", maxlength: "500", id: "pdNotes", placeholder: "Anything else — colours, wording, deadline…" });
    notes.addEventListener("input", update);
    form.appendChild(el("div", { class: "opt-group" }, [el("label", { class: "slug", for: "pdNotes", text: "Notes (optional)" }), notes]));

    /* Live job ticket */
    var NODAYS = 0;
    var express = false;
    var tRows = el("dl", { class: "ticket-spec" });
    var stamp = el("span", { class: "stamp stamp-added", "aria-hidden": "true", text: "Added" });
    var priceEl = el("strong", { class: "pd-total", "aria-live": "polite" });
    var unitEl = el("span", { class: "pd-unit" });
    var kokoLine = el("span", { class: "bnpl-text" }), mintLine = el("span", { class: "bnpl-text" });
    function info(title, brand) {
      var b = el("button", { type: "button", class: "bnpl-info", "aria-label": "About " + brand + " instalments", "aria-expanded": "false", html: '<i class="fa-solid fa-circle-info" aria-hidden="true"></i>' });
      var pop = el("span", { class: "bnpl-pop", role: "note", hidden: "", text: "Pay in 3 interest-free instalments. 1st today, the rest over the next 2 months. Requires a " + brand + " account." });
      b.addEventListener("click", function (e) { e.stopPropagation(); var open = pop.hidden; closePops(); pop.hidden = !open; b.setAttribute("aria-expanded", String(open)); });
      return [b, pop];
    }
    function closePops() { $$(".bnpl-pop").forEach(function (x) { x.hidden = true; }); $$(".bnpl-info").forEach(function (x) { x.setAttribute("aria-expanded", "false"); }); }
    document.addEventListener("click", closePops);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closePops(); });
    var kokoRow = el("li", { class: "bnpl-row" }, [kokoLine, el("img", { class: "bnpl-koko", src: "assets/img/pay/koko-alt.png", alt: "Koko", width: "215", height: "98" })].concat(info("", "Koko")));
    var mintRow = el("li", { class: "bnpl-row" }, [mintLine, el("span", { class: "bnpl-chip" }, [el("img", { src: "assets/img/pay/mintpay.png", alt: "Mintpay", width: "3348", height: "1228" })])].concat(info("", "Mintpay")));

    var expChk = el("input", { type: "checkbox", id: "pdExpress" });
    expChk.addEventListener("change", function () { express = expChk.checked; update(); });
    var delivBox = el("div", { class: "pd-deliv" }, [
      el("span", { class: "slug", text: "Delivery" }),
      el("p", { class: "pd-deliv-note", text: "Delivery is chosen at checkout: collect free in Pannala or island-wide courier LKR 450 (sample)." })
    ]);
    if (p.days > 2) delivBox.appendChild(el("label", { class: "pd-express", for: "pdExpress" }, [expChk, el("span", { text: "Express — ready in 1–2 days, +25%" })]));
    var readyEl = el("p", { class: "pd-ready" });

    var cartBtn = el("button", { type: "button", class: "btn-mp btn-mp-primary w-100", html: '<i class="fa-solid fa-cart-shopping" aria-hidden="true"></i> Add to cart' });
    var buyBtn = el("button", { type: "button", class: "btn-mp btn-mp-outline w-100", text: "Buy now" });
    var quoteBtn = el("button", { type: "button", class: "text-link pd-link", text: "Request a quote" });
    var waBtn = el("a", { class: "text-link pd-link", target: "_blank", rel: "noopener", text: "Ask on WhatsApp" });
    var status = el("p", { class: "ticket-status", "aria-live": "polite" });
    var trust = el("ul", { class: "pd-trust" }, [
      el("li", { html: '<i class="fa-solid fa-circle-check" aria-hidden="true"></i><span class="slug">Proof before print</span>' }),
      el("li", { class: "pd-trust-pay" }, [el("i", { class: "fa-solid fa-lock", "aria-hidden": "true" }), el("span", { class: "slug", text: "Secure payment" }),
        el("span", { class: "pd-cards", html: '<i class="fa-brands fa-cc-visa" aria-hidden="true"></i><i class="fa-brands fa-cc-mastercard" aria-hidden="true"></i><i class="fa-brands fa-cc-amex" aria-hidden="true"></i>' }),
        el("img", { src: "assets/img/pay/payhere.png", alt: "PayHere", width: "500", height: "200", class: "pd-payhere" })]),
      el("li", { html: '<i class="fa-solid fa-calendar-check" aria-hidden="true"></i><span class="slug">Pay later with Koko &amp; Mintpay</span>' })
    ]);
    var ticket = el("aside", { class: "ticket pd-ticket", id: "pdTicket", "aria-label": "Your order summary" }, [
      el("div", { class: "ticket-head" }, [el("span", { class: "ticket-title", text: "Job ticket" }), el("span", { class: "slug", text: p.service })]),
      tRows,
      el("div", { class: "ticket-price pd-price" }, [el("span", { class: "slug", text: "Total" }), el("span", { class: "pd-price-r" }, [priceEl, unitEl])]),
      el("p", { class: "pd-sample slug", text: "Sample prices — final price confirmed with your proof" }),
      el("ul", { class: "bnpl" }, [kokoRow, mintRow]),
      delivBox, readyEl,
      el("div", { class: "ticket-actions" }, [cartBtn, buyBtn]),
      el("p", { class: "pd-or slug", text: "or" }),
      el("p", { class: "pd-links" }, [quoteBtn, waBtn]),
      status, trust,
      stamp
    ]);

    function readyDate() {
      var d = new Date(), n = express && p.days > 2 ? 2 : p.days;
      while (n > 0) { d.setDate(d.getDate() + 1); if (d.getDay() !== 0) n--; }
      return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }).replace(",", "");
    }
    function current() {
      var r = MP.price(p, chosen, qty), t = r.total, unit = r.unit;
      if (express && p.days > 2) { t = Math.round(t * 1.25); unit = Math.round(t / qty); }
      return { total: t, unit: unit };
    }
    function item() {
      var c = current();
      var opts = JSON.parse(JSON.stringify(chosen));
      if (express && p.days > 2) opts.Turnaround = "Express (1–2 days)";
      var it = { slug: p.slug, name: p.name, img: p.img, options: opts, qty: qty, unit: c.unit, total: c.total,
        artwork: artMode === "upload" ? (artFile || "file to follow") : artMode === "design" ? "design requested" : "to follow on WhatsApp",
        notes: notes.value.trim(), express: !!(express && p.days > 2), ready: readyDate() };
      if (pName && (pName.value.trim() || (pMsg && pMsg.value.trim()))) it.personal = { name: pName.value.trim(), message: pMsg ? pMsg.value.trim() : "" };
      return it;
    }
    function update() {
      var c = current(), third = Math.ceil(c.total / 3);
      priceEl.textContent = MP.money(c.total);
      unitEl.textContent = MP.money(c.unit) + " per unit";
      kokoLine.textContent = "or 3 × " + MP.money(third) + " with";
      mintLine.textContent = "or 3 interest-free payments of " + MP.money(third) + " with";
      qPrices.forEach(function (q) { q[1].textContent = MP.money(MP.price(p, chosen, q[0]).total); });
      readyEl.textContent = "";
      readyEl.appendChild(el("span", { class: "slug", text: "Ready by" }));
      readyEl.appendChild(document.createTextNode(" " + readyDate()));
      tRows.textContent = "";
      var it = item();
      var rows = Object.keys(chosen).map(function (k) { return [k, chosen[k]]; });
      rows.push(["Quantity", String(qty)]);
      rows.push(["Artwork", it.artwork]);
      if (it.personal && it.personal.name) rows.push(["Print text", it.personal.name]);
      rows.forEach(function (r) { tRows.appendChild(el("dt", { text: r[0] })); tRows.appendChild(el("dd", { text: r[1] })); });
      var msg = "Hi Majestic Print, I'd like to order:\n\n" + MP.quote.describe(it) + "\nTotal (sample price): " + MP.money(c.total);
      if (it.personal) msg += "\nPrint text: " + it.personal.name + (it.personal.message ? "\nInside message: " + it.personal.message : "");
      waBtn.href = MP.waLink(msg);
      var tot = $("#pdBarTotal"); if (tot) tot.textContent = MP.money(c.total);
    }
    function addToCart() { MP.cart.add(item()); }
    cartBtn.addEventListener("click", function () {
      addToCart();
      ticket.classList.remove("is-added"); void ticket.offsetWidth; ticket.classList.add("is-added");
      status.textContent = "";
      status.appendChild(el("strong", { text: "Added to cart" }));
      status.appendChild(document.createTextNode("  ·  "));
      status.appendChild(el("a", { class: "text-link", href: "cart.html", text: "View cart" }));
      status.appendChild(document.createTextNode("  ·  "));
      status.appendChild(el("a", { class: "text-link", href: "checkout.html", text: "Checkout" }));
      MP.openCart();
    });
    buyBtn.addEventListener("click", function () { addToCart(); window.location.href = "checkout.html"; });
    quoteBtn.addEventListener("click", function () {
      var it = item(); MP.quote.add({ slug: it.slug, name: it.name, options: it.options, qty: it.qty, artwork: it.artwork, notes: it.notes });
      status.textContent = "";
      status.appendChild(document.createTextNode("Added to quote list. "));
      status.appendChild(el("a", { class: "text-link", href: "contact.html#quote", text: "View quote list (" + MP.quote.list().length + ")" }));
    });
    update();

    /* Mobile sticky buy bar */
    var bar = el("div", { class: "pd-bar", id: "pdBar", hidden: "" }, [
      el("div", null, [el("span", { class: "slug", text: "Total" }), el("strong", { id: "pdBarTotal" })]),
      el("button", { type: "button", class: "btn-mp btn-mp-primary", html: '<i class="fa-solid fa-cart-shopping" aria-hidden="true"></i> Add to cart' })
    ]);
    bar.querySelector("button").addEventListener("click", function () { cartBtn.click(); ticket.scrollIntoView({ behavior: "smooth", block: "center" }); });
    document.body.appendChild(bar);
    update();
    function barCheck() {
      var narrow = window.innerWidth < 992, r = ticket.getBoundingClientRect();
      var show = narrow && (r.bottom < 0 || r.top > window.innerHeight);
      bar.hidden = !show;
      document.body.classList.toggle("has-pd-bar", show);
    }
    window.addEventListener("scroll", barCheck, { passive: true });
    window.addEventListener("resize", barCheck);
    barCheck();

    var plate = el("p", { class: "pd-plate", style: "--ink:" + inkHex }, [el("span", { text: cat.title }), document.createTextNode("  ·  " + p.service)]);
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
    D.catalogue.filter(function (x) { return x.cat === p.cat && x.slug !== p.slug; }).slice(0, 3).forEach(function (x) {
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
        el("div", { class: "section-head" }, [el("p", { class: "kicker", text: "Also in " + cat.title }), el("h2", { text: "You might also need" })]),
        related
      ])
    ]));
  };

  /* ============================================================== SOLUTIONS */
  P.solutions = function (MP) {
    var el = MP.el;
    MP.pageHead({ kicker: "What we do", title: "Twelve ways to make it", crumbs: [["Services"]], ink: MP.ink("magenta"),
      lead: "From traditional printing to advanced digital production, signage, packaging and promotional solutions — Majestic Print Solutions brings everything together under one roof." });
    var index = el("ol", { class: "cap-index", id: "capIndexS" });
    var proof = el("aside", { class: "cap-proof", id: "capProofS", "aria-live": "polite" }, [
      el("figure", { class: "print-frame cap-photo" }, [el("img", { src: "", alt: "", width: "1600", height: "1067" }), el("figcaption", { class: "slug cp-slug" })]),
      el("div", { class: "cap-copy" }, [
        el("span", { class: "cp-icon", "aria-hidden": "true" }),
        el("p", { class: "slug cp-tagline" }),
        el("h3", { class: "cp-name" }), el("p", { class: "cp-text" }), el("p", { class: "cap-outputs cp-outputs" }),
        el("div", { class: "cap-actions" }, [el("a", { class: "btn-mp btn-mp-primary cp-cta", href: "#" })])
      ])
    ]);
    MP.$("#pageBody").appendChild(el("section", { class: "section section-tight" }, [
      el("div", { class: "container-xl" }, [el("div", { class: "cap-layout" }, [index, proof])])
    ]));
    initCapIndex(MP, index, proof, window.matchMedia("(max-width: 991px)"), true);

    // Brand guide closing statement
    MP.$("#pageBody").appendChild(el("section", { class: "statement-band" }, [
      el("div", { class: "container-xl" }, [
        el("p", { class: "slug", text: "One partner. Every printing solution." }),
        el("ul", { class: "statement-lines" }, MP.D.statement.map(function (t, i) {
          return el("li", { style: "--ink:" + MP.ink(["bright", "magenta", "orange", "gold"][i]), text: t });
        }))
      ])
    ]));

    // Print / Pack / Promote map
    var groups = [
      ["Paper printing", "bright", ["Offset Printing", "Digital Offset Printing", "Digital Printing"]],
      ["Signs & large format", "magenta", ["Large Format Printing", "Signage & 3D Signage", "Vehicle Branding", "UV Printing"]],
      ["Cutting & engraving", "orange", ["CNC Cutting & Engraving", "Laser Cutting & Engraving"]],
      ["Packaging & gifts", "gold", ["Packaging & Branding", "Sublimation Printing", "Promotional & Corporate Gifts"]]
    ];
    MP.$("#pageBody").appendChild(el("section", { class: "section section-tint" }, [
      el("div", { class: "container-xl" }, [
        el("div", { class: "section-head" }, [el("p", { class: "kicker", text: "By type" }), el("h2", { text: "Services at a glance" })]),
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
    MP.pageHead({ kicker: s.tagline, title: s.name, crumbs: [["Services", "services.html"], [s.name]], ink: inkHex, lead: s.text, icon: (window.MP_ICONS || {})[s.name] });

    var outputs = s.items;
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
            el("p", { class: "kicker", text: s.itemsLabel }),
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
      ["Printing", "bright", "Visiting cards, stationery, marketing print and publications — offset for volume, digital for speed."],
      ["Packaging", "gold", "Printed boxes, sleeves, bags and labels that make a product ready for the shelf."],
      ["Signage & branding", "magenta", "Signs, vehicle graphics, large format and branded gifts that keep a name in sight."]
    ];
    body.appendChild(el("section", { class: "section section-tint" }, [el("div", { class: "container-xl" }, [
      el("div", { class: "section-head" }, [el("p", { class: "kicker", text: "What we do" }), el("h2", { text: "Everything under one roof" }),
        el("p", { text: "Printing, packaging and signage from one team, so your brand looks the same everywhere it appears." })]),
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
