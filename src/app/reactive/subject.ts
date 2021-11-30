import { cloneDeep } from 'lodash-es';
export class Subject<T> {
  private readonly subscribers = new Map();

  subscribe(func: (...args) => void): symbol {
    const key = Symbol();
    this.subscribers.set(key, func);
    return key;
  }

  unsubscribe(key: symbol): boolean {
    return this.subscribers.delete(key);
  }

  next(data: T): void {
    for (const subscriber of this.subscribers.values()) {
      subscriber(cloneDeep(data));
    }
  }
}
