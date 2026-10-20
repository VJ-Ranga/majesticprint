/* Majestic Print — checkout, simulated gateways and order confirmation (UI demo only).
   Nothing here is sent anywhere. Card/OTP fields are never stored. */
(function () {
  "use strict";
  window.MP_PAGES = window.MP_PAGES || {};
  var P = window.MP_PAGES;
  var KEY = "mp-last-order";
  var COURIER = 450, FREE_OVER = 15000;
  var DISTRICTS = ["Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"];
  var METHODS = { card: "Card payment (PayHere)", koko: "Koko", mintpay: "Mintpay", bank: "Bank transfer", cod: "Pay on collection / delivery" };
  var BANK = [["Bank", "Sample Bank PLC"], ["A/C name", "Majestic Print Solutions"], ["A/C no", "0000 0000 0000 (sample)"]];

  function getOrder() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
  function saveOrder(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  function third(total) { return Math.ceil(total / 3); }
  function optText(o) { return Object.keys(o || {}).map(function (k) { return o[k]; }).join(" · "); }
  function mount(MP, node) { var b = MP.$("#pageBody"); b.textContent = ""; b.appendChild(node); }
  function icon(c) { var i = document.createElement("i"); i.className = c; i.setAttribute("aria-hidden", "true"); return i; }
  function img(MP, src, alt, cls) { return MP.el("img", { src: src, alt: alt || "", class: cls || "" }); }
  function fmtDate(d) { return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }); }
  function banner(MP) {
    return MP.el("div", { class: "gw-demo", role: "note", text: "DEMO — simulated payment page. Do not enter real card details." });
  }
  // Redirect helper for gateway pages: no order -> back to checkout
  function needOrder(MP) {
    var o = getOrder();
    if (!o || !o.items || !o.items.length) { location.replace("checkout.html"); return null; }
    return o;
  }
  function finish(o, status) { o.status = status; o.paid = true; saveOrder(o); location.href = "order.html"; }
  function field(MP, id, label, attrs, hint) {
    var a = { id: id, class: "form-control" }; for (var k in attrs) a[k] = attrs[k];
    return MP.el("div", { class: "co-field" }, [
      MP.el("label", { for: id, class: "slug", text: label }),
      MP.el("input", a),
      hint ? MP.el("small", { class: "co-hint", id: id + "-h", text: hint }) : null,
      MP.el("small", { class: "co-err", id: id + "-e", role: "alert" })
    ]);
  }
  function setErr(id, msg) {
    var inp = document.getElementById(id), e = document.getElementById(id + "-e");
    if (e) e.textContent = msg || "";
    if (inp) { if (msg) { inp.classList.add("is-invalid"); inp.setAttribute("aria-invalid", "true"); } else { inp.classList.remove("is-invalid"); inp.removeAttribute("aria-invalid"); } }
    return !msg;
  }
  function sched(total) {
    var t = third(total);
    return [["Today", t], ["In 1 month", t], ["In 2 months", Math.max(0, total - 2 * t)]];
  }
  function schedTable(MP, total, cls) {
    var tb = MP.el("table", { class: "gw-sched " + (cls || "") });
    sched(total).forEach(function (r) { tb.appendChild(MP.el("tr", null, [MP.el("th", { scope: "row", text: r[0] }), MP.el("td", { text: MP.money(r[1]) })])); });
    return tb;
  }
  function otpFlow(MP, o, opts) {
    // mobile + OTP, demo only; returns node. opts.onDone() when confirmed
    var wrap = MP.el("div", { class: "gw-otp" });
    var mob = field(MP, "gwMob", "Mobile number", { type: "tel", inputmode: "tel", autocomplete: "off", value: (o.customer && o.customer.mobile) || "", placeholder: "07X XXX XXXX" });
    var send = MP.el("button", { type: "button", class: "gw-btn", text: "Send OTP" });
    var otpBox = MP.el("div", { hidden: "" });
    var otp = field(MP, "gwOtp", "6-digit OTP", { type: "text", inputmode: "numeric", maxlength: "6", autocomplete: "off", placeholder: "••••••" }, "Demo OTP: 123456 (any 6 digits work)");
    var ok = MP.el("button", { type: "button", class: "gw-btn gw-btn-main", text: opts.confirmLabel });
    otpBox.appendChild(otp); otpBox.appendChild(ok);
    wrap.appendChild(mob); wrap.appendChild(send); wrap.appendChild(otpBox);
    send.addEventListener("click", function () {
      var v = document.getElementById("gwMob").value.replace(/\D/g, "");
      if (!/^0?7\d{8}$/.test(v)) return setErr("gwMob", "Enter a valid mobile number, e.g. 077 123 4567.");
      setErr("gwMob", ""); otpBox.hidden = false; send.textContent = "Resend OTP"; document.getElementById("gwOtp").focus();
    });
    ok.addEventListener("click", function () {
      var v = document.getElementById("gwOtp").value.replace(/\D/g, "");
      if (v.length !== 6) return setErr("gwOtp", "Enter the 6-digit OTP.");
      setErr("gwOtp", ""); ok.disabled = true; ok.textContent = "Processing…";
      setTimeout(opts.onDone, 1200);
    });
    return wrap;
  }

  /* ================= CHECKOUT ================= */
  P.checkout = function (MP) {
    var el = MP.el;
    MP.pageHead({ kicker: "Checkout", title: "Checkout", crumbs: [["Shop", "shop.html"], ["Cart", "cart.html"], ["Checkout"]], ink: MP.ink("magenta") });
    var items = MP.cart.list();
    if (!items.length) {
      mount(MP, el("section", { class: "section section-tight" }, [el("div", { class: "container-xl" }, [el("div", { class: "empty-sheet" }, [
        el("p", { class: "slug", text: "Empty" }), el("h3", { text: "Your cart is empty." }),
        el("p", { text: "Add a product from the shop, then come back to check out." }),
        el("a", { class: "btn-mp btn-mp-primary", href: "shop.html", text: "Go to shop" })])])]));
      return;
    }
    var sub = MP.cart.subtotal();
    var state = { delivery: "collect", method: "card" };
    function fee() { return state.delivery === "courier" && sub < FREE_OVER ? COURIER : 0; }
    function total() { return sub + fee(); }

    function step(n, title, body) {
      return el("fieldset", { class: "co-step" }, [
        el("legend", null, [el("span", { class: "co-num", text: String(n) }), el("span", { text: title })])
      ].concat(body));
    }
    function radio(name, val, checked, head, sub2, extra) {
      var id = name + "-" + val;
      var inp = el("input", { type: "radio", name: name, id: id, value: val, class: "co-radio" });
      if (checked) inp.checked = true;
      return el("div", { class: "co-opt" }, [inp,
        el("label", { for: id, class: "co-card" }, [
          el("span", { class: "co-card-main" }, [el("strong", { text: head }), el("span", { class: "co-sub", text: sub2 || "", "data-sub": val })]),
          extra ? el("span", { class: "co-card-logos" }, extra) : null
        ])]);
    }

    /* step 1 */
    var s1 = step(1, "Contact", [
      field(MP, "cName", "Full name *", { type: "text", autocomplete: "name" }),
      field(MP, "cMobile", "Mobile number *", { type: "tel", inputmode: "tel", autocomplete: "tel", placeholder: "07X XXX XXXX" }, "07X XXX XXXX — we send proof and job updates on WhatsApp."),
      field(MP, "cEmail", "Email (optional)", { type: "email", autocomplete: "email" })
    ]);
    /* step 2 */
    var distSel = el("select", { id: "dDistrict", class: "form-select", autocomplete: "address-level1" }, [el("option", { value: "", text: "Select district" })].concat(DISTRICTS.map(function (d) { return el("option", { value: d, text: d }); })));
    var addr = el("div", { class: "co-address", id: "addrBox", hidden: "" }, [
      field(MP, "dAddr", "Address *", { type: "text", autocomplete: "street-address" }),
      field(MP, "dCity", "City *", { type: "text", autocomplete: "address-level2" }),
      el("div", { class: "co-field" }, [el("label", { for: "dDistrict", class: "slug", text: "District *" }), distSel, el("small", { class: "co-err", id: "dDistrict-e", role: "alert" })]),
      field(MP, "dPost", "Postal code (optional)", { type: "text", inputmode: "numeric", autocomplete: "postal-code" })
    ]);
    var s2 = step(2, "Delivery", [
      radio("delivery", "collect", true, "Collect from Pannala", "Free — ready date confirmed with your proof."),
      radio("delivery", "courier", false, "Island-wide courier", "LKR 450 (sample). Free courier over LKR 15,000 (sample)."),
      addr
    ]);
    /* step 3 */
    var cards = [icon("fa-brands fa-cc-visa"), icon("fa-brands fa-cc-mastercard"), icon("fa-brands fa-cc-amex")];
    var s3 = step(3, "Payment method", [
      radio("method", "card", true, "Card payment", "Visa, Mastercard, Amex via PayHere", cards.concat([img(MP, "assets/img/pay/payhere.png", "PayHere", "co-logo")])),
      radio("method", "koko", false, "Koko", "Pay in 3 interest-free instalments", [img(MP, "assets/img/pay/koko.png", "Koko", "co-logo co-logo-koko")]),
      radio("method", "mintpay", false, "Mintpay", "3 interest-free payments over 2 months", [el("span", { class: "co-chip-dark" }, [img(MP, "assets/img/pay/mintpay.png", "Mintpay", "co-logo")])]),
      radio("method", "bank", false, "Bank transfer", "Pay into our account, then upload your slip."),
      radio("method", "cod", false, "Pay on collection", "Pay when you collect your order.")
    ]);
    var bankBox = el("div", { class: "co-bank", id: "bankBox", hidden: "" }, [
      el("p", { class: "slug", text: "Sample bank details" }),
      el("dl", { class: "co-dl" }, BANK.reduce(function (a, r) { return a.concat([el("dt", { text: r[0] }), el("dd", { text: r[1] })]); }, [])),
      el("div", { class: "co-field" }, [el("label", { for: "slip", class: "slug", text: "Payment slip (image or PDF)" }),
        el("input", { type: "file", id: "slip", class: "form-control", accept: "image/*,application/pdf" }),
        el("small", { class: "co-hint", text: "Demo: the file stays on your device and is not uploaded." })])
    ]);
    s3.appendChild(bankBox);
    /* step 4 */
    var s4 = step(4, "Notes and approval", [
      el("div", { class: "co-field" }, [el("label", { for: "cNotes", class: "slug", text: "Notes (optional)" }), el("textarea", { id: "cNotes", class: "form-control", rows: "3" })]),
      el("div", { class: "co-check" }, [el("input", { type: "checkbox", id: "kProof", class: "form-check-input" }), el("label", { for: "kProof", text: "I'll approve a digital proof before printing. *" })]),
      el("small", { class: "co-err", id: "kProof-e", role: "alert" }),
      el("div", { class: "co-check" }, [el("input", { type: "checkbox", id: "kTerms", class: "form-check-input" }), el("label", { for: "kTerms", html: 'I agree to the terms of sale (sample). *' })]),
      el("small", { class: "co-err", id: "kTerms-e", role: "alert" })
    ]);

    /* summary */
    var sum = el("aside", { class: "co-summary", "aria-label": "Order summary" });
    var btn = el("button", { type: "submit", class: "btn-mp btn-mp-accent co-submit" });
    function renderSummary() {
      sum.textContent = "";
      sum.appendChild(el("p", { class: "slug", text: "Order summary" }));
      var ul = el("ul", { class: "co-items" });
      items.forEach(function (it) {
        ul.appendChild(el("li", null, [
          el("img", { src: it.img, alt: "", width: "56", height: "42" }),
          el("div", null, [el("strong", { text: it.name }), el("span", { class: "co-sub", text: optText(it.options) + " · Qty " + it.qty })]),
          el("span", { class: "co-line", text: MP.money(it.total) })
        ]));
      });
      sum.appendChild(ul);
      var f = fee();
      sum.appendChild(el("dl", { class: "co-totals" }, [
        el("dt", { text: "Subtotal" }), el("dd", { text: MP.money(sub) }),
        el("dt", { text: "Delivery" }), el("dd", { text: state.delivery === "collect" ? "Free (collect)" : (f ? MP.money(f) : "Free") }),
        el("dt", { class: "co-total", text: "Total" }), el("dd", { class: "co-total", text: MP.money(total()) })
      ]));
      if (state.method === "koko" || state.method === "mintpay") {
        sum.appendChild(el("div", { class: "co-inst" }, [el("p", { class: "slug", text: "Instalments — " + (state.method === "koko" ? "Koko" : "Mintpay") }), schedTable(MP, total(), "co-sched")]));
      }
      var label = { card: "Pay " + MP.money(total()) + " with PayHere", koko: "Continue to Koko", mintpay: "Continue to Mintpay", bank: "Place order", cod: "Place order" }[state.method];
      btn.textContent = label; sum.appendChild(btn);
      sum.appendChild(el("p", { class: "co-fine", text: "Demo checkout — payments are simulated and nothing is sent." }));
    }
    function refresh() {
      var cod = document.getElementById("method-cod");
      var lbl = cod && cod.parentNode.querySelector("strong");
      var sb = cod && cod.parentNode.querySelector("[data-sub]");
      if (lbl) lbl.textContent = state.delivery === "courier" ? "Cash on delivery" : "Pay on collection";
      if (sb) sb.textContent = state.delivery === "courier" ? "Pay the courier when your order arrives." : "Pay when you collect your order.";
      var t = third(total());
      var ks = document.querySelector('[data-sub="koko"]'), ms = document.querySelector('[data-sub="mintpay"]');
      if (ks) ks.textContent = "Pay in 3 interest-free instalments — 3 × " + MP.money(t) + " (first today)";
      if (ms) ms.textContent = "3 interest-free payments over 2 months — 3 × " + MP.money(t);
      document.getElementById("addrBox").hidden = state.delivery !== "courier";
      bankBox.hidden = state.method !== "bank";
      renderSummary();
    }

    mount(MP, el("section", { class: "section section-tight" }, [el("div", { class: "container-xl" }, [
      el("form", { id: "coForm", class: "co-layout", novalidate: "" }, [el("div", { class: "co-steps" }, [s1, s2, s3, s4]), sum])
    ])]));
    var fm = document.getElementById("coForm");
    fm.addEventListener("change", function (e) {
      if (e.target.name === "delivery") state.delivery = e.target.value;
      if (e.target.name === "method") state.method = e.target.value;
      refresh();
    });
    refresh();

    fm.addEventListener("submit", function (e) {
      e.preventDefault();
      var bad = [];
      function chk(id, ok, msg) { if (!setErr(id, ok ? "" : msg)) bad.push(id); }
      var v = function (id) { return document.getElementById(id).value.trim(); };
      chk("cName", v("cName").length >= 2, "Please enter your full name.");
      chk("cMobile", /^(\+?94|0)?7\d{8}$/.test(v("cMobile").replace(/[\s-]/g, "")), "Enter a valid Sri Lankan mobile number, e.g. 077 123 4567.");
      chk("cEmail", !v("cEmail") || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v("cEmail")), "Enter a valid email address or leave it blank.");
      if (state.delivery === "courier") {
        chk("dAddr", v("dAddr").length >= 4, "Please enter your delivery address.");
        chk("dCity", v("dCity").length >= 2, "Please enter your city.");
        chk("dDistrict", !!distSel.value, "Please choose your district.");
      }
      chk("kProof", document.getElementById("kProof").checked, "Please confirm you will approve a proof.");
      chk("kTerms", document.getElementById("kTerms").checked, "Please accept the terms to continue.");
      if (bad.length) { document.getElementById(bad[0]).focus(); return; }
      var id = "MP-26-" + ("00000" + Math.floor(Math.random() * 100000)).slice(-5);
      var order = {
        id: id, date: new Date().toISOString(),
        customer: { name: v("cName"), mobile: v("cMobile"), email: v("cEmail"), notes: v("cNotes") },
        delivery: state.delivery === "courier"
          ? { type: "courier", address: v("dAddr"), city: v("dCity"), district: distSel.value, postal: v("dPost") }
          : { type: "collect" },
        method: state.method,
        slip: state.method === "bank" && document.getElementById("slip").files.length ? document.getElementById("slip").files[0].name : "",
        items: items, subtotal: sub, deliveryFee: fee(), total: total(),
        status: state.method === "bank" ? "Awaiting bank transfer" : state.method === "cod" ? (state.delivery === "courier" ? "Pay on delivery" : "Pay on collection") : "Pending payment"
      };
      saveOrder(order);
      location.href = { card: "pay-payhere.html", koko: "pay-koko.html", mintpay: "pay-mintpay.html" }[state.method] || "order.html";
    });
  };

  /* ================= PAYHERE ================= */
  P.payhere = function (MP) {
    var el = MP.el, o = needOrder(MP); if (!o) return;
    document.title = "PayHere — Majestic Print Solutions (demo)";
    var disabled = ["eZ Cash", "mCash", "Genie", "Internet banking"].map(function (n) { return el("li", { class: "ph-method is-off", "aria-disabled": "true" }, [el("span", { text: n }), el("em", { text: "demo" })]); });
    var form = el("form", { class: "ph-form", novalidate: "", autocomplete: "off" }, [
      field(MP, "phName", "Name on card", { type: "text", autocomplete: "off" }),
      field(MP, "phNum", "Card number", { type: "text", inputmode: "numeric", autocomplete: "off", maxlength: "19", placeholder: "1234 5678 9012 3456" }, "Use test card 4111 1111 1111 1111, any future date, any CVV."),
      el("div", { class: "ph-row" }, [
        field(MP, "phExp", "Expiry (MM/YY)", { type: "text", inputmode: "numeric", autocomplete: "off", maxlength: "5", placeholder: "MM/YY" }),
        field(MP, "phCvv", "CVV", { type: "password", inputmode: "numeric", autocomplete: "off", maxlength: "4", placeholder: "•••" })
      ]),
      el("button", { type: "submit", class: "gw-btn gw-btn-main ph-pay", id: "phPay", text: "Pay " + MP.money(o.total) })
    ]);
    var box = el("div", { class: "gw-box" }, [
      el("div", { class: "ph-head" }, [img(MP, "assets/img/pay/payhere-white.png", "PayHere", "gw-logo"), el("span", { text: "Checkout" })]),
      el("div", { class: "ph-summary" }, [
        el("div", null, [el("small", { text: "Merchant" }), el("strong", { text: "Majestic Print Solutions" })]),
        el("div", null, [el("small", { text: "Order" }), el("strong", { text: o.id })]),
        el("div", null, [el("small", { text: "Amount" }), el("strong", { text: MP.money(o.total) })])
      ]),
      el("div", { class: "ph-body" }, [
        el("ul", { class: "ph-methods" }, [el("li", { class: "ph-method is-on" }, [el("span", { text: "Card" }), el("span", { class: "ph-cards" }, [icon("fa-brands fa-cc-visa"), icon("fa-brands fa-cc-mastercard"), icon("fa-brands fa-cc-amex")])])].concat(disabled)),
        form
      ]),
      el("div", { class: "gw-foot" }, [el("a", { href: "checkout.html", text: "Cancel and return to merchant" }), el("span", null, [document.createTextNode("Secured by "), img(MP, "assets/img/pay/payhere.png", "PayHere", "gw-foot-logo")])])
    ]);
    mount(MP, el("div", null, [banner(MP), el("div", { class: "gw-wrap" }, [box])]));
    var num = document.getElementById("phNum"), exp = document.getElementById("phExp");
    num.addEventListener("input", function () { num.value = num.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim(); });
    exp.addEventListener("input", function () { var d = exp.value.replace(/\D/g, "").slice(0, 4); exp.value = d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d; });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var bad = [];
      function chk(id, ok, msg) { if (!setErr(id, ok ? "" : msg)) bad.push(id); }
      chk("phName", document.getElementById("phName").value.trim().length > 1, "Enter the name on the card.");
      chk("phNum", num.value.replace(/\s/g, "") === "4111111111111111", "Demo accepts only the test card 4111 1111 1111 1111.");
      var m = /^(\d\d)\/(\d\d)$/.exec(exp.value), now = new Date(), okExp = false;
      if (m) { var mm = +m[1], yy = 2000 + +m[2]; okExp = mm >= 1 && mm <= 12 && (yy > now.getFullYear() || (yy === now.getFullYear() && mm >= now.getMonth() + 1)); }
      chk("phExp", okExp, "Enter a valid future date (MM/YY).");
      chk("phCvv", /^\d{3,4}$/.test(document.getElementById("phCvv").value), "Enter the 3 or 4 digit CVV.");
      if (bad.length) return document.getElementById(bad[0]).focus();
      var b = document.getElementById("phPay"); b.disabled = true; b.textContent = "Processing…";
      num.value = ""; document.getElementById("phCvv").value = "";
      setTimeout(function () { finish(o, "Paid — PayHere (demo)"); }, 1500);
    });
  };

  /* ================= KOKO ================= */
  P.koko = function (MP) {
    var el = MP.el, o = needOrder(MP); if (!o) return;
    document.title = "Koko — Majestic Print Solutions (demo)";
    var t = third(o.total);
    var box = el("div", { class: "gw-box kk-box" }, [
      el("div", { class: "kk-head" }, [el("span", { class: "kk-logo" }, [img(MP, "assets/img/pay/koko.png", "Koko", "")]), el("span", { text: "Buy now, pay later" })]),
      el("div", { class: "kk-body" }, [
        el("p", { class: "kk-merchant", text: "Majestic Print Solutions · " + o.id }),
        el("p", { class: "kk-amount", text: MP.money(o.total) }),
        el("p", { class: "kk-plan", text: "3 × " + MP.money(t) + " — interest free" }),
        schedTable(MP, o.total, "kk-sched"),
        otpFlow(MP, o, { confirmLabel: "Confirm and pay " + MP.money(t) + " today", onDone: function () { finish(o, "1st instalment paid — Koko (demo)"); } })
      ]),
      el("div", { class: "gw-foot" }, [el("a", { href: "checkout.html", text: "Cancel and return to merchant" })])
    ]);
    mount(MP, el("div", null, [banner(MP), el("div", { class: "gw-wrap" }, [box])]));
  };

  /* ================= MINTPAY ================= */
  P.mintpay = function (MP) {
    var el = MP.el, o = needOrder(MP); if (!o) return;
    document.title = "Mintpay — Majestic Print Solutions (demo)";
    var t = third(o.total), mode = "later";
    var sch = el("div", { id: "mpSched" });
    function opt(val, head, sub, on) {
      var id = "mp-" + val, i = el("input", { type: "radio", name: "mpmode", id: id, value: val });
      if (on) i.checked = true;
      return el("div", { class: "mp-opt" }, [i, el("label", { for: id }, [el("strong", { text: head }), el("span", { text: sub })])]);
    }
    var confirmBox = el("div", { id: "mpConfirm" });
    function build() {
      sch.textContent = "";
      if (mode === "later") sch.appendChild(schedTable(MP, o.total, "mt-sched"));
      else sch.appendChild(el("p", { class: "mt-now", text: "You pay the full " + MP.money(o.total) + " today." }));
      confirmBox.textContent = "";
      confirmBox.appendChild(otpFlow(MP, o, { confirmLabel: mode === "later" ? "Confirm — pay " + MP.money(t) + " today" : "Confirm — pay " + MP.money(o.total), onDone: function () { finish(o, mode === "later" ? "Mintpay — 1 of 3 paid (demo)" : "Paid — Mintpay (demo)"); } }));
    }
    var box = el("div", { class: "gw-box mt-box" }, [
      el("div", { class: "mt-head" }, [img(MP, "assets/img/pay/mintpay.png", "Mintpay", "gw-logo")]),
      el("div", { class: "mt-body" }, [
        el("p", { class: "mt-merchant", text: "Majestic Print Solutions · " + o.id }),
        el("p", { class: "mt-amount", text: MP.money(o.total) }),
        el("div", { class: "mp-opts" }, [opt("later", "Pay later", "3 interest-free payments over 2 months", true), opt("now", "Pay now", "Pay the full amount today", false)]),
        sch, el("p", { class: "slug mt-login", text: "Log in with your mobile number" }), confirmBox
      ]),
      el("div", { class: "gw-foot" }, [el("a", { href: "checkout.html", text: "Cancel and return to merchant" })])
    ]);
    mount(MP, el("div", null, [banner(MP), el("div", { class: "gw-wrap" }, [box])]));
    box.addEventListener("change", function (e) { if (e.target.name === "mpmode") { mode = e.target.value; build(); } });
    build();
  };

  /* ================= ORDER CONFIRMATION ================= */
  P.order = function (MP) {
    var el = MP.el, o = getOrder();
    MP.pageHead({ kicker: "Order", title: "Order received", crumbs: [["Shop", "shop.html"], ["Order received"]], ink: MP.ink("magenta") });
    if (!o || !o.items) {
      mount(MP, el("section", { class: "section section-tight" }, [el("div", { class: "container-xl" }, [el("div", { class: "empty-sheet" }, [
        el("p", { class: "slug", text: "No order" }), el("h3", { text: "No recent order found." }),
        el("a", { class: "btn-mp btn-mp-primary", href: "shop.html", text: "Go to shop" })])])]));
      return;
    }
    var ready = new Date(o.date); ready.setDate(ready.getDate() + (o.delivery.type === "courier" ? 6 : 4));
    var readyTxt = fmtDate(ready);
    var dTxt = o.delivery.type === "courier" ? "Courier — " + [o.delivery.address, o.delivery.city, o.delivery.district].filter(Boolean).join(", ") : "Collect from Pannala";
    var rows = [["Order", o.id], ["Date", fmtDate(o.date)], ["Customer", o.customer.name + " · " + o.customer.mobile], ["Delivery", dTxt], ["Payment", METHODS[o.method] + " — " + o.status]];
    var items = el("ul", { class: "co-items oc-items" });
    o.items.forEach(function (it) {
      items.appendChild(el("li", null, [el("img", { src: it.img, alt: "", width: "56", height: "42" }),
        el("div", null, [el("strong", { text: it.name }), el("span", { class: "co-sub", text: optText(it.options) + " · Qty " + it.qty })]),
        el("span", { class: "co-line", text: MP.money(it.total) })]));
    });
    var dl = el("dl", { class: "ticket-spec" }); rows.forEach(function (r) { dl.appendChild(el("dt", { text: r[0] })); dl.appendChild(el("dd", { text: r[1] })); });
    var tot = [["Subtotal", MP.money(o.subtotal)], ["Delivery", o.deliveryFee ? MP.money(o.deliveryFee) : "Free"], ["Total", MP.money(o.total)]];
    var td = el("dl", { class: "co-totals" }); tot.forEach(function (r, i) { var c = i === 2 ? "co-total" : ""; td.appendChild(el("dt", { class: c, text: r[0] })); td.appendChild(el("dd", { class: c, text: r[1] })); });
    var ticket = el("div", { class: "ticket oc-ticket" }, [el("p", { class: "slug", text: "Job ticket · " + o.id }), dl, items, td]);
    var steps = [["We check your artwork", "Our team reviews your files for print-readiness."], ["Approve the proof", "We send a digital proof on WhatsApp for your OK."], ["We print", "Your job goes to press after approval."], [o.delivery.type === "courier" ? "Delivered" : "Ready to collect", "Expected by " + readyTxt + " (sample estimate)."]];
    var ol = el("ol", { class: "oc-steps" }); steps.forEach(function (s, i) { ol.appendChild(el("li", null, [el("span", { class: "co-num", text: String(i + 1) }), el("div", null, [el("strong", { text: s[0] }), el("span", { class: "co-sub", text: s[1] })])])); });
    var side = [el("p", { class: "slug", text: "What happens next" }), ol];
    if (o.method === "bank") {
      side.push(el("div", { class: "co-bank" }, [el("p", { class: "slug", text: "Pay by bank transfer (sample details)" }),
        el("dl", { class: "co-dl" }, BANK.reduce(function (a, r) { return a.concat([el("dt", { text: r[0] }), el("dd", { text: r[1] })]); }, [])),
        el("p", { class: "co-sub", text: o.slip ? "Slip selected: " + o.slip + ". Send it on WhatsApp to confirm payment." : "Reminder: upload or send your payment slip on WhatsApp so we can start your job." }),
        el("p", { class: "co-sub", text: "Reference: " + o.id })]));
    }
    var wa = MP.waLink("Hi Majestic Print, my order number is " + o.id + ". Total " + MP.money(o.total) + ".");
    side.push(el("div", { class: "oc-actions" }, [
      el("a", { class: "btn-mp btn-mp-primary", href: "shop.html", text: "Continue shopping" }),
      el("a", { class: "btn-mp btn-mp-outline", href: wa, target: "_blank", rel: "noopener", html: '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Message us on WhatsApp' })]));
    mount(MP, el("section", { class: "section section-tight" }, [el("div", { class: "container-xl" }, [
      el("p", { class: "oc-big", text: "Thank you, " + o.customer.name.split(" ")[0] + "." }),
      el("p", { class: "oc-num" }, [el("span", { class: "slug", text: "Order number" }), el("strong", { text: o.id })]),
      el("div", { class: "oc-grid" }, [ticket, el("div", { class: "oc-next" }, side)])])]));
    MP.cart.clear();
  };
})();
