async function loadCurrentlyPlaying() {
  const container = document.getElementById('currently-playing');
  if (!container) return;

  try {
    const res = await fetch('https://api.steven.codes/currently-playing');
    if (!res.ok) {
      hideCurrentlyPlaying(container);
      return;
    }

    const data = await res.json();
    if (!data.track) {
      hideCurrentlyPlaying(container);
      return;
    }

    const { name, artist, albumArtwork, songUrl, artistUrl } = data.track;
    const label = data.isPlaying ? 'Now playing' : 'Recently played';
    container.classList.remove('currently-playing--loading');
    container.removeAttribute('aria-busy');
    container.hidden = false;
    container.innerHTML = `
      <a class="currently-playing-link" href="${escapeAttr(songUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeAttr(name)} on Spotify"></a>
      <img class="currently-playing-art" src="${escapeAttr(albumArtwork)}" alt="" />
      <div class="currently-playing-info">
        <div class="currently-playing-label">${escapeHtml(label)}</div>
        <a class="currently-playing-track" href="${escapeAttr(songUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(name)}</a>
        <a class="currently-playing-artist" href="${escapeAttr(artistUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(artist)}</a>
      </div>
    `;
  } catch {
    hideCurrentlyPlaying(container);
  }
}

function hideCurrentlyPlaying(container) {
  container.hidden = true;
  container.classList.remove('currently-playing--loading');
  container.removeAttribute('aria-busy');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

loadCurrentlyPlaying();
