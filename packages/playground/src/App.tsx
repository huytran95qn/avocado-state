import { useEffect, useState } from "react";
import { createStore } from "@avocado-state/core";

const counterStore = createStore({ count: 0 });

function App() {
  const [count, setCount] = useState(counterStore.snapshot.count);

  useEffect(() => {
    return counterStore.subscribe(next => setCount(next.count));
  }, []);

  const increment = () => {
    counterStore.setState(prev => ({ count: prev.count + 1 }));
  };

  return (
    <main style={{ display: "grid", gap: "1rem", placeItems: "center", minHeight: "100vh" }}>
      <h1>Avocado State Playground</h1>
      <p>The value comes directly from the local library package.</p>
      <button onClick={increment} style={{ fontSize: "1.25rem", padding: "0.75rem 1.5rem" }}>
        Count is {count}
      </button>
    </main>
  );
}

export default App;
