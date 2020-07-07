import React, { useState } from "react";

function App() {
  const [count, setCounter] = useState(0);
  return (
    <div className="app">
      <div className="container">
        <div className="alert alert-primary" role="alert">
          A simple alert
        </div>
      </div>
      <p>hey it's me react {count}</p>
      <button onClick={() => setCounter(count + 1)}>Inc</button>
    </div>
  );
}

export default App;
