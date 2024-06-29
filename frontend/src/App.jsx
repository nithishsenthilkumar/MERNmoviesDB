import { useState } from "react";
import "./App.css";
import TopRatedMovies from "./Components/TopRatedMovies";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <TopRatedMovies />
      </div>
    </>
  );
}

export default App;
