/*
 * Majestic Print — homepage demo content.
 * Edit this file to change products, services, occasions and contacts.
 * Items marked "waitingOnClient" are placeholders until Majestic confirms them.
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

  // Brand inks from the guide. Used by the colour bar and service swatches.
  inks: {
    deep:    { name: "Deep Blue",   hex: "#13477A" },
    bright:  { name: "Bright Blue", hex: "#007CAC" },
    magenta: { name: "Magenta",     hex: "#D01C60" },
    orange:  { name: "Orange",      hex: "#CF6428" },
    gold:    { name: "Gold",        hex: "#EAA123" }
  },

  // Purpose routes: Print / Pack / Promote
  routes: [
    { id: "print",   title: "Print",   ink: "bright",
      text: "Business cards, brochures, labels, calendars and everything your business hands out.",
      items: ["Business cards", "Flyers & brochures", "Letterheads", "Calendars"] },
    { id: "pack",    title: "Pack",    ink: "gold",
      text: "Boxes, bags, sleeves and stickers that make your product look ready for the shelf.",
      items: ["Custom boxes", "Paper bags", "Sleeves & tags", "Product labels"] },
    { id: "promote", title: "Promote", ink: "magenta",
      text: "Signs, vehicle graphics, branded merchandise and gifts people actually keep.",
      items: ["Shop signs", "Vehicle wraps", "Corporate gifts", "Printed apparel"] }
  ],

  // Representative launch products. Prices pending the approved rate card.
  products: [
    { name: "Business cards",     art: "cards",   route: "Print",   options: "Matt, gloss or textured · spot UV · 100+",  service: "Offset Printing" },
    { name: "Flyers & brochures", art: "flyers",  route: "Print",   options: "A6 to A4 · folded or flat · 50+",            service: "Digital Printing" },
    { name: "Product labels",     art: "labels",  route: "Pack",    options: "Paper or PVC · any shape · on rolls",        service: "Packaging & Branding" },
    { name: "Custom boxes",       art: "box",     route: "Pack",    options: "Mailer, tuck-end or rigid · your dieline",   service: "Packaging & Branding" },
    { name: "Personalised mugs",  art: "mug",     route: "Promote", options: "Photo or logo · single or in bulk",          service: "Sublimation Printing" },
    { name: "Printed T-shirts",   art: "tshirt",  route: "Promote", options: "Team, event or one-off · S to XXL",          service: "Sublimation Printing" }
  ],

  // All 12 service families from the brand guide
  services: [
    { name: "Offset Printing",            ink: "deep",    tint: 100, text: "High-volume print with consistent colour, run after run.", examples: ["Business cards", "Brochures", "NCR books", "Diaries"] },
    { name: "Digital Offset Printing",    ink: "deep",    tint: 70,  text: "Offset-quality short runs when you need hundreds, not thousands.", examples: ["Short-run stationery", "Invitations", "Booklets"] },
    { name: "Digital Printing",           ink: "bright",  tint: 100, text: "Fast, flexible print for posters, stickers, cut-outs and photos.", examples: ["Posters", "PVC stickers", "Photo prints"] },
    { name: "UV Printing",                ink: "bright",  tint: 70,  text: "Print directly onto acrylic, wood, glass, metal and more.", examples: ["Acrylic plaques", "Foam boards", "Branded objects"] },
    { name: "Large Format Printing",      ink: "magenta", tint: 100, text: "Banners, backdrops and wall graphics, printed big and sharp.", examples: ["Hoardings", "Event backdrops", "Wallpapers"] },
    { name: "Signage & 3D Signage",       ink: "magenta", tint: 70,  text: "Shop fronts, light boxes and raised letters that get noticed.", examples: ["3D letters", "LED signs", "Directional signs"] },
    { name: "CNC Cutting & Engraving",    ink: "orange",  tint: 100, text: "Precise cutting in acrylic and wood for panels, letters and shapes.", examples: ["Partitions", "3D letters", "Custom panels"] },
    { name: "Laser Cutting & Engraving",  ink: "orange",  tint: 70,  text: "Fine detail for gifts, name boards and wedding pieces.", examples: ["Name boards", "Wood decor", "Wedding items"] },
    { name: "Sublimation Printing",       ink: "gold",    tint: 100, text: "Full-colour images on mugs, shirts, crystal and granite.", examples: ["Mugs", "T-shirts", "Crystal gifts"] },
    { name: "Vehicle Branding",           ink: "gold",    tint: 70,  text: "Full or partial wraps that turn every trip into advertising.", examples: ["Full wraps", "Door graphics", "Fleet stickers"] },
    { name: "Packaging & Branding",       ink: "deep",    tint: 40,  text: "Boxes, bags and labels designed around your product.", examples: ["Boxes", "Paper bags", "Sleeves"] },
    { name: "Promotional & Corporate Gifts", ink: "magenta", tint: 40, text: "Branded diaries, pens, umbrellas and gift sets, in any quantity.", examples: ["Diaries", "Pens", "Gift sets"] }
  ],

  // Gift and seasonal ideas — local occasions
  occasions: [
    { id: "avurudu",   label: "Avurudu",   note: "April",       ideas: ["Branded calendars", "Greeting cards", "Gift boxes", "Staff T-shirts"] },
    { id: "vesak",     label: "Vesak",     note: "May",         ideas: ["Lantern prints", "Dansal banners", "Event backdrops", "Greeting cards"] },
    { id: "weddings",  label: "Weddings",  note: "All year",    ideas: ["Invitations", "Laser-cut name boards", "Welcome signs", "Thank-you tags"] },
    { id: "corporate", label: "Year-end & corporate", note: "Oct–Dec", ideas: ["Diaries & notebooks", "Engraved pens", "Gift sets", "Desk calendars"] },
    { id: "personal",  label: "Just because", note: "Any day",  ideas: ["Photo mugs", "Crystal prints", "Custom T-shirts", "Engraved keepsakes"] }
  ],

  // Ordering process — real sequence, so it is numbered
  steps: [
    { title: "Choose or describe", text: "Pick a product, or tell us what you have in mind." },
    { title: "Send your artwork",  text: "Upload your file, or ask our team to design it for you." },
    { title: "Approve your proof", text: "Check a proof before anything is printed.", stamp: true },
    { title: "Print and deliver",  text: "We produce it and deliver, or you collect in Pannala." }
  ]
};
