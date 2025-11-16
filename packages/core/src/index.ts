export type Listener<TState> = (next: Readonly<TState>) => void;

/**
 * Minimal reactive store used by the example app. Replace with your own logic later.
 */
export class AvocadoStore<TState> {
  private state: TState;
  private listeners: Set<Listener<TState>> = new Set();

  constructor(initialState: TState) {
    this.state = initialState;
  }

  get snapshot(): Readonly<TState> {
    return this.state;
  }

  setState(updater: (prev: TState) => TState): void {
    this.state = updater(this.state);
    this.listeners.forEach(listener => listener(this.state));
  }

  subscribe(listener: Listener<TState>): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }
}

export const createStore = <TState>(initialState: TState): AvocadoStore<TState> => {
  return new AvocadoStore(initialState);
};
