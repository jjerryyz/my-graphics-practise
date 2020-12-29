export default class Timing {
  constructor({ duration, iterations, easing= p=>p }) {
    this.startTime = Date.now();
    this.duration = duration;
    this.iterations = iterations;
    this.easing = easing;
  }

  get time() {
    return Date.now() - this.startTime;
  }

  get p() {
    const progress = Math.min(this.time / this.duration, this.iterations);
    return this.isFinished ? 1 : this.easing(progress%1);
  }

  get isFinished() {
    return this.time / this.duration >= this.iterations;
  }
}
