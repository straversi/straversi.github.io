const links = document.querySelectorAll('#links > *');
for (let i = 0; i < links.length; i++) {
  const link = links[i];
  const letters = link.children[0].children;
  link.addEventListener('mouseenter', () => {
    console.log('hi');
    let hovered = true;
    link.addEventListener('mouseleave', () => {
      console.log('bye');
      hovered = false;
    });
    console.log(letters);
    const wiggle: FrameRequestCallback = (ts: number) => {
      for (let j = 0; j < letters.length; j++) {
        const letter = letters[j];
        (letter as HTMLElement).style.top = `${10 * Math.sin(ts/100+j)}px`;
      }
      if (hovered) {
        requestAnimationFrame(wiggle);
      }
    }
    requestAnimationFrame(wiggle);
  });
}