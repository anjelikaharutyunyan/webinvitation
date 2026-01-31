(function () {
  var _id = "customCountdown";
  while (document.getElementById("timer" + _id)) _id = _id + "0";

  document.write(`
    <div id="timer${_id}" style="
      display: flex;
      gap: 20px;
      margin-left: 40px;
      font-family: 'Poiret One';
      color: #000;
      text-align: center;
    ">
      <div class="cc-block">
        <div class="cc-days" style="font-size: 30px;">00</div>
        <div style="font-size: 12px; margin-top: 4px; color:#434343;">Օր</div>
      </div>
      <div class="cc-block">
        <div class="cc-hours" style="font-size: 30px;">00</div>
        <div style="font-size: 12px; margin-top: 4px; color:#434343;">Ժամ</div>
      </div>
      <div class="cc-block">
        <div class="cc-min" style="font-size: 30px;">00</div>
        <div style="font-size: 12px; margin-top: 4px; color:#434343;">Րոպե</div>
      </div>
      <div class="cc-block">
        <div class="cc-sec" style="font-size: 30px;">00</div>
        <div style="font-size: 12px; margin-top: 4px; color:#434343;">Վրկ</div>
      </div>
    </div>
  `);

  // Load Poiret One font
  var font = document.createElement("link");
  font.rel = "stylesheet";
  font.href =
    "https://fonts.googleapis.com/css?family=Poiret+One&subset=latin,cyrillic";
  document.head.appendChild(font);

  // === TARGET DATE ===
  var targetDate = new Date("2026-08-22T00:00:00+04:00").getTime();

  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  function updateTimer() {
    var now = new Date().getTime();
    var diff = targetDate - now;
    if (diff <= 0) diff = 0;

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.querySelector("#timer" + _id + " .cc-days").textContent =
      pad(days);
    document.querySelector("#timer" + _id + " .cc-hours").textContent =
      pad(hours);
    document.querySelector("#timer" + _id + " .cc-min").textContent =
      pad(minutes);
    document.querySelector("#timer" + _id + " .cc-sec").textContent =
      pad(seconds);
  }

  setInterval(updateTimer, 1000);
  updateTimer();
})();
