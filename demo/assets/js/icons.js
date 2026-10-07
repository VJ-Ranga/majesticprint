/* Majestic Print — process pictograms.
   32 × 32 line icons. ".ink" strokes and ".inkf" fills take the process's plate colour (--ink). */
window.MP_ICONS = (function () {
  var wrap = function (body) {
    return '<svg class="mp-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true" focusable="false">' + body + "</svg>";
  };
  return {
    // Two plate cylinders with a sheet running between them
    "Offset Printing": wrap('<circle class="spin" cx="10" cy="9" r="5"/><circle class="spin" cx="10" cy="23" r="5"/><path d="M15 16h14"/><path class="ink" d="M19 13.5h9v5h-9z"/>'),
    // Short-run press with a small stack out the front
    "Digital Offset Printing": wrap('<rect x="4" y="10" width="24" height="11"/><path d="M8 10V5h16v5"/><path d="M8 21v6h16v-6"/><path class="ink" d="M11 24h10"/><circle class="inkf" cx="23" cy="15" r="1.4" stroke="none"/>'),
    // Desktop/production printer feeding a poster
    "Digital Printing": wrap('<rect x="4" y="11" width="24" height="9"/><path d="M8 11V4h16v7"/><path d="M8 20v8h16v-8"/><path class="ink" d="M11 24h10M11 26.5h6"/>'),
    // UV lamp curing ink onto a rigid object
    "UV Printing": wrap('<path d="M7 5h18v6H7z"/><path class="ink" d="M10 14l-2 4M16 14v4M22 14l2 4"/><path d="M5 22h22v6H5z"/>'),
    // Media roll unwinding into a banner
    "Large Format Printing": wrap('<circle cx="8" cy="8" r="4"/><path d="M12 4h16v18H8V12"/><path class="ink" d="M14 10h10M14 14h7"/><path d="M12 27h12"/>'),
    // Raised letter on a fascia
    "Signage & 3D Signage": wrap('<path d="M4 7h24v15H4z"/><path d="M11 18l5-8 5 8"/><path class="ink" d="M13 15.5h6"/><path d="M16 22v6M11 28h10"/>'),
    // Router bit cutting a panel
    "CNC Cutting & Engraving": wrap('<path d="M11 3h10v8H11z"/><path d="M14 11h4v6l-2 4-2-4z"/><path class="ink" d="M4 25h24"/><path d="M4 29h24"/>'),
    // Laser head, beam and burn point
    "Laser Cutting & Engraving": wrap('<path d="M10 3h12v9H10z"/><path d="M14 12h4v2h-4z"/><path class="ink" d="M16 14v9"/><circle class="inkf" cx="16" cy="24.5" r="1.8" stroke="none"/><path d="M4 28h24"/>'),
    // Mug with a printed wrap band
    "Sublimation Printing": wrap('<path d="M6 8h16v15a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4z"/><path d="M22 11h3a3.5 3.5 0 0 1 0 7h-3"/><path class="ink" d="M6 13h16v5H6z"/>'),
    // Delivery van with a graphic panel
    "Vehicle Branding": wrap('<path d="M2 22V8h18l6 6v8z"/><path d="M20 8v6h6"/><circle cx="8" cy="23" r="2.6"/><circle cx="21" cy="23" r="2.6"/><path class="ink" d="M5 11h11v5H5z"/>'),
    // Folding carton with a dieline flap
    "Packaging & Branding": wrap('<path d="M16 4l12 6v13l-12 6-12-6V10z"/><path d="M4 10l12 6 12-6M16 16v13"/><path class="ink" d="M10 7l12 6" stroke-dasharray="2 2"/>'),
    // Gift box with a printed ribbon
    "Promotional & Corporate Gifts": wrap('<path d="M5 13h22v15H5z"/><path d="M3 9h26v4H3z"/><path d="M16 9v19"/><path class="ink" d="M16 9c-1.5-5-8-5-6 0M16 9c1.5-5 8-5 6 0"/>')
  };
})();
