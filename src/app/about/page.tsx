import Link from "next/link";
import { ArrowRight, Heart, Package, Star, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section
        style={{
          backgroundColor: "var(--color-bg-warm)",
          padding: "72px 24px 64px",
          borderBottom: "1px solid var(--color-border)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 600,
            color: "var(--color-text)",
            marginBottom: "20px",
          }}
        >
          Our Story
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--color-text-muted)",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.8,
          }}
        >
          Layla Bracelet Design started as a love for handmade jewelry and grew
          into a team of 14 passionate artisans creating custom bracelets for
          thousands of customers across the United States.
        </p>
      </section>

      {/* Values */}
      <section style={{ padding: "72px 24px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "32px",
            }}
            className="values-grid"
          >
            {[
              {
                icon: <Heart size={24} />,
                title: "Handmade With Love",
                desc: "Every bracelet is hand-crafted by a real person. No machines, no shortcuts.",
              },
              {
                icon: <Users size={24} />,
                title: "Team of 14 Artisans",
                desc: "Our growing team of 14 dedicated artisans ensures quality and fast turnaround.",
              },
              {
                icon: <Package size={24} />,
                title: "Bulk Specialists",
                desc: "We've fulfilled orders from 10 to 500+ pieces for every type of occasion.",
              },
              {
                icon: <Star size={24} />,
                title: "5-Star Rated",
                desc: "Hundreds of happy customers on Etsy have given us top-rated seller status.",
              },
            ].map((v) => (
              <div key={v.title} style={{ textAlign: "center" }}>
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
                  {v.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.0625rem",
                    fontWeight: 600,
                    marginBottom: "8px",
                    color: "var(--color-text)",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.65,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story section */}
      <section
        style={{
          padding: "72px 24px",
          backgroundColor: "var(--color-bg-warm)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "2rem",
              fontWeight: 600,
              marginBottom: "24px",
              color: "var(--color-text)",
            }}
          >
            From a Single Strand to a Full Team
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              fontSize: "1rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.8,
            }}
          >
            <p>
              What started as a passion project making friendship bracelets for
              friends and family quickly became something bigger. As word spread
              about the quality and customization options, orders started coming
              in from schools, event planners, and businesses across the country.
            </p>
            <p>
              Today, Layla Bracelet Design is a registered LLC with a team of 14
              artisans who put care and intention into every single bracelet. We
              specialize in bulk orders because we love the idea of one bracelet
              becoming a shared experience — whether that&apos;s a classroom
              bonding over matching name bracelets or a wedding party wearing
              matching gifts from the bride.
            </p>
            <p>
              Every bead is selected with care. Every knot tied by hand. Every
              order packed with love. That&apos;s the Layla promise.
            </p>
          </div>

          <div style={{ marginTop: "40px" }}>
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
              Shop Our Collection
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .values-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
