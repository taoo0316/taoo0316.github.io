/* Types out the fake terminal session on the 404 page. The markup already
   contains the finished session as a static fallback (for no-JS / reduced
   motion), so this only runs to animate it. Kept in an external file on
   purpose: the theme's compress_html strips newlines from inline <script>,
   which silently breaks any inline JS. */
(function () {
  var el = document.getElementById('term404-body');
  if (!el) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return; /* leave the static, already-rendered session in place */

  var prompt = '<span class="g">guest@zhuwentao.net</span>:<span class="b">~</span>$ ';
  var cursor = '<span class="term404__cur"></span>';
  var lines = [
    { cmd: 'cd /the-page-you-wanted', out: '<span class="r">cd: no such file or directory: 404</span>' },
    { cmd: 'whereis it', out: '<span class="m">it: not on this server, and possibly not in this timeline.</span>' }
  ];

  var done = '';
  function typeLine(i) {
    if (i >= lines.length) { el.innerHTML = done + prompt + cursor; return; }
    var line = lines[i], j = 0;
    (function tick() {
      el.innerHTML = done + prompt + line.cmd.slice(0, j) + cursor;
      if (j < line.cmd.length) { j++; setTimeout(tick, 55); }
      else { done += prompt + line.cmd + '\n' + line.out + '\n\n'; setTimeout(function () { typeLine(i + 1); }, 700); }
    })();
  }

  el.innerHTML = '';
  typeLine(0);
})();
