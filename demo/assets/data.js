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

  // Hero slides after the first (slide 1 is in index.html). lines = headline lines; the last full stop takes the ink.
  heroSlides: [
    { kicker: "Pack", ink: "gold", lines: ["Packaging,", "made to fit."],
      lead: "Mailer, tuck-end and rigid boxes, labels and sleeves — built around your product and printed to sell it.",
      img: "assets/img/photos/svc-packaging.jpg", alt: "Printed retail cartons (sample image)", caption: "Retail cartons · sample image",
      cta: ["Explore packaging", "shop.html?route=Pack"], cta2: ["Plan packaging", "contact.html?service=Packaging%20%26%20Branding#quote"] },
    { kicker: "Promote", ink: "magenta", lines: ["Signs people", "find you by."],
      lead: "3D letters, light boxes, banners and vehicle wraps — designed, made and installed by one team.",
      img: "assets/img/photos/svc-signage.jpg", alt: "Illuminated 3D lettering (sample image)", caption: "3D lettering · sample image",
      cta: ["See signage", "service.html?s=signage-and-3d-signage"], cta2: ["Get a quote", "contact.html?service=Signage%20%26%203D%20Signage#quote"] },
    { kicker: "This season · Oct – Dec", ink: "bright", lines: ["Deepavali &", "year-end gifts."],
      lead: "Desk diaries, engraved pens, gift boxes and greeting cards for clients and staff. Order early — the presses fill up.",
      img: "assets/img/photos/gifts.jpg", alt: "Gift box with gold ribbon (sample image)", caption: "Gift sets · sample image",
      cta: ["Shop seasonal gifts", "shop.html?occasion=corporate"], cta2: ["See the print calendar", "#gifts"] }
  ],

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
    { slug: "business-cards", name: "Business cards",     img: "assets/img/photos/business-cards.jpg", route: "Print",   service: "Offset Printing",
      specs: { Size: "90 × 55 mm", Stock: "350–400 gsm", Finish: "Matt · gloss · spot UV", From: "100 cards" } },
    { slug: "flyers-brochures", name: "Flyers & brochures", img: "assets/img/photos/flyers.jpg",         route: "Print",   service: "Digital Printing",
      specs: { Size: "A6 – A4", Stock: "130–170 gsm", Finish: "Flat or folded", From: "50 copies" } },
    { slug: "product-labels", name: "Product labels",     img: "assets/img/photos/labels.jpg",         route: "Pack",    service: "Packaging & Branding",
      specs: { Size: "Any shape", Stock: "Paper · PVC", Finish: "Rolls or sheets", From: "100 labels" } },
    { slug: "custom-boxes", name: "Custom boxes",       img: "assets/img/photos/boxes.jpg",          route: "Pack",    service: "Packaging & Branding",
      specs: { Size: "Made to fit", Stock: "Board · kraft", Finish: "Mailer · tuck-end · rigid", From: "Quote" } },
    { slug: "personalised-mugs", name: "Personalised mugs",  img: "assets/img/photos/mug.jpg",            route: "Promote", service: "Sublimation Printing",
      specs: { Size: "11 oz", Stock: "Ceramic", Finish: "Full-colour wrap", From: "1 mug" } },
    { slug: "printed-tshirts", name: "Printed T-shirts",   img: "assets/img/photos/tshirt.jpg",         route: "Promote", service: "Sublimation Printing",
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
  ],

  /* ======================================================================
     Inner pages
     ====================================================================== */

  // Full shop catalogue. Option lists are typical — confirm against the rate card.
  // Prices are not shown until Majestic supplies rates (waitingOnClient).
  catalogue: [
    { slug: "business-cards", name: "Business cards", route: "Print", service: "Offset Printing", img: "assets/img/photos/business-cards.jpg",
      occasions: ["corporate"], blurb: "The card that does the introducing. Heavy stock, crisp type, finishes you can feel.",
      options: { Size: ["Standard 90 × 55 mm", "Square 65 × 65 mm", "Slim 85 × 45 mm"], Stock: ["350 gsm matt", "400 gsm silk", "Textured linen"], Finish: ["None", "Matt lamination", "Spot UV", "Gold foil"], Sides: ["Single-sided", "Double-sided"] },
      quantities: [100, 250, 500, 1000] },
    { slug: "flyers-brochures", name: "Flyers & brochures", route: "Print", service: "Digital Printing", img: "assets/img/photos/flyers.jpg",
      occasions: [], blurb: "Campaign print in flat or folded formats, from a quick run to a full launch.",
      options: { Size: ["A6", "A5", "A4", "DL"], Stock: ["130 gsm gloss", "170 gsm silk", "250 gsm matt"], Fold: ["Flat", "Half fold", "Tri-fold"], Sides: ["Single-sided", "Double-sided"] },
      quantities: [50, 100, 500, 1000] },
    { slug: "wedding-invitations", name: "Wedding invitations", route: "Print", service: "Digital Offset Printing", img: "assets/img/photos/occ-wedding.jpg",
      occasions: ["weddings"], blurb: "Invitation suites with matching inserts, envelopes and thank-you cards.",
      options: { Size: ["5 × 7 in", "A5", "Square 150 mm"], Stock: ["Pearl 300 gsm", "Cotton 350 gsm", "Kraft 300 gsm"], Finish: ["None", "Gold foil", "Laser-cut wrap"], Envelope: ["White", "Ivory", "Kraft"] },
      quantities: [50, 100, 200, 300] },
    { slug: "calendars-diaries", name: "Calendars & diaries", route: "Print", service: "Offset Printing", img: "assets/img/photos/occ-corporate.jpg",
      occasions: ["corporate", "avurudu"], blurb: "Desk calendars, wall calendars and branded diaries for the year ahead.",
      options: { Type: ["Desk calendar", "Wall calendar", "A5 diary", "Planner"], Binding: ["Wire-O", "Perfect bound", "Hard cover"], Branding: ["Printed cover", "Foil logo", "Debossed logo"] },
      quantities: [25, 50, 100, 250] },
    { slug: "stickers", name: "Stickers & cut-outs", route: "Print", service: "Digital Printing", img: "assets/img/photos/svc-digital.jpg",
      occasions: [], blurb: "Die-cut, kiss-cut or on sheets — in paper, PVC or clear vinyl.",
      options: { Shape: ["Circle", "Square", "Custom die-cut"], Material: ["Paper", "White PVC", "Clear vinyl"], Finish: ["Gloss", "Matt"] },
      quantities: [50, 100, 500, 1000] },
    { slug: "product-labels", name: "Product labels", route: "Pack", service: "Packaging & Branding", img: "assets/img/photos/labels.jpg",
      occasions: [], blurb: "Labels for jars, bottles and boxes — on rolls for fast hand or machine application.",
      options: { Shape: ["Rectangle", "Circle", "Oval", "Custom"], Material: ["Paper", "White PVC", "Clear PVC", "Kraft"], Supply: ["On rolls", "On sheets"] },
      quantities: [100, 500, 1000, 5000] },
    { slug: "custom-boxes", name: "Custom boxes", route: "Pack", service: "Packaging & Branding", img: "assets/img/photos/boxes.jpg",
      occasions: [], blurb: "Mailer, tuck-end and rigid boxes built around your product's dimensions.",
      options: { Style: ["Mailer box", "Tuck-end box", "Rigid gift box"], Board: ["White board", "Kraft board", "Corrugated"], Print: ["Outside only", "Inside & outside"] },
      quantities: [50, 100, 500, 1000] },
    { slug: "retail-packaging", name: "Retail packaging", route: "Pack", service: "Packaging & Branding", img: "assets/img/photos/svc-packaging.jpg",
      occasions: ["avurudu", "deepavali"], blurb: "Printed cartons and sleeves that make a product ready for the shelf.",
      options: { Style: ["Folding carton", "Sleeve", "Window box"], Board: ["300 gsm board", "350 gsm board"], Finish: ["Matt lamination", "Gloss lamination", "Spot UV"] },
      quantities: [100, 500, 1000, 5000] },
    { slug: "banners", name: "Banners & backdrops", route: "Promote", service: "Large Format Printing", img: "assets/img/photos/svc-large-format.jpg",
      occasions: ["vesak", "weddings"], blurb: "PVC banners, roll-ups and event backdrops printed big and sharp.",
      options: { Type: ["PVC banner", "Roll-up stand", "Backdrop"], Size: ["2 × 3 ft", "3 × 6 ft", "Custom size"], Finish: ["Eyelets", "Pole pockets", "Stand included"] },
      quantities: [1, 2, 5, 10] },
    { slug: "personalised-mugs", name: "Personalised mugs", route: "Promote", service: "Sublimation Printing", img: "assets/img/photos/mug.jpg",
      occasions: ["christmas", "corporate"], blurb: "Photo or logo mugs, printed edge to edge — one gift or a whole team.",
      options: { Mug: ["White 11 oz", "Magic mug", "Inner-colour mug"], Print: ["One side", "Wrap-around"], Box: ["No box", "Gift box"] },
      quantities: [1, 6, 12, 50] },
    { slug: "printed-tshirts", name: "Printed T-shirts", route: "Promote", service: "Sublimation Printing", img: "assets/img/photos/tshirt.jpg",
      occasions: ["avurudu", "corporate"], blurb: "Team, event and one-off shirts in screen print or full-colour sublimation.",
      options: { Fabric: ["Cotton", "Polyester (sublimation)"], Method: ["Screen print", "Sublimation"], Print: ["Front", "Front & back"] },
      quantities: [1, 10, 25, 100] },
    { slug: "corporate-gift-sets", name: "Corporate gift sets", route: "Promote", service: "Promotional & Corporate Gifts", img: "assets/img/photos/svc-gifts.jpg",
      occasions: ["corporate", "christmas"], blurb: "Notebook, pen and keepsake sets, branded and boxed for clients or staff.",
      options: { Set: ["Notebook + pen", "Notebook + pen + mug", "Custom set"], Branding: ["Printed", "Engraved", "Foil"], Box: ["Kraft box", "Printed box"] },
      quantities: [10, 25, 50, 100] },
    { slug: "engraved-name-boards", name: "Engraved name boards", route: "Promote", service: "Laser Cutting & Engraving", img: "assets/img/photos/laser.jpg",
      occasions: ["weddings"], blurb: "Laser-cut and engraved boards in wood or acrylic, for doors, desks and weddings.",
      options: { Material: ["Wood", "Clear acrylic", "Black acrylic"], Size: ["A5", "A4", "Custom"], Finish: ["Engraved", "Cut lettering", "Engraved + paint fill"] },
      quantities: [1, 2, 5, 10] }
  ],

  // Extra detail for each service page, keyed by service name
  serviceDetail: {
    "Offset Printing":               { materials: ["Art paper", "Bond paper", "Board", "NCR sets"], weNeed: ["Quantity", "Size", "Paper stock", "Colours", "Artwork"] },
    "Digital Offset Printing":       { materials: ["Silk & gloss", "Textured stocks", "Pearl & metallic"], weNeed: ["Quantity", "Size", "Pages", "Finish", "Artwork"] },
    "Digital Printing":              { materials: ["Gloss & matt paper", "PVC sticker", "Photo paper", "Foam board"], weNeed: ["Size", "Material", "Quantity", "Where it will be used"] },
    "UV Printing":                   { materials: ["Acrylic", "Wood", "Glass", "Metal", "PVC board"], weNeed: ["Surface or object", "Print area", "Quantity", "Artwork"] },
    "Large Format Printing":         { materials: ["Flex / PVC", "Vinyl", "Fabric", "Wallpaper"], weNeed: ["Width × height", "Indoor or outdoor", "Mounting", "Installation"] },
    "Signage & 3D Signage":          { materials: ["Acrylic", "ACP", "Stainless steel", "LED modules"], weNeed: ["Location photos", "Size", "Lit or unlit", "Mounting surface"] },
    "CNC Cutting & Engraving":       { materials: ["Acrylic", "MDF", "Plywood", "ACP"], weNeed: ["Drawing or design", "Material & thickness", "Dimensions", "Quantity"] },
    "Laser Cutting & Engraving":     { materials: ["Wood", "Acrylic", "Leather", "Card"], weNeed: ["Design", "Material", "Size", "Quantity"] },
    "Sublimation Printing":          { materials: ["Ceramic mugs", "Polyester shirts", "Crystal", "Granite"], weNeed: ["Item & size", "Photo or artwork", "Quantity"] },
    "Vehicle Branding":              { materials: ["Cast vinyl", "Perforated window film", "Reflective vinyl"], weNeed: ["Vehicle make & model", "Photos of each side", "Full or partial", "Artwork"] },
    "Packaging & Branding":          { materials: ["Folding board", "Kraft", "Corrugated", "Rigid board"], weNeed: ["Product dimensions", "Box style", "Quantity", "Artwork or dieline"] },
    "Promotional & Corporate Gifts": { materials: ["Notebooks", "Pens", "Mugs", "Umbrellas", "Keytags"], weNeed: ["Items", "Quantity", "Branding method", "Deadline"] }
  },

  // Portfolio — SAMPLE stock images until customer-approved projects are supplied
  work: [
    { title: "Illuminated shop lettering", service: "Signage & 3D Signage",          img: "assets/img/photos/svc-signage.jpg" },
    { title: "Engraved keepsakes",         service: "Laser Cutting & Engraving",     img: "assets/img/photos/laser.jpg" },
    { title: "Corporate gift sets",        service: "Promotional & Corporate Gifts", img: "assets/img/photos/gifts.jpg" },
    { title: "Event banner run",           service: "Large Format Printing",         img: "assets/img/photos/svc-large-format.jpg" },
    { title: "Wedding stationery suite",   service: "Digital Offset Printing",       img: "assets/img/photos/occ-wedding.jpg" },
    { title: "Retail soap cartons",        service: "Packaging & Branding",          img: "assets/img/photos/svc-packaging.jpg" },
    { title: "Team shirt print run",       service: "Sublimation Printing",          img: "assets/img/photos/tshirt.jpg" },
    { title: "Vehicle wrap install",       service: "Vehicle Branding",              img: "assets/img/photos/svc-vehicle.jpg" },
    { title: "Acrylic panel cutting",      service: "CNC Cutting & Engraving",       img: "assets/img/photos/svc-cnc.jpg" }
  ],

  // Standard prepress guidance — confirm Majestic's exact file requirements
  artwork: [
    { term: "Bleed",        value: "3 mm",      text: "Extend background colours and images 3 mm past the trim line so no white edge shows after cutting." },
    { term: "Safe zone",    value: "4 mm",      text: "Keep text and logos at least 4 mm inside the trim line." },
    { term: "Resolution",   value: "300 dpi",   text: "Images at 300 dpi at final size. Screen images (72 dpi) will print blurry." },
    { term: "Colour",       value: "CMYK",      text: "Set files to CMYK. RGB colours can shift, especially bright greens and blues." },
    { term: "File type",    value: "PDF",       text: "Print-ready PDF with fonts embedded or outlined. AI, PSD and high-res JPG also accepted." },
    { term: "Black text",   value: "100% K",    text: "Use 100% black for small text, not a four-colour black, so it stays sharp." }
  ],

  // FAQs — answers avoid promises until Majestic confirms policy
  faqs: [
    { q: "Do I always get a proof?", a: "Yes. We send a digital proof for every order and only print after you approve it." },
    { q: "I don't have a design. Can you help?", a: "Yes. Choose “Design it for me” when you order or tell us on WhatsApp — our team will prepare artwork for you to approve." },
    { q: "How long does printing take?", a: "It depends on the product, quantity and finish. We confirm a production time with your proof, before anything is printed." },
    { q: "Can I collect my order?", a: "Yes, from our Pannala workshop. Delivery options and charges are confirmed with your order." },
    { q: "What if my file isn't print-ready?", a: "We check every file. If something needs fixing — low resolution, missing bleed — we tell you before printing." },
    { q: "How do I pay?", a: "Payment options are confirmed with your quote. (Waiting on client: gateway, bank transfer and cash details.)" }
  ]
};
