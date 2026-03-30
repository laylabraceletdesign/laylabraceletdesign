"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/custom-design", label: "Custom Design" },
  { href: "/bulk-orders", label: "Bulk Orders" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        borderBottom: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "1.375rem",
            fontWeight: 600,
            color: "var(--color-text)",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Layla Bracelet Design
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-text-muted)",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "color 0.2s",
              }}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://www.etsy.com/shop/laylabraceletdesign"
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "var(--color-accent)",
              color: "white",
              padding: "8px 18px",
              borderRadius: "100px",
              fontSize: "0.8125rem",
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.02em",
              transition: "background-color 0.2s",
            }}
          >
            <ShoppingBag size={14} />
            Etsy Shop
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-text)",
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            backgroundColor: "var(--color-bg)",
            padding: "16px 24px 24px",
          }}
          className="mobile-menu"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                fontSize: "1rem",
                color: "var(--color-text)",
                textDecoration: "none",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://www.etsy.com/shop/laylabraceletdesign"
            target="_blank"
            onClick={() => setOpen(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "16px",
              backgroundColor: "var(--color-accent)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "100px",
              fontSize: "0.875rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <ShoppingBag size={14} />
            Visit Etsy Shop
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        .nav-link:hover { color: var(--color-accent) !important; }
      `}</style>
    </header>
  );
}
