async function beginTrashPickup() {
  const trashPile = [
    ...Array.from(document.querySelectorAll('.theme-card')).map(el => el.parentElement),
    ...Array.from(document.querySelectorAll('.song')).map(el => el.parentElement),
    document.querySelector('.links'),
    ...document.querySelectorAll('button'),
    document.querySelector('.site-title'),
    document.querySelector('.site-hook'),
  ];
  // randomize the trash pile
  trashPile.sort(() => Math.random() - 0.5);
  for (const el of trashPile) {
    takeOutTheTrash(el);
    await new Promise(r => setTimeout(r, Math.random() * 1000 + 500));
  }
}

async function takeOutTheTrash(el) {
  const truck = new GarbageTruck(el);
  await truck.moveIn();
  await truck.pickUpTrash();
  await truck.goToDump();
}

class GarbageTruck {
  constructor(el) {
    this.trash = el;
    this.truck = document.createElement('div');
    this.truck.classList.add('garbage-truck');
    this.speed = 3;
    this.beep = new Audio('/blog/assets/garbage/beep.mp3');
    this.load = new Audio('/blog/assets/garbage/load.mp3');
    this.bye = new Audio('/blog/assets/garbage/bye.mp3');
    this.bye.volume = 0.5;
  }

  async moveIn() {
    // Get the page XY coords of the bottom-right corner of the trash
    const stopPoint = () => {
      const trashRect = this.trash.getBoundingClientRect();
      return trashRect.left + trashRect.width - 100;
    }
    const trashRect = this.trash.getBoundingClientRect();
    const fixed = anyAncestorIsFixed(this.trash);
    // get the trash's y-value from scroll height 
    let trashY;
    if (fixed) {
      trashY = trashRect.bottom - 100;
    } else {
      trashY = this.trash.offsetTop + trashRect.height - 100;
    }
    this.trash.style.left = '0px';
    this.trash.classList.add('garbage');

    // Move the truck to the right of the trash, just off screen
    document.body.appendChild(this.truck);
    this.truck.style.top = `${trashY}px`;
    this.truck.style.left = `${window.innerWidth}px`;
    this.truck.style.position = fixed ? 'fixed' : 'absolute';

    await new Promise(r => requestAnimationFrame(r));
    this.beep.play();
    while (parsePxValue(this.truck.style.left) > stopPoint()) {
      this.truck.style.left = `${parsePxValue(this.truck.style.left) - this.speed}px`;
      await new Promise(r => requestAnimationFrame(r));
    }
    this.beep.pause();
  }

  async pickUpTrash() {
    this.load.play();
    this.trash.classList.add('garbage-tilt');
    await new Promise(r => setTimeout(r, 1000));
  }

  async goToDump() {
    this.bye.play();
    while (parsePxValue(this.trash.style.left) < window.innerWidth) {
      this.trash.style.left = `${parsePxValue(this.trash.style.left) + this.speed}px`;
      this.truck.style.left = `${parsePxValue(this.truck.style.left) + this.speed}px`;
      await new Promise(r => requestAnimationFrame(r));
    }
    this.bye.pause();
  }
}

function parsePxValue(pxString) {
  return parseInt(pxString.replace('px', ''));
}

function anyAncestorIsFixed(el) {
  while (el) {
    if (getComputedStyle(el).position === 'fixed') {
      return true;
    }
    el = el.parentElement;
  }
  return false;
}