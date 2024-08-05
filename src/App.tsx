import Pages from "./pages/Pages";
import { BrowserRouter } from "react-router-dom";
// import styled from "styled-components";
// import { GiKnifeFork } from "react-icons/gi";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </div>
  );
}
