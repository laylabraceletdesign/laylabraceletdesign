import Link from "next/link";
import { PRODUCTS, SEGMENTS } from "@/lib/etsy-products";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Package, Star } from "lucide-react";

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 8);

  return (
    <div>
      {/* ─── HERO ─── */}
      <section
        style={{
          backgroundColor: "var(--color-bg-warm)",
          padding: "80px 24px 72px",
          textAlign: "center",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "16px",
            }}
          >
            Handmade · Customizable · Bulk Orders Welcome
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight: 600,
              lineHeight: 1.15,
              color: "var(--color-text)",
              marginBottom: "20px",
              letterSpacing: "-0.02em",
            }}
          >
            Beautiful Bracelets,
            <br />
            <em>Made for Every Occasion</em>
          </h1>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              marginBottom: "36px",
              maxWidth: "540px",
              margin: "0 auto 36px",
            }}
          >
            Custom beaded bracelets crafted by hand. Perfect for schools,
            corporate events, weddings, sports teams, churches, and birthday
            parties. Orders from 5 to 500+.
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/shop"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "white",
                padding: "13px 28px",
                borderRadius: "100px",
                fontSize: "0.9375rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Shop All Bracelets
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/bulk-orders"
              style={{
                backgroundColor: "white",
                color: "var(--color-text)",
                padding: "13px 28px",
                borderRadius: "100px",
                fontSize: "0.9375rem",
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid var(--color-border)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Package size={16} />
              Bulk Orders
            </Link>
          </div>

          {/* Trust badges */}
          <div
            style={{
              display: "flex",
              gap: "32px",
              justifyContent: "center",
              marginTop: "48px",
              flexWrap: "wrap",
            }}
          >
            {[
              { stat: "500+", label: "Orders Completed" },
              { stat: "32", label: "Bracelet Styles" },
              { stat: "14", label: "Artisan Team" },
              { stat: "5★", label: "Etsy Rating" },
            ].map((b) => (
              <div key={b.stat} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "var(--color-accent)",
                    lineHeight: 1,
                  }}
                >
                  {b.stat}
                </div>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--color-text-muted)",
                    marginTop: "4px",
                  }}
                >
                  {b.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEGMENT CARDS ─── */}
      <section style={{ padding: "72px 24px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                fontWeight: 600,
                color: "var(--color-text)",
                marginBottom: "12px",
              }}
            >
              Who We Make For
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--color-text-muted)",
                maxWidth: "480px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              From classrooms to boardrooms, our bracelets bring people
              together.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
            className="segment-grid"
          >
            {SEGMENTS.map((seg) => (
              <Link
                key={seg.id}
                href={`/bulk-orders#${seg.id}`}
                style={{
                  backgroundColor: seg.color,
                  padding: "28px 24px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  display: "block",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  border: "1px solid transparent",
                }}
                className="segment-card"
              >
                <div style={{ fontSize: "2rem", marginBottom: "10px" }}>
                  {seg.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.0625rem",
                    fontWeight: 600,
                    color: "var(--color-text)",
                    marginBottom: "8px",
                  }}
                >
                  {seg.label}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {seg.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section
        style={{
          padding: "72px 24px",
          backgroundColor: "var(--color-bg-warm)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "40px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                  fontWeight: 600,
                  color: "var(--color-text)",
                  marginBottom: "8px",
                }}
              >
                Featured Bracelets
              </h2>
              <p
                style={{ fontSize: "1rem", color: "var(--color-text-muted)" }}
              >
                A selection of our most popular styles
              </p>
            </div>
            <Link
              href="/shop"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: "var(--color-accent)",
                textDecoration: "none",
              }}
            >
              View All 32 Styles
              <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "28px",
            }}
            className="product-grid"
          >
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ padding: "72px 24px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                fontWeight: 600,
                color: "var(--color-text)",
                marginBottom: "12px",
              }}
            >
              What Our Customers Say
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
            className="reviews-grid"
          >
            {[
              {
                name: "Sarah M.",
                role: "3rd Grade Teacher",
                review:
                  "Ordered 28 name bracelets for my class — every single one was perfect. The kids absolutely loved them! Will order again for next year.",
                stars: 5,
              },
              {
                name: "Jennifer K.",
                role: "Event Planner",
                review:
                  "Used Layla for 150 wedding favors. Communication was excellent, turnaround was fast, and the bracelets were beautiful. Highly recommend!",
                stars: 5,
              },
              {
                name: "Coach Rodriguez",
                role: "High School Soccer Coach",
                review:
                  "Got team bracelets in our school colors for end-of-season. The girls loved them. Great quality for the price and arrived on time.",
                stars: 5,
              },
            ].map((r) => (
              <div
                key={r.name}
                style={{
                  backgroundColor: "var(--color-bg-warm)",
                  padding: "28px",
                  borderRadius: "12px",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "3px",
                    marginBottom: "14px",
                  }}
                >
                  {[...Array(r.stars)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill="var(--color-accent)"
                      color="var(--color-accent)"
                    />
                  ))}
                </div>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--color-text)",
                    lineHeight: 1.7,
                    marginBottom: "16px",
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{r.review}&rdquo;
                </p>
                <div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--color-text)",
                    }}
                  >
                    {r.name}
                  </p>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {r.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BULK CTA ─── */}
      <section
        style={{
          padding: "72px 24px",
          backgroundColor: "var(--color-bg-blush)",
          borderTop: "1px solid var(--color-border)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 600,
              color: "var(--color-text)",
              marginBottom: "16px",
            }}
          >
            Need a Bulk Order?
          </h2>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              marginBottom: "36px",
            }}
          >
            We specialize in custom orders from 10 to 500+ pieces. Tell us your
            colors, text, and quantity — we&apos;ll handle the rest.
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/custom-design"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "white",
                padding: "13px 28px",
                borderRadius: "100px",
                fontSize: "0.9375rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Start Custom Order
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              style={{
                backgroundColor: "white",
                color: "var(--color-text)",
                padding: "13px 28px",
                borderRadius: "100px",
                fontSize: "0.9375rem",
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid var(--color-border)",
              }}
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .segment-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
        }
        @media (max-width: 900px) {
          .segment-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .reviews-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .segment-grid { grid-template-columns: 1fr !important; }
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
        }
      `}</style>
    </div>
  );
}
