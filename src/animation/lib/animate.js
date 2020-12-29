import Timing from './timing.js';

export default class Animate {
  constructor({ duration, iterations, easing }) {
    this.timing = { duration, iterations, easing };
  }

  animate(target, update) {
    let frameIndex = 0;
    const timing = new Timing(this.timing);

    return new Promise((resolve) => {
      const next = () => {
        if (
          update({ target, frameIndex, timing }) !== false &&
          !timing.isFinished
        ) {
          requestAnimationFrame(next);
        } else {
          resolve(timing);
        }
        frameIndex++;
      };
      next();
    });
  }
}
