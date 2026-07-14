async function loadCurrentlyReading() {
  const container = document.getElementById('currently-reading');
  if (!container) return;

  try {
    const res = await fetch('https://api.steven.codes/currently-reading');
    if (!res.ok) {
      hideCurrentlyReading(container);
      return;
    }

    const data = await res.json();
    if (!data.book) {
      hideCurrentlyReading(container);
      return;
    }

    const { name, author, image } = data.book;
    const label = data.status === 'just-finished' ? 'Just finished' : 'Currently reading';
    container.classList.remove('currently-playing--loading');
    container.removeAttribute('aria-busy');
    container.hidden = false;
    container.innerHTML = `
      <img class="currently-playing-art" src="${escapeReadingAttr(image)}" alt="" />
      <div class="currently-playing-info">
        <div class="currently-playing-label">${label}</div>
        <div class="currently-playing-track">${escapeReadingHtml(name)}</div>
        <div class="currently-playing-artist">${escapeReadingHtml(author)}</div>
      </div>
    `;
  } catch {
    hideCurrentlyReading(container);
  }
}

function hideCurrentlyReading(container) {
  container.hidden = true;
  container.classList.remove('currently-playing--loading');
  container.removeAttribute('aria-busy');
}

function escapeReadingHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escapeReadingAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

loadCurrentlyReading();
