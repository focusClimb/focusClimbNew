export class Subject<T> {
  private readonly subscribers: { (data: T): void; } [];

  constructor() {
    this.subscribers = [];
  }

  subscribe(func: (...args) => void): number {
    return this.subscribers.push(func) - 1;
  }

  unsubscribe(index: number): void {
    this.subscribers.splice(index, 1);
  }

  next(data: T) {
    for (const subscriber of this.subscribers ) {
      subscriber(data);
    }
  }
}
