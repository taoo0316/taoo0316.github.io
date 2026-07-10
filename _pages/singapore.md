---
layout: archive
title: "Singapore"
permalink: /singapore/
excerpt: "A map of the places I frequented most in my years on the island."
author_profile: true
---

```Places That Made My Singapore```

The map below traces a few of the places I frequented most across my years on the island — from the school that first took me in to the desk where I started working. Tap a pin for the story behind it.

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">

<style>
  #sg-map {
    width: 100%;
    height: 520px;
    max-height: 70vh;
    border: 1px solid var(--border);
    border-radius: 14px;
    box-shadow: var(--shadow);
    overflow: hidden;
    background: var(--bg-elev);
    z-index: 0;
  }
  @media (max-width: 600px) { #sg-map { height: 62vh; } }

  /* CSS-drawn pin in the site accent colour, with a gentle pulse. */
  .sg-pin__dot {
    display: block;
    width: 16px;
    height: 16px;
    margin: 3px;
    border-radius: 50%;
    background: var(--accent);
    border: 2px solid var(--bg);
    box-shadow: 0 0 0 2px var(--accent), 0 1px 4px rgba(0, 0, 0, 0.35);
  }
  .sg-pin:hover .sg-pin__dot { background: var(--accent-hover); }
  .sg-pin__dot::after {
    content: "";
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 2px solid var(--accent);
    opacity: 0.6;
    animation: sg-pulse 2.4s ease-out infinite;
  }
  @keyframes sg-pulse {
    0%   { transform: scale(0.7); opacity: 0.7; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .sg-pin__dot::after { animation: none; opacity: 0; }
  }

  /* Popup styled with the theme tokens so it matches light + dark. */
  .leaflet-popup-content-wrapper {
    background: var(--bg-elev);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 12px;
    box-shadow: var(--shadow);
  }
  .leaflet-popup-tip { background: var(--bg-elev); border: 1px solid var(--border); }
  .leaflet-popup-content { margin: 14px 16px; line-height: 1.5; }
  .leaflet-container a.leaflet-popup-close-button { color: var(--text-muted); }
  .sg-pop__kicker {
    display: inline-block;
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 2px;
  }
  .sg-pop__title { margin: 0 0 6px; font-size: 1.05rem; color: var(--text); }
  .sg-pop__body { margin: 0; color: var(--text-muted); font-size: 0.9rem; }

  /* Keep attribution legible on the dark basemap. */
  .leaflet-control-attribution {
    background: var(--bg-elev);
    color: var(--text-muted);
  }
  .leaflet-control-attribution a { color: var(--accent); }
</style>

<div id="sg-map" role="application" aria-label="Map of places in Singapore"></div>

<script type="application/json" id="sg-places">{{ site.data.singapore_places | jsonify }}</script>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="{{ base_path }}/assets/js/singapore-map.js?v={{ site.time | date: '%s' }}"></script>
