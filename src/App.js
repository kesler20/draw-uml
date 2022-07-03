import Pages from "./pages/Pages";
import { BrowserRouter } from "react-router-dom";
// import styled from "styled-components";
// import { GiKnifeFork } from "react-icons/gi";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
