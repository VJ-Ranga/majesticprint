/*
 * Majestic Print — homepage demo content.
 * Edit this file to change products, services and contacts.
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
    { kicker: "Printed packaging", ink: "gold", lines: ["Packaging,", "made to fit."],
      lead: "Mailer, tuck-end and rigid boxes, labels and sleeves — built around your product and printed to sell it.",
      img: "assets/img/photos/svc-packaging.jpg", alt: "Printed retail cartons (sample image)", caption: "Retail cartons · sample image",
      cta: ["Explore packaging", "shop.html?cat=packaging"], cta2: ["Plan packaging", "contact.html?service=Packaging%20%26%20Branding#quote"] },
    { kicker: "Signs & branding", ink: "magenta", lines: ["Signs people", "find you by."],
      lead: "3D letters, light boxes, banners and vehicle wraps — designed, made and installed by one team.",
      img: "assets/img/photos/svc-signage.jpg", alt: "Illuminated 3D lettering (sample image)", caption: "3D lettering · sample image",
      cta: ["See signage", "service.html?s=signage-and-3d-signage"], cta2: ["Get a quote", "contact.html?service=Signage%20%26%203D%20Signage#quote"] },
    { kicker: "This season · Oct – Dec", ink: "bright", lines: ["Deepavali &", "year-end gifts."],
      lead: "Desk diaries, engraved pens, gift boxes and greeting cards for clients and staff. Order early — the presses fill up.",
      img: "assets/img/photos/gifts.jpg", alt: "Gift box with gold ribbon (sample image)", caption: "Gift sets · sample image",
      cta: ["Shop gifts & apparel", "shop.html?cat=gifts"], cta2: ["Corporate gift ideas", "service.html?s=promotional-and-corporate-gifts"] }
  ],

  // Homepage second section: Print / Pack / Promote cards (kept as before; awaiting owner feedback).
  // Links open pages, not shop filters.
  routes: [
    { id: "print",   title: "Print",   ink: "bright",  img: "assets/img/photos/flyers.jpg",
      text: "Cards, brochures, labels and calendars — everything your business hands out.",
      items: ["Visiting cards", "Brochures", "Letterheads", "Calendars"], href: "shop.html" },
    { id: "pack",    title: "Pack",    ink: "gold",    img: "assets/img/photos/boxes.jpg",
      text: "Boxes, bags, sleeves and stickers that make a product shelf-ready.",
      items: ["Custom boxes", "Paper bags", "Sleeves", "Labels"], href: "service.html?s=packaging-and-branding" },
    { id: "promote", title: "Promote", ink: "magenta", img: "assets/img/photos/signage.jpg",
      text: "Signs, vehicle graphics and branded gifts that keep your name in sight.",
      items: ["Shop signs", "Vehicle wraps", "Corporate gifts", "Apparel"], href: "services.html" }
  ],

  // Practical product categories — named the way customers ask for things (the tagline is not a category)
  categories: [
    { id: "stationery", title: "Cards & stationery", ink: "bright",  img: "assets/img/photos/business-cards.jpg",
      subs: [{ id: "visiting-cards", title: "Visiting cards" }, { id: "invitations", title: "Invitations & greeting cards" }, { id: "letterheads", title: "Letterheads & envelopes" }, { id: "calendars", title: "Calendars & diaries" }],
      text: "Visiting cards, letterheads, invitations, calendars and diaries.",
      items: ["Visiting cards", "Letterheads", "Wedding cards", "Calendars"] },
    { id: "marketing",  title: "Marketing print",    ink: "magenta", img: "assets/img/photos/flyers.jpg",
      subs: [{ id: "flyers", title: "Flyers & brochures" }, { id: "posters", title: "Posters" }, { id: "stickers", title: "Stickers & labels" }],
      text: "Flyers, brochures, posters and stickers for your next campaign.",
      items: ["Flyers", "Brochures", "Posters", "Stickers"] },
    { id: "signs",      title: "Signs & banners",    ink: "orange",  img: "assets/img/photos/svc-large-format.jpg",
      subs: [{ id: "banners", title: "Banners & roll-ups" }, { id: "boards", title: "Boards & signs" }],
      text: "Banners, backdrops, shop signs and vehicle graphics.",
      items: ["Banners", "Backdrops", "Shop signs", "Vehicle branding"] },
    { id: "packaging",  title: "Printed packaging",  ink: "gold",    img: "assets/img/photos/boxes.jpg",
      subs: [{ id: "boxes", title: "Boxes" }, { id: "bags", title: "Bags & sleeves" }, { id: "labels", title: "Product labels" }],
      text: "Printed boxes, labels, sleeves and bags made for your product.",
      items: ["Product boxes", "Labels", "Sleeves", "Paper bags"] },
    { id: "gifts",      title: "Gifts & apparel",    ink: "deep",    img: "assets/img/photos/gifts.jpg",
      subs: [{ id: "mugs", title: "Mugs" }, { id: "apparel", title: "T-shirts & apparel" }, { id: "corporate", title: "Corporate gifts" }, { id: "engraved", title: "Engraved gifts" }],
      text: "Mugs, T-shirts, diaries and engraved gifts — one piece or a whole team.",
      items: ["Mugs", "T-shirts", "Gift sets", "Name boards"] }
  ],


  // Launch products as spec sheets. Specs are typical options — confirm against the rate card.
  products: [
    { slug: "business-cards", name: "Visiting cards",     img: "assets/img/photos/business-cards.jpg", cat: "stationery",   service: "Offset Printing",
      specs: { Size: "90 × 55 mm", Stock: "350–400 gsm", Finish: "Matt · gloss · spot UV", From: "100 cards" } },
    { slug: "flyers-brochures", name: "Flyers & brochures", img: "assets/img/photos/flyers.jpg",         cat: "marketing",   service: "Digital Printing",
      specs: { Size: "A6 – A4", Stock: "130–170 gsm", Finish: "Flat or folded", From: "50 copies" } },
    { slug: "product-labels", name: "Product labels",     img: "assets/img/photos/labels.jpg",         cat: "packaging",    service: "Packaging & Branding",
      specs: { Size: "Any shape", Stock: "Paper · PVC", Finish: "Rolls or sheets", From: "100 labels" } },
    { slug: "custom-boxes", name: "Custom boxes",       img: "assets/img/photos/boxes.jpg",          cat: "packaging",    service: "Packaging & Branding",
      specs: { Size: "Made to fit", Stock: "Board · kraft", Finish: "Mailer · tuck-end · rigid", From: "Quote" } },
    { slug: "personalised-mugs", name: "Personalised mugs",  img: "assets/img/photos/mug.jpg",            cat: "gifts", service: "Sublimation Printing",
      specs: { Size: "11 oz", Stock: "Ceramic", Finish: "Full-colour wrap", From: "1 mug" } },
    { slug: "printed-tshirts", name: "Printed T-shirts",   img: "assets/img/photos/tshirt.jpg",         cat: "gifts", service: "Sublimation Printing",
      specs: { Size: "S – XXL", Stock: "Cotton · poly", Finish: "Screen or sublimation", From: "1 shirt" } }
  ],

  // All 12 service families — names, taglines, descriptions and item lists exactly as in the brand guide ("05. What we do")
  services: [
    { name: "Offset Printing", ink: "deep", img: "assets/img/photos/svc-offset.jpg",
      tagline: "Traditional Print Excellence",
      text: "High-quality offset printing for professional business and promotional materials.",
      itemsLabel: "We produce",
      items: ["Visiting Cards", "Letterheads", "Brochures", "Posters", "Calendars", "NCR Bill Books", "Envelopes", "File Covers", "Stickers", "Tag Cards", "Wedding Cards", "Diaries & Notebooks"] },
    { name: "Digital Offset Printing", ink: "deep", img: "assets/img/photos/svc-digital-offset.jpg",
      tagline: "Short Runs. Professional Results.",
      text: "Efficient digital offset solutions for high-quality printing with flexibility for small and medium quantities.",
      itemsLabel: "Ideal for",
      items: ["Business Stationery", "Marketing Materials", "Invitations", "Brochures", "Flyers", "Cards", "Short-run Publications", "Visiting Cards", "Letterheads", "Posters"] },
    { name: "Digital Printing", ink: "bright", img: "assets/img/photos/svc-digital.jpg",
      tagline: "Fast. Flexible. High Quality.",
      text: "Modern digital printing solutions for quick-turnaround promotional and commercial requirements.",
      itemsLabel: "Ideal for",
      items: ["Posters", "Flyers", "PVC Stickers", "Labels", "Cutouts", "Photo Prints", "Promotional Materials", "Custom Print Products"] },
    { name: "UV Printing", ink: "bright", img: "assets/img/photos/svc-uv.jpg",
      tagline: "Print Beyond Paper",
      text: "Advanced UV printing for vibrant, durable and premium-quality direct-to-surface applications.",
      itemsLabel: "Applications include",
      items: ["Acrylic", "PVC", "Foam Board", "Wood", "Glass", "Metal Surfaces", "Promotional Products", "Customized Signage"] },
    { name: "Large Format Printing", ink: "magenta", img: "assets/img/photos/svc-large-format.jpg",
      tagline: "Big Print. Big Impact.",
      text: "Large-scale printing solutions designed for advertising, branding and environmental graphics.",
      itemsLabel: "We produce",
      items: ["Hoardings", "Large Format Banners", "Backdrops", "Wall Graphics", "Wallpapers", "Posters", "Promotional Displays", "Event Branding"] },
    { name: "Signage & 3D Signage", ink: "magenta", img: "assets/img/photos/svc-signage.jpg",
      tagline: "Make Your Brand Visible",
      text: "Professional indoor and outdoor signage designed to give businesses a strong physical presence.",
      itemsLabel: "Our solutions include",
      items: ["3D Letter Signs", "LED Signs", "Light Boxes", "Dealer Boards", "Shop Signage", "Corporate Signage", "Directional Signs", "Outdoor Advertising Signs", "Acrylic Signs", "Custom Signage"] },
    { name: "CNC Cutting & Engraving", ink: "orange", img: "assets/img/photos/svc-cnc.jpg",
      tagline: "Precision Made Possible",
      text: "Computer-controlled cutting and engraving for detailed, accurate and customized applications.",
      itemsLabel: "Applications include",
      items: ["Acrylic Cutting", "Wooden Cutting", "3D Letters", "Wall Partitions", "Decorative Panels", "Custom Shapes", "Personalized Products", "Engraving", "Architectural Elements"] },
    { name: "Laser Cutting & Engraving", ink: "orange", img: "assets/img/photos/laser.jpg",
      tagline: "Detail. Precision. Craft.",
      text: "Precision laser cutting and engraving for creative, decorative and personalized products.",
      itemsLabel: "We create",
      items: ["Personalized Gifts", "Wooden Décor", "Acrylic Products", "Name Boards", "Decorative Items", "Custom Designs", "Engraved Products", "Event & Wedding Items"] },
    { name: "Sublimation Printing", ink: "gold", img: "assets/img/photos/svc-sublimation.jpg",
      tagline: "Brand It. Personalize It.",
      text: "High-quality sublimation printing for customized promotional and personal products.",
      itemsLabel: "We produce",
      items: ["T-Shirts", "Mugs", "Glass Crystals", "Granite Items", "Customized Gifts", "Promotional Merchandise"] },
    { name: "Vehicle Branding", ink: "gold", img: "assets/img/photos/svc-vehicle.jpg",
      tagline: "Take Your Brand on the Road",
      text: "Transform vehicles into powerful mobile advertising platforms.",
      itemsLabel: "Applications include",
      items: ["Vehicle Stickers", "Full Vehicle Branding", "Partial Vehicle Branding", "Commercial Vehicle Graphics", "Custom Promotional Graphics"] },
    { name: "Packaging & Branding", ink: "deep", img: "assets/img/photos/svc-packaging.jpg",
      tagline: "Packaging That Represents",
      text: "Creative and professional packaging solutions designed to protect products while strengthening brand identity.",
      itemsLabel: "Solutions include",
      items: ["Product Boxes", "Custom Packaging", "Paper Bags", "Labels & Stickers", "Packaging Sleeves", "Product Tags", "Branded Materials"] },
    { name: "Promotional & Corporate Gifts", ink: "magenta", img: "assets/img/photos/svc-gifts.jpg",
      tagline: "Make Your Brand Part of Their Every Day",
      text: "Customized promotional products for businesses, events and corporate campaigns.",
      itemsLabel: "We offer",
      items: ["Diaries", "Notebooks", "Pens", "Mugs", "T-Shirts", "Umbrellas", "Key Tags", "Customized Gifts", "Corporate Gift Sets"] }
  ],

  // Brand guide closing statement
  statement: ["From Offset to Digital.", "From UV to Large Format.", "From CNC & Laser to Signage.", "From Packaging to Promotional Products."],

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
  // sub = subcategory id (see categories[].subs), days = turnaround in working days, personalise = customer adds a name/photo/text.
  // price.base = LKR total for the default (first) options at each quantity; price.add = LKR extra PER UNIT for a non-default option.
  // ===== SAMPLE PRICES — replace with the client's rate card =====
  catalogue: [
    { slug: "business-cards", name: "Visiting cards", cat: "stationery", sub: "visiting-cards", service: "Offset Printing", img: "assets/img/photos/business-cards.jpg", days: 3, personalise: false,
      blurb: "The card that does the introducing. Heavy stock, crisp type, finishes you can feel.",
      options: { Size: ["Standard 90 × 55 mm", "Square 65 × 65 mm", "Slim 85 × 45 mm"], Stock: ["350 gsm matt", "400 gsm silk", "Textured linen"], Finish: ["None", "Matt lamination", "Spot UV", "Gold foil"], Sides: ["Single-sided", "Double-sided"] },
      quantities: [100, 250, 500, 1000],
      price: { base: { "100": 1850, "250": 3200, "500": 5400, "1000": 8900 }, add: { Size: { "Square 65 × 65 mm": 1, "Slim 85 × 45 mm": 0.5 }, Stock: { "400 gsm silk": 2, "Textured linen": 4 }, Finish: { "Matt lamination": 1.5, "Spot UV": 6, "Gold foil": 9 }, Sides: { "Double-sided": 3 } } } },
    { slug: "wedding-invitations", name: "Wedding invitations", cat: "stationery", sub: "invitations", service: "Digital Offset Printing", img: "assets/img/photos/occ-wedding.jpg", days: 7, personalise: true,
      blurb: "Invitation suites with matching inserts, envelopes and thank-you cards.",
      options: { Size: ["5 × 7 in", "A5", "Square 150 mm"], Stock: ["Pearl 300 gsm", "Cotton 350 gsm", "Kraft 300 gsm"], Finish: ["None", "Gold foil", "Laser-cut wrap"], Envelope: ["White", "Ivory", "Kraft"] },
      quantities: [50, 100, 200, 300],
      price: { base: { "50": 14500, "100": 26000, "200": 47000, "300": 66000 }, add: { Stock: { "Cotton 350 gsm": 60, "Kraft 300 gsm": -20 }, Finish: { "Gold foil": 90, "Laser-cut wrap": 220 }, Envelope: { "Ivory": 10 } } } },
    { slug: "greeting-cards", name: "Greeting cards", cat: "stationery", sub: "invitations", service: "Digital Offset Printing", img: "assets/img/photos/occ-christmas.jpg", days: 4, personalise: true,
      blurb: "Christmas, Deepavali, Avurudu and thank-you cards — with your message, logo or family photo inside.",
      options: { Size: ["A6 folded", "A5 folded", "Square 140 mm"], Stock: ["300 gsm matt", "300 gsm pearl", "Kraft 300 gsm"], Finish: ["None", "Gold foil", "Spot UV"], Envelope: ["White", "Kraft", "Coloured"] },
      quantities: [10, 25, 50, 100],
      price: { base: { "10": 1800, "25": 3900, "50": 7000, "100": 12500 }, add: { Size: { "A5 folded": 60, "Square 140 mm": 40 }, Stock: { "300 gsm pearl": 25 }, Finish: { "Gold foil": 70, "Spot UV": 45 }, Envelope: { "Kraft": 5, "Coloured": 12 } } } },
    { slug: "letterheads", name: "Letterheads", cat: "stationery", sub: "letterheads", service: "Offset Printing", img: "assets/img/photos/svc-offset.jpg", days: 4, personalise: false,
      blurb: "Company letterheads on bond or woven paper, ready for your printer or signature.",
      options: { Size: ["A4", "A5"], Paper: ["100 gsm bond", "120 gsm woven", "100 gsm recycled"], Colour: ["Full colour", "Single colour"] },
      quantities: [100, 250, 500, 1000],
      price: { base: { "100": 3800, "250": 6900, "500": 11000, "1000": 18500 }, add: { Size: { "A5": -6 }, Paper: { "120 gsm woven": 7, "100 gsm recycled": 2 }, Colour: { "Single colour": -8 } } } },
    { slug: "envelopes", name: "Envelopes", cat: "stationery", sub: "letterheads", service: "Offset Printing", img: "assets/img/photos/svc-digital-offset.jpg", days: 5, personalise: false,
      blurb: "Printed business, DL and A4 envelopes with your logo and return address.",
      options: { Size: ["DL", "C5", "A4 (C4)"], Paper: ["100 gsm white", "120 gsm kraft"], Window: ["No window", "Window"] },
      quantities: [250, 500, 1000, 2500],
      price: { base: { "250": 7500, "500": 12500, "1000": 21000, "2500": 48000 }, add: { Size: { "C5": 6, "A4 (C4)": 14 }, Paper: { "120 gsm kraft": 3 }, Window: { "Window": 4 } } } },
    { slug: "calendars-diaries", name: "Calendars & diaries", cat: "stationery", sub: "calendars", service: "Offset Printing", img: "assets/img/photos/occ-corporate.jpg", days: 10, personalise: false,
      blurb: "Desk calendars, wall calendars and branded diaries for the year ahead.",
      options: { Type: ["Desk calendar", "Wall calendar", "A5 diary", "Planner"], Binding: ["Wire-O", "Perfect bound", "Hard cover"], Branding: ["Printed cover", "Foil logo", "Debossed logo"] },
      quantities: [25, 50, 100, 250],
      price: { base: { "25": 9500, "50": 17000, "100": 31000, "250": 70000 }, add: { Type: { "Wall calendar": 60, "A5 diary": 420, "Planner": 350 }, Binding: { "Perfect bound": 40, "Hard cover": 180 }, Branding: { "Foil logo": 90, "Debossed logo": 110 } } } },

    { slug: "flyers-brochures", name: "Flyers & brochures", cat: "marketing", sub: "flyers", service: "Digital Printing", img: "assets/img/photos/flyers.jpg", days: 2, personalise: false,
      blurb: "Campaign print in flat or folded formats, from a quick run to a full launch.",
      options: { Size: ["A6", "A5", "A4", "DL"], Stock: ["130 gsm gloss", "170 gsm silk", "250 gsm matt"], Fold: ["Flat", "Half fold", "Tri-fold"], Sides: ["Single-sided", "Double-sided"] },
      quantities: [50, 100, 500, 1000],
      price: { base: { "50": 2400, "100": 3600, "500": 12500, "1000": 21000 }, add: { Size: { "A6": -8, "A4": 12, "DL": 3 }, Stock: { "170 gsm silk": 3, "250 gsm matt": 9 }, Fold: { "Half fold": 4, "Tri-fold": 6 }, Sides: { "Double-sided": 8 } } } },
    { slug: "posters", name: "Posters", cat: "marketing", sub: "posters", service: "Digital Printing", img: "assets/img/photos/occ-vesak.jpg", days: 2, personalise: false,
      blurb: "Event, sale and wall posters in sharp full colour, from A3 to A1.",
      options: { Size: ["A3", "A2", "A1"], Paper: ["130 gsm gloss", "170 gsm silk", "Photo paper"], Finish: ["None", "Matt lamination", "Gloss lamination"] },
      quantities: [1, 5, 10, 50],
      price: { base: { "1": 650, "5": 2800, "10": 5200, "50": 22500 }, add: { Size: { "A2": 400, "A1": 900 }, Paper: { "170 gsm silk": 40, "Photo paper": 180 }, Finish: { "Matt lamination": 150, "Gloss lamination": 150 } } } },
    { slug: "stickers", name: "Stickers & cut-outs", cat: "marketing", sub: "stickers", service: "Digital Printing", img: "assets/img/photos/svc-digital.jpg", days: 3, personalise: false,
      blurb: "Die-cut, kiss-cut or on sheets — in paper, PVC or clear vinyl.",
      options: { Shape: ["Circle", "Square", "Custom die-cut"], Material: ["Paper", "White PVC", "Clear vinyl"], Finish: ["Gloss", "Matt"] },
      quantities: [50, 100, 500, 1000],
      price: { base: { "50": 2200, "100": 3500, "500": 13500, "1000": 23000 }, add: { Shape: { "Custom die-cut": 10 }, Material: { "White PVC": 8, "Clear vinyl": 12 }, Finish: { "Matt": 2 } } } },

    { slug: "banners", name: "Banners & backdrops", cat: "signs", sub: "banners", service: "Large Format Printing", img: "assets/img/photos/svc-large-format.jpg", days: 3, personalise: false,
      blurb: "PVC banners, roll-ups and event backdrops printed big and sharp.",
      options: { Type: ["PVC banner", "Roll-up stand", "Backdrop"], Size: ["2 × 3 ft", "3 × 6 ft", "Custom size"], Finish: ["Eyelets", "Pole pockets", "Stand included"] },
      quantities: [1, 2, 5, 10],
      price: { base: { "1": 2400, "2": 4600, "5": 10800, "10": 20000 }, add: { Type: { "Roll-up stand": 7000, "Backdrop": 3500 }, Size: { "3 × 6 ft": 2600, "Custom size": 3200 }, Finish: { "Pole pockets": 300, "Stand included": 1800 } } } },
    { slug: "roll-up-banners", name: "Roll-up banners", cat: "signs", sub: "banners", service: "Large Format Printing", img: "assets/img/photos/hero-wide.jpg", days: 2, personalise: false,
      blurb: "Portable roll-up stands with a printed banner and carry bag — set up in seconds.",
      options: { Size: ["2.75 × 6 ft", "3 × 7 ft", "4 × 7 ft"], Base: ["Standard aluminium", "Premium wide-base"], Print: ["Matt PVC", "Backlit film"] },
      quantities: [1, 2, 5, 10],
      price: { base: { "1": 9800, "2": 18500, "5": 44000, "10": 83000 }, add: { Size: { "3 × 7 ft": 1200, "4 × 7 ft": 2800 }, Base: { "Premium wide-base": 2500 }, Print: { "Backlit film": 1800 } } } },
    { slug: "foam-board-signs", name: "Foam board signs", cat: "signs", sub: "boards", service: "UV Printing", img: "assets/img/photos/svc-uv.jpg", days: 3, personalise: false,
      blurb: "Lightweight printed foam board for events, shops and directional signs.",
      options: { Size: ["A3", "A2", "A1", "2 × 3 ft"], Thickness: ["5 mm", "10 mm"], Mount: ["Flat", "With stand", "Hanging eyelets"] },
      quantities: [1, 5, 10, 25],
      price: { base: { "1": 1400, "5": 6200, "10": 11500, "25": 26500 }, add: { Size: { "A2": 600, "A1": 1400, "2 × 3 ft": 2200 }, Thickness: { "10 mm": 350 }, Mount: { "With stand": 900, "Hanging eyelets": 120 } } } },
    { slug: "acrylic-signs", name: "Acrylic signs", cat: "signs", sub: "boards", service: "Signage & 3D Signage", img: "assets/img/photos/svc-signage.jpg", days: 6, personalise: false,
      blurb: "Office, door and reception signs in clear or coloured acrylic, with standoff mounts.",
      options: { Size: ["A4", "A3", "2 × 1 ft"], Acrylic: ["Clear 3 mm", "Clear 5 mm", "White 5 mm"], Mount: ["Standoffs", "Wall adhesive", "Desk stand"] },
      quantities: [1, 2, 5, 10],
      price: { base: { "1": 4800, "2": 9200, "5": 21500, "10": 40000 }, add: { Size: { "A3": 1800, "2 × 1 ft": 3600 }, Acrylic: { "Clear 5 mm": 900, "White 5 mm": 1100 }, Mount: { "Wall adhesive": -200, "Desk stand": 650 } } } },

    { slug: "product-labels", name: "Product labels", cat: "packaging", sub: "labels", service: "Packaging & Branding", img: "assets/img/photos/labels.jpg", days: 4, personalise: false,
      blurb: "Labels for jars, bottles and boxes — on rolls for fast hand or machine application.",
      options: { Shape: ["Rectangle", "Circle", "Oval", "Custom"], Material: ["Paper", "White PVC", "Clear PVC", "Kraft"], Supply: ["On rolls", "On sheets"] },
      quantities: [100, 500, 1000, 5000],
      price: { base: { "100": 2600, "500": 8200, "1000": 13500, "5000": 52000 }, add: { Shape: { "Custom": 4 }, Material: { "White PVC": 5, "Clear PVC": 7, "Kraft": 2 }, Supply: { "On sheets": -1 } } } },
    { slug: "custom-boxes", name: "Custom boxes", cat: "packaging", sub: "boxes", service: "Packaging & Branding", img: "assets/img/photos/boxes.jpg", days: 12, personalise: false,
      blurb: "Mailer, tuck-end and rigid boxes built around your product's dimensions.",
      options: { Style: ["Mailer box", "Tuck-end box", "Rigid gift box"], Board: ["White board", "Kraft board", "Corrugated"], Print: ["Outside only", "Inside & outside"] },
      quantities: [50, 100, 500, 1000],
      price: { base: { "50": 14500, "100": 25000, "500": 105000, "1000": 190000 }, add: { Style: { "Tuck-end box": -30, "Rigid gift box": 350 }, Board: { "Kraft board": -10, "Corrugated": 25 }, Print: { "Inside & outside": 40 } } } },
    { slug: "retail-packaging", name: "Retail packaging", cat: "packaging", sub: "boxes", service: "Packaging & Branding", img: "assets/img/photos/svc-packaging.jpg", days: 12, personalise: false,
      blurb: "Printed cartons and sleeves that make a product ready for the shelf.",
      options: { Style: ["Folding carton", "Sleeve", "Window box"], Board: ["300 gsm board", "350 gsm board"], Finish: ["Matt lamination", "Gloss lamination", "Spot UV"] },
      quantities: [100, 500, 1000, 5000],
      price: { base: { "100": 18500, "500": 69000, "1000": 120000, "5000": 520000 }, add: { Style: { "Sleeve": -40, "Window box": 35 }, Board: { "350 gsm board": 8 }, Finish: { "Gloss lamination": 0, "Spot UV": 20 } } } },
    { slug: "paper-bags", name: "Paper bags", cat: "packaging", sub: "bags", service: "Packaging & Branding", img: "assets/img/photos/gifts.jpg", days: 10, personalise: false,
      blurb: "Printed shopping and gift bags with twisted or flat handles, in kraft or white paper.",
      options: { Size: ["Small", "Medium", "Large"], Paper: ["Kraft 120 gsm", "White 150 gsm", "Art paper 157 gsm"], Handle: ["Twisted paper", "Flat paper", "Cotton rope"] },
      quantities: [100, 250, 500, 1000],
      price: { base: { "100": 14000, "250": 31000, "500": 56000, "1000": 98000 }, add: { Size: { "Medium": 30, "Large": 65 }, Paper: { "White 150 gsm": 15, "Art paper 157 gsm": 30 }, Handle: { "Flat paper": 8, "Cotton rope": 25 } } } },

    { slug: "personalised-mugs", name: "Personalised mugs", cat: "gifts", sub: "mugs", service: "Sublimation Printing", img: "assets/img/photos/mug.jpg", days: 2, personalise: true,
      blurb: "Photo or logo mugs, printed edge to edge — one gift or a whole team.",
      options: { Mug: ["White 11 oz", "Magic mug", "Inner-colour mug"], Print: ["One side", "Wrap-around"], Box: ["No box", "Gift box"] },
      quantities: [1, 6, 12, 50],
      price: { base: { "1": 1400, "6": 7800, "12": 14400, "50": 55000 }, add: { Mug: { "Magic mug": 450, "Inner-colour mug": 250 }, Print: { "Wrap-around": 150 }, Box: { "Gift box": 200 } } } },
    { slug: "printed-tshirts", name: "Printed T-shirts", cat: "gifts", sub: "apparel", service: "Sublimation Printing", img: "assets/img/photos/tshirt.jpg", days: 4, personalise: true,
      blurb: "Team, event and one-off shirts in screen print or full-colour sublimation.",
      options: { Fabric: ["Cotton", "Polyester (sublimation)"], Method: ["Screen print", "Sublimation"], Print: ["Front", "Front & back"] },
      quantities: [1, 10, 25, 100],
      price: { base: { "1": 2200, "10": 19500, "25": 44000, "100": 165000 }, add: { Fabric: { "Polyester (sublimation)": -100 }, Method: { "Sublimation": 150 }, Print: { "Front & back": 500 } } } },
    { slug: "corporate-gift-sets", name: "Corporate gift sets", cat: "gifts", sub: "corporate", service: "Promotional & Corporate Gifts", img: "assets/img/photos/svc-gifts.jpg", days: 8, personalise: false,
      blurb: "Notebook, pen and keepsake sets, branded and boxed for clients or staff.",
      options: { Set: ["Notebook + pen", "Notebook + pen + mug", "Custom set"], Branding: ["Printed", "Engraved", "Foil"], Box: ["Kraft box", "Printed box"] },
      quantities: [10, 25, 50, 100],
      price: { base: { "10": 11000, "25": 26000, "50": 49000, "100": 92000 }, add: { Set: { "Notebook + pen + mug": 850, "Custom set": 1200 }, Branding: { "Engraved": 150, "Foil": 120 }, Box: { "Printed box": 180 } } } },
    { slug: "branded-pens", name: "Branded pens", cat: "gifts", sub: "corporate", service: "Promotional & Corporate Gifts", img: "assets/img/photos/svc-sublimation.jpg", days: 5, personalise: false,
      blurb: "Plastic and metal pens with your logo, for desks, events and client packs.",
      options: { Pen: ["Plastic ballpoint", "Metal ballpoint", "Gel pen"], Branding: ["Pad-printed logo", "Laser engraved"], Pack: ["Loose", "Gift box"] },
      quantities: [50, 100, 250, 500],
      price: { base: { "50": 9500, "100": 17000, "250": 38000, "500": 70000 }, add: { Pen: { "Metal ballpoint": 160, "Gel pen": 20 }, Branding: { "Laser engraved": 40 }, Pack: { "Gift box": 120 } } } },
    { slug: "key-tags", name: "Key tags", cat: "gifts", sub: "corporate", service: "Promotional & Corporate Gifts", img: "assets/img/photos/cmyk-ink.jpg", days: 6, personalise: false,
      blurb: "Acrylic, PVC and metal key tags with your logo — a small gift that gets carried every day.",
      options: { Material: ["Acrylic", "PVC rubber", "Metal"], Shape: ["Rectangle", "Circle", "Custom shape"], Print: ["One side", "Both sides"] },
      quantities: [50, 100, 250, 500],
      price: { base: { "50": 7500, "100": 13000, "250": 29000, "500": 52000 }, add: { Material: { "PVC rubber": 40, "Metal": 120 }, Shape: { "Custom shape": 30 }, Print: { "Both sides": 25 } } } },
    { slug: "engraved-name-boards", name: "Engraved name boards", cat: "gifts", sub: "engraved", service: "Laser Cutting & Engraving", img: "assets/img/photos/laser.jpg", days: 5, personalise: true,
      blurb: "Laser-cut and engraved boards in wood or acrylic, for doors, desks and weddings.",
      options: { Material: ["Wood", "Clear acrylic", "Black acrylic"], Size: ["A5", "A4", "Custom"], Finish: ["Engraved", "Cut lettering", "Engraved + paint fill"] },
      quantities: [1, 2, 5, 10],
      price: { base: { "1": 2800, "2": 5400, "5": 12500, "10": 23500 }, add: { Material: { "Clear acrylic": 300, "Black acrylic": 400 }, Size: { "A4": 900, "Custom": 1500 }, Finish: { "Cut lettering": 500, "Engraved + paint fill": 350 } } } }
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
