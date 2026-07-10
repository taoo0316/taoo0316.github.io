/* Interactive map for the /singapore/ page.
   Places come from _data/singapore_places.yml, injected as JSON into
   #sg-places by Liquid. Kept in an external file on purpose: the theme's
   compress_html strips newlines from inline <script>, which silently breaks
   inline JS. Uses Leaflet (loaded from CDN by the page) + CARTO basemaps,
   with light/dark tiles that follow the site's data-theme toggle. */
(function () {
  var el = document.getElementById('sg-map');
  var dataEl = document.getElementById('sg-places');
  if (!el || !dataEl || typeof L === 'undefined') return;

  var places;
  try { places = JSON.parse(dataEl.textContent); } catch (e) { return; }
  if (!places || !places.length) return;

  /* --- theme-aware tiles ------------------------------------------------ */
  var LIGHT = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
  var DARK  = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  var ATTR  = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  function prefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function isDark() {
    var t = document.documentElement.getAttribute('data-theme');
    if (t === 'dark') return true;
    if (t === 'light') return false;
    return prefersDark();
  }

  var map = L.map(el, {
    scrollWheelZoom: false,   /* don't hijack page scroll; +/- and pinch still work */
    zoomControl: true,
    attributionControl: true
  });

  var tiles = L.tileLayer(isDark() ? DARK : LIGHT, {
    attribution: ATTR,
    subdomains: 'abcd',
    maxZoom: 19,
    detectRetina: true
  }).addTo(map);

  function syncTiles() {
    tiles.setUrl(isDark() ? DARK : LIGHT);
  }
  /* React to the site's toggle (sets data-theme on <html>)... */
  new MutationObserver(syncTiles).observe(document.documentElement, {
    attributes: true, attributeFilter: ['data-theme']
  });
  /* ...and to OS-level changes when the user hasn't forced a theme. */
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', syncTiles);
    else if (mq.addListener) mq.addListener(syncTiles);
  }

  /* --- markers ---------------------------------------------------------- */
  /* CSS-drawn pin (a div icon) so no marker image assets are needed and the
     pin colour can inherit the site accent. */
  var icon = L.divIcon({
    className: 'sg-pin',
    html: '<span class="sg-pin__dot"></span>',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -12]
  });

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var latlngs = [];
  places.forEach(function (p) {
    if (typeof p.lat !== 'number' || typeof p.lng !== 'number') return;
    var pos = [p.lat, p.lng];
    latlngs.push(pos);
    var html =
      '<div class="sg-pop">' +
        (p.chapter ? '<span class="sg-pop__kicker">' + esc(p.chapter) + '</span>' : '') +
        '<h3 class="sg-pop__title">' + esc(p.name) + '</h3>' +
        '<p class="sg-pop__body">' + esc(p.description) + '</p>' +
      '</div>';
    L.marker(pos, { icon: icon, title: p.name, riseOnHover: true })
      .addTo(map)
      .bindPopup(html, { closeButton: true, maxWidth: 280 });
  });

  /* Frame all the pins with a little breathing room. */
  if (latlngs.length > 1) {
    map.fitBounds(latlngs, { padding: [48, 48], maxZoom: 14 });
  } else if (latlngs.length === 1) {
    map.setView(latlngs[0], 14);
  } else {
    map.setView([1.3521, 103.8198], 11);   /* fallback: centre of Singapore */
  }

  /* Leaflet mis-measures when its container starts hidden or mid-transition. */
  setTimeout(function () { map.invalidateSize(); }, 200);
})();
