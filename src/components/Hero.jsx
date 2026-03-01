import React from "react";

export default function Hero() {
  return (
    <section className="hero " id="home">
      <div className="hero-banner">
        <h1>continue exploring</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          explicabo debitis est autem dicta.
        </p>
        <a
          href="#tours"
          className="btn bg-white uppercase p-5 shadow-lg text-cyan-600 tracking-wider border border-white hover:bg-opacity-0 hero-btn"
        >
          explore tours
        </a>
      </div>
    </section>
  );
}
