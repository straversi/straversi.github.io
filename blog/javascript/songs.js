const songs = [
  {
    image: 'assets/songs/forever.jpg',
    link: 'https://open.spotify.com/track/0uwbhRjoItKPn4YLp0n4vd?si=41aad7239d4b4286'
  },
  {
    image: 'assets/songs/kimbal.jpg',
    link: 'https://open.spotify.com/track/6SMhT17J7qO0VD3UNXww8Q?si=6ff2c9a21ccf47cd'
  },
  {
    image: 'assets/songs/bored.jpg', 
    link: 'https://open.spotify.com/track/0PicuPCfXDJyyRtOR1ukGW?si=7d4995fb8d954de7'
  },
  {
    image: 'assets/songs/alrighty.jpeg',
    link: 'https://open.spotify.com/track/6OiRh4kttAs1YWglvTcYkB?si=43391ea1e69340c4'
  },
  {
    image: 'assets/songs/work-it.jpg',
    link: 'https://open.spotify.com/track/6WfL1pwMyFf3IvFWLnre4P?si=81bc4f0a51e54f0b'
  },
  {
    image: 'assets/songs/wilt.jpg',
    link: 'https://open.spotify.com/track/4CY8Je3F69ZSwBPU7ragRP?si=f962ed6f48704c5a'
  },
  {
    image: 'assets/songs/crawl.jpeg',
    link: 'https://open.spotify.com/track/3ZP4RA6HLfXqkdrSd3tVjP?si=311bff122fb84a90'
  },
  {
    image: 'assets/songs/plastic-beach.jpg',
    link: 'https://open.spotify.com/track/3a6PN6BRB8PP3ms48s7kU1?si=634f7901c6bd4ca3'
  },
  {
    image: 'assets/songs/spinners.jpg',
    link: 'https://open.spotify.com/track/2vLaES21zwbX1Rnmj56Bbb?si=c9234ea7cc164b93'
  },
  {
    image: 'assets/songs/the-dance.jpg',
    link: 'https://open.spotify.com/track/4XYQtNf5BxGeAiwR0YU2Gn?si=5925635a06c74c7d'
  },
  {
    image: 'assets/songs/helena.jpg',
    link: 'https://open.spotify.com/track/5dTHtzHFPyi8TlTtzoz1J9?si=9feda162aceb4af3'
  },
  {
    image: 'assets/songs/what-once-was.jpeg',
    link: 'https://open.spotify.com/track/1XrSjpNe49IiygZfzb74pk?si=b643a491102a4537'
  }
];

let currentSongs = songs.slice(0, 6);

function shuffle() {
  console.log('shuffling');
  // Filter out current songs and shuffle remaining songs
  const availableSongs = songs.filter(song => 
    !currentSongs.some(currentSong => currentSong.link === song.link)
  );
  availableSongs.sort(() => Math.random() - 0.5);
  
  // Take first 6 songs from shuffled available songs
  currentSongs = availableSongs.slice(0, 6);
  displaySongs(currentSongs);
}

function displaySongs(songs) {
  const songsContainer = document.querySelector('.songs');
  songsContainer.innerHTML = '';
  songs.forEach(song => {
    const songElement = document.createElement('a');
    songElement.href = song.link;
    songElement.target = '_blank';
    songElement.innerHTML = `<div class="song" style="background-image: url('${song.image}');"></div>`;
    songsContainer.appendChild(songElement);
  });
}

displaySongs(currentSongs);