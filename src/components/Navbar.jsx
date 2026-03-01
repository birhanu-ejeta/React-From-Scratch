import React from "react";
import { dataLinksPage, socialLinks } from "../data";
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-center ">
        <div className="nav-header">
          <img src="logo.svg" className="nav-logo" alt="" />
          <button type="button" className="nav-toggle" id="nav-toggle">
            <i className="fas fa-bars"></i>
          </button>
        </div>
        {/* <!-- left this comment on purpose --> */}
        <ul
          className="nav-links flex space-x-5 text-slate-900 tracking-widest  font-thin text-lg"
          id="nav-links"
        >
          {dataLinksPage.map((link) => {
            return (
              <li key={link.id}>
                <a href={link.href} className="nav-link">
                  {" "}
                  {link.text}{" "}
                </a>
              </li>
            );
          })}
        </ul>

        <ul className="nav-icons ">
          {socialLinks.map((link) => {
            return (
              <li key={link.id}>
                <a href={link.href} target="_blank" className="nav-icon">
                  <i className={link.icon}></i>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
