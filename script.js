const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});
addEventListener('click', () => init());

const randomRangeInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const colors = ['#090347', '#072775', '#9C0029', '#E81401', '#F75C01'];

let gravity = 1;
let friction = 0.5;
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    if (
      this.x + this.radius + this.dx > canvas.width ||
      this.x - this.radius <= 0
    ) {
      this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }
}

let ball;
let ballArr = [];

const init = () => {
  ballArr = [];
  for (let i = 0; i < 200; i++) {
    const radius = randomRangeInt(8, 20);
    const x = randomRangeInt(radius, canvas.width - radius);
    const y = randomRangeInt(0, canvas.height - radius);
    const dx = randomRangeInt(-2, 2);
    const dy = randomRangeInt(-2, 2);
    ballArr.push(
      new Ball(
        x,
        y,
        dx,
        dy,
        radius,
        colors[Math.floor(Math.random() * colors.length)]
      )
    );
  }
};

const animate = () => {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < ballArr.length; i++) {
    ballArr[i].update();
  }
};

init();

animate();
