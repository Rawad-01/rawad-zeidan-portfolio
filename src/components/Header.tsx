"use client";
import { useState, useRef } from "react";
import { Arrow } from "./Arrow";
export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return (
    <header className="site-header">
      <a href="/" className="wordmark" aria-label="Rawad Zeidan home">
        <span className="monogram">
          rz<span>↗</span>
        </span>
        <span>
          Rawad Zeidan<span className="wordmark-sub">Systems × Stories</span>
        </span>
      </a>
      <button
        className="menu-button"
        ref={menuButton}
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <nav
        id="main-nav"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
            menuButton.current?.focus();
          }
        }}
        aria-label="Main navigation"
        className={open ? "nav is-open" : "nav"}
        onClick={() => setOpen(false)}
      >
        <a href="/#work">Selected work</a>
        <a href="/#lab">Creative lab</a>
        <a href="/#about">About</a>
        <a className="nav-contact" href="/#contact">
          Let’s talk <Arrow diagonal />
        </a>
      </nav>
    </header>
  );
}
