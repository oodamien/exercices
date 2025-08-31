export class ClassTimer {
  private timerId: number | null = null;
  private duration: number = 1000;
  private startTime: number | null = null;
  private remainingTime: number = 0;

  constructor() {}

  pause(): void {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      const elapsed =
        new Date().getTime() - (this.startTime || new Date().getTime());
      this.remainingTime -= elapsed;
      this.timerId = null;
      this.startTime = null;
    }
  }

  resume(callback: () => void): void {
    if (this.timerId === null) {
      this.startTime = new Date().getTime();
      this.timerId = window.setTimeout(() => {
        callback();
        this.timerId = null;
      }, this.remainingTime);
    }
  }

  start(callback: () => void, duration: number): void {
    if (this.timerId === null) {
      this.duration = duration;
      this.remainingTime = duration;
      this.timerId = window.setTimeout(() => {
        callback();
        this.timerId = null;
      }, this.duration);
    }
  }

  stop(): void {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}
