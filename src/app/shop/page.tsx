"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, CATEGORIES } from "@/lib/etsy-products";
import ProductCard from "@/components/ProductCard";
import { Suspense } from "react";

function ShopContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filtered =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Header */}
      <section
        style={{
          backgroundColor: "var(--color-bg-warm)",
          padding: "56px 24px 48px",
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
          {PRODUCTS.length} Styles Available
        </p>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 600,
            color: "var(--color-text)",
            marginBottom: "12px",
          }}
        >
          Shop All Bracelets
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--color-text-muted)",
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          Handmade, customizable, and available in bulk. Browse all styles and
          order directly on Etsy.
        </p>
      </section>

      {/* Category Filter */}
      <div
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid var(--color-border)",
          padding: "0 24px",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            gap: "0",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "16px 20px",
                fontSize: "0.875rem",
                fontWeight: 500,
                background: "none",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
                borderBottom:
                  activeCategory === cat.id
                    ? "2px solid var(--color-accent)"
                    : "2px solid transparent",
                color:
                  activeCategory === cat.id
                    ? "var(--color-accent)"
                    : "var(--color-text-muted)",
                transition: "color 0.2s",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <section
        style={{
          padding: "48px 24px 72px",
          backgroundColor: "white",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-muted)",
              marginBottom: "32px",
            }}
          >
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "32px",
            }}
            className="shop-grid"
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ color: "var(--color-text-muted)", fontSize: "1rem" }}>
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .shop-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .shop-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
        }
      `}</style>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ padding: "80px", textAlign: "center", color: "var(--color-text-muted)" }}>Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
