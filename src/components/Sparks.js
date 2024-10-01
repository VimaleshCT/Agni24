import React, { useEffect, useRef } from 'react';
import './Sparks.module.scss';

const config = {
  sparkFreq: 1,
  meanSparkWidth: 10,
  meanSparkHeight: 10,
  meanSparkLife: 200,
  meanSparkVelocity: [2, 100],
  sparkSizeVariation: 2,
  sparkBlink: 10,
  floorHeight: 0.15,
};

class Fire {
  constructor(ctx, canvas, config) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.r = 255;
    this.config = config;
    this.sparks = [];
    this.scrollY = 0; // Track scroll position
  }

  spark(x) {
    this.sparks.push(new Spark(this.ctx, x, this.canvas.height, this.config, this.scrollY)); // Pass scrollY to sparks
  }

  updateColor() {
    this.r += (Math.random() - 0.5) * 10;
    this.r = Math.round(Math.min(80, Math.max(60, this.r)));
  }

  update() {
    this.updateColor();

    for (let i = 0; i < this.sparks.length; i++) {
      if (this.sparks[i].update(this.scrollY)) { // Pass scrollY to update method
        this.sparks.splice(i, 1);
      }
    }
  }

  setScrollY(scrollY) {
    this.scrollY = scrollY; // Update scroll position
  }
}

class Spark {
  constructor(ctx, x, y, config, scrollY) {
    this.ctx = ctx;
    this.pos = [x, y];
    this.width =
      config.meanSparkWidth + (Math.random() - 0.5) * config.sparkSizeVariation;
    this.height = config.meanSparkHeight;
    this.v = [
      config.meanSparkVelocity[0] * (Math.random() - 0.5),
      -1 * config.meanSparkVelocity[1] * Math.random(),
    ];
    this.c = [
      Math.floor(Math.random() * 155) + 100,
      Math.floor(Math.random() * 80),
      0,
    ];
    this.life = this.lifeOrig = Math.floor(config.meanSparkLife * Math.random());
    this.config = config;
  }

  move() {
    for (let i = 0; i < 2; i++) {
      this.pos[i] += this.v[i] * (1 - this.life / this.lifeOrig);
    }
  }

  getAlpha(scrollY) {
    const maxAlpha = 1;
    const minAlpha = 0.1;
    const scrollFactor = Math.min(Math.max(scrollY / 500, 0), 1); // Adjust factor for your needs
    return scrollFactor * (maxAlpha - minAlpha) + minAlpha; // Map scroll to alpha
  }

  update(scrollY) {
    this.move();
    if (!(this.life--)) return true;
    this.ctx.beginPath();
    this.ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
    this.ctx.fillStyle = `rgba(${this.c[0]}, ${this.c[1]}, ${this.c[2]}, ${this.getAlpha(scrollY)})`; // Use scrollY for alpha
    this.ctx.fill();
  }
}

const Sparks = () => {
  const canvasRef = useRef(null);
  const fireRef = useRef(null);
  const isScrolling = useRef(false);

  const resize = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.height = document.body.offsetHeight;
      canvas.width = document.body.offsetWidth;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    resize();

    fireRef.current = new Fire(ctx, canvas, config); // Removed 'y' from constructor

    const loop = () => {
      requestAnimationFrame(loop);
      if (isScrolling.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireRef.current.update();
        for (let i = 0; i < config.sparkFreq; i++) {
          fireRef.current.spark(Math.random() * canvas.width);
        }
      }
    };

    loop();

    const handleScroll = () => {
      isScrolling.current = true;
      fireRef.current.setScrollY(window.scrollY); // Update the scrollY on scroll
      setTimeout(() => {
        isScrolling.current = false;
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className='padded'>
      <canvas ref={canvasRef} className='sparks-canvas'></canvas>
    </div>
  );
};

export default Sparks;
