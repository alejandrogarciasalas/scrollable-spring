import React from "react";
import Footer from "./Footer";
import Hero from "./Hero";
import Quote from "./Quote";
import Rating from "./Rating";
import "./styles.css";
import ThreeDStore from "./util/ThreeDStore";

export default function App() {
  return (
    <div className="App">
      <ThreeDStore>
        <Hero />
        <Rating />
        <Quote />
        <Footer />
      </ThreeDStore>
    </div>
  );
}
