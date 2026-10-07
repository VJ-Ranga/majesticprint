/*
 * Majestic Print — homepage demo content.
 * Edit this file to change products, services, occasions and contacts.
 * Items marked "waitingOnClient" are placeholders until Majestic confirms them.
 * Photos in assets/img/photos are temporary stock images (see CREDITS.md).
 */
window.MP_DATA = {
  contact: {
    // WAITING ON CLIENT: real WhatsApp number (international format, digits only)
    whatsapp: "94000000000",
    phoneDisplay: "+94 00 000 0000",
    email: "hello@majesticprint.lk",
    // Observed on the legacy site; confirm before launch
    address: "95, Negombo Road, Pannala",
    hours: "Mon–Sat · hours to confirm",
    waitingOnClient: true
  },

  // Brand inks from the guide
  inks: {
    deep:    { name: "Deep Blue",   hex: "#13477A" },
    bright:  { name: "Bright Blue", hex: "#007CAC" },
    magenta: { name: "Magenta",     hex: "#D01C60" },
    orange:  { name: "Orange",      hex: "#CF6428" },
    gold:    { name: "Gold",        hex: "#EAA123" }
  },

  // Print / Pack / Promote — each printed as a duotone in its own ink
  routes: [
    { id: "print",   title: "Print",   ink: "bright",  img: "assets/img/photos/flyers.jpg",
      text: "Cards, brochures, labels and calendars — everything your business hands out.",
      items: ["Business cards", "Brochures", "Letterheads", "Calendars"], target: "#products", filter: "Print" },
    { id: "pack",    title: "Pack",    ink: "gold",    img: "assets/img/photos/boxes.jpg",
      text: "Boxes, bags, sleeves and stickers that make a product shelf-ready.",
      items: ["Custom boxes", "Paper bags", "Sleeves", "Labels"], target: "#products", filter: "Pack" },
    { id: "promote", title: "Promote", ink: "magenta", img: "assets/img/photos/signage.jpg",
      text: "Signs, vehicle graphics and branded gifts that keep your name in sight.",
      items: ["Shop signs", "Vehicle wraps", "Corporate gifts", "Apparel"], target: "#solutions" }
  ],

  // Launch products as spec sheets. Specs are typical options — confirm against the rate card.
  products: [
    { name: "Business cards",     img: "assets/img/photos/business-cards.jpg", route: "Print",   service: "Offset Printing",
      specs: { Size: "90 × 55 mm", Stock: "350–400 gsm", Finish: "Matt · gloss · spot UV", From: "100 cards" } },
    { name: "Flyers & brochures", img: "assets/img/photos/flyers.jpg",         route: "Print",   service: "Digital Printing",
      specs: { Size: "A6 – A4", Stock: "130–170 gsm", Finish: "Flat or folded", From: "50 copies" } },
    { name: "Product labels",     img: "assets/img/photos/labels.jpg",         route: "Pack",    service: "Packaging & Branding",
      specs: { Size: "Any shape", Stock: "Paper · PVC", Finish: "Rolls or sheets", From: "100 labels" } },
    { name: "Custom boxes",       img: "assets/img/photos/boxes.jpg",          route: "Pack",    service: "Packaging & Branding",
      specs: { Size: "Made to fit", Stock: "Board · kraft", Finish: "Mailer · tuck-end · rigid", From: "Quote" } },
    { name: "Personalised mugs",  img: "assets/img/photos/mug.jpg",            route: "Promote", service: "Sublimation Printing",
      specs: { Size: "11 oz", Stock: "Ceramic", Finish: "Full-colour wrap", From: "1 mug" } },
    { name: "Printed T-shirts",   img: "assets/img/photos/tshirt.jpg",         route: "Promote", service: "Sublimation Printing",
      specs: { Size: "S – XXL", Stock: "Cotton · poly", Finish: "Screen or sublimation", From: "1 shirt" } }
  ],

  // All 12 service families from the brand guide — the capability index
  services: [
    { name: "Offset Printing",           ink: "deep",    img: "assets/img/photos/svc-offset.jpg",
      text: "High-volume print with consistent colour, run after run.",
      outputs: "Business cards · brochures · NCR books · diaries · calendars" },
    { name: "Digital Offset Printing",   ink: "deep",    img: "assets/img/photos/svc-digital-offset.jpg",
      text: "Offset-quality short runs when you need hundreds, not thousands.",
      outputs: "Short-run stationery · invitations · booklets" },
    { name: "Digital Printing",          ink: "bright",  img: "assets/img/photos/svc-digital.jpg",
      text: "Fast, flexible print for posters, stickers, cut-outs and photos.",
      outputs: "Posters · PVC stickers · cut-outs · photo prints" },
    { name: "UV Printing",               ink: "bright",  img: "assets/img/photos/svc-uv.jpg",
      text: "Print straight onto acrylic, wood, glass, metal and finished objects.",
      outputs: "Acrylic plaques · foam board · glass · promotional items" },
    { name: "Large Format Printing",     ink: "magenta", img: "assets/img/photos/svc-large-format.jpg",
      text: "Banners, backdrops and wall graphics, printed big and sharp.",
      outputs: "Hoardings · event backdrops · wallpapers · displays" },
    { name: "Signage & 3D Signage",      ink: "magenta", img: "assets/img/photos/svc-signage.jpg",
      text: "Shop fronts, light boxes and raised letters that get noticed.",
      outputs: "3D letters · LED signs · light boxes · directional signs" },
    { name: "CNC Cutting & Engraving",   ink: "orange",  img: "assets/img/photos/svc-cnc.jpg",
      text: "Precise cutting in acrylic and wood for panels, letters and shapes.",
      outputs: "Partitions · 3D letters · panels · architectural details" },
    { name: "Laser Cutting & Engraving", ink: "orange",  img: "assets/img/photos/laser.jpg",
      text: "Fine detail for gifts, name boards and wedding pieces.",
      outputs: "Name boards · wood decor · acrylic gifts · wedding items" },
    { name: "Sublimation Printing",      ink: "gold",    img: "assets/img/photos/svc-sublimation.jpg",
      text: "Full-colour images on mugs, shirts, crystal and granite.",
      outputs: "Mugs · T-shirts · crystal · granite" },
    { name: "Vehicle Branding",          ink: "gold",    img: "assets/img/photos/svc-vehicle.jpg",
      text: "Full or partial wraps that turn every trip into advertising.",
      outputs: "Full wraps · door graphics · fleet stickers" },
    { name: "Packaging & Branding",      ink: "deep",    img: "assets/img/photos/svc-packaging.jpg",
      text: "Boxes, bags and labels designed around your product.",
      outputs: "Boxes · paper bags · sleeves · tags" },
    { name: "Promotional & Corporate Gifts", ink: "magenta", img: "assets/img/photos/svc-gifts.jpg",
      text: "Branded diaries, pens, umbrellas and gift sets, in any quantity.",
      outputs: "Diaries · pens · umbrellas · gift sets" }
  ],

  // Showcase — SAMPLE stock images until customer-approved projects are supplied
  showcase: [
    { title: "Illuminated 3D lettering", service: "Signage & 3D Signage",        img: "assets/img/photos/svc-signage.jpg", size: "large" },
    { title: "Engraved keepsakes",     service: "Laser Cutting & Engraving",     img: "assets/img/photos/laser.jpg" },
    { title: "Corporate gift sets",    service: "Promotional & Corporate Gifts", img: "assets/img/photos/gifts.jpg" }
  ],

  // The Sri Lankan print calendar. start/span are months (1 = Jan). Dates vary by year.
  occasions: [
    { id: "avurudu",   label: "Avurudu",          when: "April",               start: 4,  span: 1,  row: 1, ink: "orange",  img: "assets/img/photos/occ-avurudu.jpg",
      ideas: ["Greeting cards", "Branded calendars", "Gift boxes", "Staff T-shirts"] },
    { id: "vesak",     label: "Vesak",            when: "May",                 start: 5,  span: 1,  row: 2, ink: "gold",    img: "assets/img/photos/occ-vesak.jpg",
      ideas: ["Lantern prints", "Dansal banners", "Event backdrops", "Greeting cards"] },
    { id: "deepavali", label: "Deepavali",        when: "October – November",  start: 10, span: 2,  row: 1, ink: "magenta", img: "assets/img/photos/occ-deepavali.jpg",
      ideas: ["Greeting cards", "Gift boxes", "Sweet-box sleeves", "Shop banners"] },
    { id: "corporate", label: "Year-end gifting", when: "November – December", start: 11, span: 2,  row: 2, ink: "bright",  img: "assets/img/photos/occ-corporate.jpg",
      ideas: ["Desk diaries", "Engraved pens", "Gift sets", "Desk calendars"] },
    { id: "christmas", label: "Christmas",        when: "December",            start: 12, span: 1,  row: 3, ink: "deep",    img: "assets/img/photos/occ-christmas.jpg",
      ideas: ["Christmas cards", "Gift wrap & tags", "Photo mugs", "Hamper sleeves"] },
    { id: "weddings",  label: "Weddings",         when: "All year",            start: 1,  span: 12, row: 4, ink: "magenta", img: "assets/img/photos/occ-wedding.jpg",
      ideas: ["Invitations", "Laser-cut name boards", "Welcome signs", "Thank-you tags"] }
  ],

  // Ordering process — real sequence, so it is numbered
  steps: [
    { title: "Choose or describe", text: "Pick a product, or tell us what you have in mind." },
    { title: "Send your artwork",  text: "Upload your file, or ask our team to design it." },
    { title: "Approve your proof", text: "Check a proof before anything is printed.", stamp: true },
    { title: "Print and deliver",  text: "We produce it and deliver, or you collect in Pannala." }
  ]
};
