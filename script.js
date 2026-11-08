const title = document.querySelector("#pixel-title");
const glyphs = {
  p: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  w: ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
  q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
  ".": ["000", "000", "000", "000", "000", "110", "110"],
  c: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  a: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  t: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
};
let cursor = 0;
for (const [index, letter] of [..."pwq.cat"].entries()) {
  const rows = glyphs[letter];
  for (const [y, row] of rows.entries()) {
    for (const [x, pixel] of [...row].entries()) {
      if (pixel !== "1") continue;
      const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      square.setAttribute("x", cursor + x);
      square.setAttribute("y", y + 1);
      square.setAttribute("width", "1");
      square.setAttribute("height", "1");
      square.setAttribute("fill", index > 2 ? "var(--accent)" : "var(--ink)");
      title.append(square);
    }
  }
  cursor += rows[0].length + 2;
}
title.setAttribute("viewBox", `0 0 ${cursor - 2} 9`);

const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const dayIcon = themeIcon.innerHTML;
const nightIcon = '<path d="M7 1h7v3h3v3h2v7h-3v3H5v-3H2V7h3V4h2z" fill="currentColor"/><path d="M7 1h8v3h3v7h-7V8H7z" fill="var(--paper)"/>';

function setTheme(night) {
  root.dataset.theme = night ? "night" : "day";
  toggle.setAttribute("aria-pressed", String(night));
  toggle.setAttribute("aria-label", night ? "Switch to day" : "Switch to night");
  themeIcon.innerHTML = night ? nightIcon : dayIcon;
  document.querySelector('meta[name="theme-color"]').content = night ? "#222f30" : "#f7f5e9";
}

try { setTheme(localStorage.getItem("pwq-theme") === "night"); } catch { /* 本地文件或禁用存储时，使用默认白天。 */ }
toggle.addEventListener("click", () => {
  const night = root.dataset.theme !== "night";
  setTheme(night);
  try { localStorage.setItem("pwq-theme", night ? "night" : "day"); } catch { /* 切换效果不依赖存储。 */ }
});

const cat = document.querySelector(".cat-button");
let petTimer;
function petCat() {
  clearTimeout(petTimer);
  cat.classList.remove("is-petted");
  void cat.offsetWidth;
  cat.classList.add("is-petted");
  petTimer = setTimeout(() => cat.classList.remove("is-petted"), 1500);
}
cat.addEventListener("click", petCat);
document.querySelector(".pet-button").addEventListener("click", petCat);
document.querySelector("#year").textContent = new Date().getFullYear();
