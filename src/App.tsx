import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Counter } from "./features/counter/Counter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center">
      <header className="app-header flex flex-col justify-center items-center min-h-screen bg-gray-800 text-white">
        <img
          src={logo}
          className="pointer-events-none h-96 animate-spin-slow"
          alt="logo"
        />
        <p>Hello Vite + React!</p>
        <Counter />
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="text-blue-500"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
