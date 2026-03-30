"use client";
import Image from "next/image";
import Link from "next/link";
import { EtsyProduct } from "@/lib/etsy-products";

interface Props {
  product: EtsyProduct;
}

export default function ProductCard({ product }: Props) {
  const img1 = product.images[0];
  const img2 = product.images[1] || product.images[0];

  return (
    <div
      className="product-card"
      style={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      {/* Image container */}
      <Link
        href={product.etsy_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", display: "block" }}
      >
        <div
          style={{
            position: "relative",
            aspectRatio: "1 / 1",
            overflow: "hidden",
            backgroundColor: "var(--color-bg-blush)",
            borderRadius: "4px",
          }}
        >
          <Image
            src={img1}
            alt={product.shortTitle}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: "cover" }}
            className="product-img-primary"
          />
          <Image
            src={img2}
            alt={product.shortTitle + " - alternate view"}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: "cover" }}
            className="product-img-secondary"
          />
          {product.customizable && (
            <span
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                backgroundColor: "white",
                color: "var(--color-accent)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                padding: "3px 8px",
                borderRadius: "100px",
                textTransform: "uppercase",
              }}
            >
              Customizable
            </span>
          )}
        </div>

        {/* Product info */}
        <div style={{ padding: "12px 0 0" }}>
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--color-text-muted)",
              marginBottom: "4px",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            {product.category
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          </p>
          <h3
            style={{
              fontSize: "0.9375rem",
              fontWeight: 500,
              color: "var(--color-text)",
              marginBottom: "6px",
              lineHeight: 1.4,
              fontFamily: "var(--font-playfair)",
            }}
          >
            {product.shortTitle}
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: "var(--color-text)",
              }}
            >
              From ${product.price.toFixed(2)}
            </span>
            <span
              style={{
                fontSize: "0.8125rem",
                color: "var(--color-text-muted)",
              }}
            >
              (min. {product.minOrder})
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
