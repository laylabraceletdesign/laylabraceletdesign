"use client";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function CustomDesignPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    quantity: "",
    occasion: "",
    colors: "",
    text: "",
    deadline: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.quantity) return;

    const message = encodeURIComponent(
      `Hi! I'd like to place a custom bracelet order.\n\nName: ${formData.name}\nEmail: ${formData.email}\nQuantity: ${formData.quantity}\nOccasion: ${formData.occasion}\nColors: ${formData.colors}\nText: ${formData.text}\nDeadline: ${formData.deadline}\nNotes: ${formData.notes}`
    );
    window.open(
      `https://www.etsy.com/conversations/new?to=laylabraceletdesign&message=${message}`,
      "_blank"
    );
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid var(--color-border)",
    fontSize: "0.9375rem",
    color: "var(--color-text)",
    backgroundColor: "white",
    outline: "none",
    fontFamily: "var(--font-inter)",
  } as const;

  const labelStyle = {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "var(--color-text)",
    marginBottom: "6px",
  } as const;

  return (
    <div>
      <section
        style={{
          backgroundColor: "var(--color-bg-warm)",
          padding: "64px 24px 56px",
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
            marginBottom: "16px",
          }}
        >
          Design Your Custom Order
        </h1>
        <p
          style={{
            fontSize: "1.0625rem",
            color: "var(--color-text-muted)",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Fill out the form below and we&apos;ll respond within 24 hours with a
          quote and design options.
        </p>
      </section>

      <section style={{ padding: "64px 24px 80px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          {submitted ? (
            <div
              style={{
                textAlign: "center",
                padding: "64px 32px",
                backgroundColor: "var(--color-bg-warm)",
                borderRadius: "16px",
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-bg-blush)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  color: "var(--color-accent)",
                }}
              >
                <Check size={28} />
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.75rem",
                  fontWeight: 600,
                  marginBottom: "12px",
                  color: "var(--color-text)",
                }}
              >
                Request Sent!
              </h2>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                }}
              >
                Your message has been sent to our Etsy shop. We&apos;ll respond
                within 24 hours with a quote and design options. Thank you!
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
                className="form-row"
              >
                <div>
                  <label style={labelStyle}>Your Name *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    style={inputStyle}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
                className="form-row"
              >
                <div>
                  <label style={labelStyle}>Quantity *</label>
                  <input
                    name="quantity"
                    type="number"
                    min="10"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g. 50"
                    style={inputStyle}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Occasion</label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="">Select occasion…</option>
                    <option>School / Classroom</option>
                    <option>Corporate Event</option>
                    <option>Wedding / Party</option>
                    <option>Sports Team</option>
                    <option>Church / Faith Group</option>
                    <option>Birthday Party</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Preferred Colors</label>
                <input
                  name="colors"
                  value={formData.colors}
                  onChange={handleChange}
                  placeholder="e.g. blue and gold, pastel pink, rainbow…"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Text or Name to Include</label>
                <input
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  placeholder="e.g. Class of 2025, individual names, BFF…"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Needed By Date</label>
                <input
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Additional Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any other details, inspirations, or special requests…"
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "white",
                  padding: "14px 28px",
                  borderRadius: "100px",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "background-color 0.2s",
                  alignSelf: "flex-start",
                }}
              >
                Send Custom Order Request
                <ArrowRight size={16} />
              </button>

              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-muted)",
                }}
              >
                * This will open our Etsy message form with your details
                pre-filled.
              </p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 480px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
        input:focus, textarea:focus, select:focus {
          border-color: var(--color-accent) !important;
          box-shadow: 0 0 0 3px rgba(196, 99, 74, 0.12);
        }
      `}</style>
    </div>
  );
}
