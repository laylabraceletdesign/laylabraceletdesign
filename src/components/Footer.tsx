import Link from "next/link";
import { Mail, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-bg-warm)",
        borderTop: "1px solid var(--color-border)",
        padding: "60px 24px 32px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "48px",
        }}
        className="footer-grid"
      >
        {/* Brand */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "12px",
              color: "var(--color-text)",
            }}
          >
            Layla Bracelet Design
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              maxWidth: "280px",
              marginBottom: "20px",
            }}
          >
            Handmade beaded bracelets crafted with care by a team of 14 artisans.
            Specializing in bulk & custom orders for every occasion.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <a
              href="mailto:hello@laylabraceletdesign.com"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.8125rem",
                color: "var(--color-accent)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              <Mail size={14} />
              Email Us
            </a>
            <a
              href="https://www.etsy.com/shop/laylabraceletdesign"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.8125rem",
                color: "var(--color-accent)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              <Sparkles size={14} />
              Etsy Shop
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              marginBottom: "16px",
            }}
          >
            Shop
          </h4>
          {[
            { href: "/shop", label: "All Products" },
            { href: "/shop?cat=name-bracelets", label: "Name Bracelets" },
            { href: "/shop?cat=friendship", label: "Friendship Bracelets" },
            { href: "/shop?cat=crystal-gemstone", label: "Crystal & Gemstone" },
            { href: "/shop?cat=faith-spiritual", label: "Faith & Spiritual" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                display: "block",
                fontSize: "0.875rem",
                color: "var(--color-text-muted)",
                textDecoration: "none",
                marginBottom: "10px",
                transition: "color 0.2s",
              }}
              className="footer-link"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* For Whom */}
        <div>
          <h4
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              marginBottom: "16px",
            }}
          >
            For
          </h4>
          {[
            { href: "/bulk-orders#schools", label: "Schools & Teachers" },
            { href: "/bulk-orders#corporate", label: "Corporate Events" },
            { href: "/bulk-orders#weddings", label: "Weddings & Parties" },
            { href: "/bulk-orders#sports", label: "Sports Teams" },
            { href: "/bulk-orders#faith", label: "Churches & Faith" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                display: "block",
                fontSize: "0.875rem",
                color: "var(--color-text-muted)",
                textDecoration: "none",
                marginBottom: "10px",
                transition: "color 0.2s",
              }}
              className="footer-link"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Info */}
        <div>
          <h4
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              marginBottom: "16px",
            }}
          >
            Info
          </h4>
          {[
            { href: "/about", label: "About Us" },
            { href: "/custom-design", label: "Custom Design" },
            { href: "/bulk-orders", label: "Bulk Orders" },
            { href: "/contact", label: "Contact" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                display: "block",
                fontSize: "0.875rem",
                color: "var(--color-text-muted)",
                textDecoration: "none",
                marginBottom: "10px",
                transition: "color 0.2s",
              }}
              className="footer-link"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "48px auto 0",
          paddingTop: "24px",
          borderTop: "1px solid var(--color-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
          © {new Date().getFullYear()} Layla Bracelet Design LLC. All rights reserved.
        </p>
        <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
          Handmade with ❤️ by our team of 14 artisans
        </p>
      </div>

      <style>{`
        .footer-link:hover { color: var(--color-accent) !important; }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
