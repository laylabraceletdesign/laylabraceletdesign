import Link from "next/link";
import { SEGMENTS } from "@/lib/etsy-products";
import { ArrowRight, Package, Clock, Palette, MessageCircle } from "lucide-react";

export default function BulkOrdersPage() {
  return (
    <div>
      {/* Header */}
      <section
        style={{
          backgroundColor: "var(--color-bg-warm)",
          padding: "64px 24px 56px",
          borderBottom: "1px solid var(--color-border)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: "12px",
          }}
        >
          Minimum 10 Pieces · Up to 500+
        </p>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 600,
            color: "var(--color-text)",
            marginBottom: "16px",
          }}
        >
          Bulk & Custom Orders
        </h1>
        <p
          style={{
            fontSize: "1.0625rem",
            color: "var(--color-text-muted)",
            maxWidth: "560px",
            margin: "0 auto 36px",
            lineHeight: 1.7,
          }}
        >
          We specialize in making bracelets for groups of all sizes. Tell us
          what you need and our team of 14 artisans will bring your vision to
          life.
        </p>
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
          Start Your Order
          <ArrowRight size={16} />
        </Link>
      </section>

      {/* How It Works */}
      <section style={{ padding: "72px 24px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "2rem",
              fontWeight: 600,
              textAlign: "center",
              marginBottom: "48px",
              color: "var(--color-text)",
            }}
          >
            How Bulk Orders Work
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "32px",
            }}
            className="steps-grid"
          >
            {[
              {
                icon: <MessageCircle size={24} />,
                step: "1",
                title: "Tell Us Your Vision",
                desc: "Share your colors, text, quantity, and any special requirements via our custom design form or Etsy message.",
              },
              {
                icon: <Palette size={24} />,
                step: "2",
                title: "We Design a Sample",
                desc: "Our team creates a digital proof for your approval. We revise until it's exactly right.",
              },
              {
                icon: <Package size={24} />,
                step: "3",
                title: "Handmade With Care",
                desc: "Your order is hand-crafted by our team of 14 artisans with attention to every detail.",
              },
              {
                icon: <Clock size={24} />,
                step: "4",
                title: "Fast Delivery",
                desc: "Orders typically ship within 5–10 business days depending on quantity and customization.",
              },
            ].map((s) => (
              <div key={s.step} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-bg-blush)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    color: "var(--color-accent)",
                  }}
                >
                  {s.icon}
                </div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "var(--color-accent)",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                  }}
                >
                  Step {s.step}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.0625rem",
                    fontWeight: 600,
                    color: "var(--color-text)",
                    marginBottom: "8px",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segment Sections */}
      <section
        style={{
          padding: "72px 24px",
          backgroundColor: "var(--color-bg-warm)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "2rem",
              fontWeight: 600,
              textAlign: "center",
              marginBottom: "16px",
              color: "var(--color-text)",
            }}
          >
            We Specialize In
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "var(--color-text-muted)",
              marginBottom: "56px",
              fontSize: "1rem",
            }}
          >
            Whether it&apos;s 10 or 500, we have experience serving every type
            of group.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "24px",
            }}
            className="segment-detail-grid"
          >
            {SEGMENTS.map((seg) => (
              <div
                key={seg.id}
                id={seg.id}
                style={{
                  backgroundColor: seg.color,
                  padding: "32px",
                  borderRadius: "16px",
                  display: "flex",
                  gap: "20px",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ fontSize: "2.5rem", lineHeight: 1 }}>
                  {seg.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.1875rem",
                      fontWeight: 600,
                      color: "var(--color-text)",
                      marginBottom: "8px",
                    }}
                  >
                    {seg.label}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      color: "var(--color-text-muted)",
                      lineHeight: 1.65,
                      marginBottom: "16px",
                    }}
                  >
                    {seg.description}
                  </p>
                  <Link
                    href="/custom-design"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--color-accent)",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    Order for {seg.label.split(" ")[0]}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing table */}
      <section style={{ padding: "72px 24px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "2rem",
              fontWeight: 600,
              marginBottom: "16px",
              color: "var(--color-text)",
            }}
          >
            Pricing Guide
          </h2>
          <p
            style={{
              color: "var(--color-text-muted)",
              marginBottom: "40px",
              fontSize: "1rem",
            }}
          >
            Larger orders get better per-unit pricing. All prices include
            customization.
          </p>
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {[
              { qty: "10–24 pieces", price: "$4.50–$9.00 / each" },
              { qty: "25–49 pieces", price: "$3.75–$7.50 / each" },
              { qty: "50–99 pieces", price: "$3.25–$6.50 / each" },
              { qty: "100–499 pieces", price: "$2.75–$5.50 / each" },
              { qty: "500+ pieces", price: "Contact for quote" },
            ].map((row, i) => (
              <div
                key={row.qty}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "16px 24px",
                  backgroundColor:
                    i % 2 === 0 ? "white" : "var(--color-bg-warm)",
                  borderBottom:
                    i < 4 ? "1px solid var(--color-border)" : "none",
                  fontSize: "0.9375rem",
                }}
              >
                <span style={{ color: "var(--color-text)", fontWeight: 500 }}>
                  {row.qty}
                </span>
                <span
                  style={{
                    color: "var(--color-accent)",
                    fontWeight: 600,
                  }}
                >
                  {row.price}
                </span>
              </div>
            ))}
          </div>
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--color-text-muted)",
              marginTop: "16px",
            }}
          >
            Final pricing depends on style, materials, and customization.
            Contact us for an exact quote.
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .segment-detail-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
