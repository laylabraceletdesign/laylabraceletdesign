"use client";
import { useState } from "react";
import { Mail, MessageCircle, Clock, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) return;
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\n${formData.message}`
    );
    window.open(`mailto:hello@laylabraceletdesign.com?subject=${encodeURIComponent(formData.subject || "Inquiry from website")}&body=${body}`, "_blank");
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
      {/* Header */}
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
          Get in Touch
        </h1>
        <p
          style={{
            fontSize: "1.0625rem",
            color: "var(--color-text-muted)",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Questions about bulk orders, customization, or shipping? We&apos;d
          love to hear from you.
        </p>
      </section>

      <section style={{ padding: "64px 24px 80px", backgroundColor: "white" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "64px",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Contact info */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "1.375rem",
                fontWeight: 600,
                marginBottom: "24px",
                color: "var(--color-text)",
              }}
            >
              Contact Info
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                {
                  icon: <Mail size={18} />,
                  label: "Email",
                  value: "hello@laylabraceletdesign.com",
                  href: "mailto:hello@laylabraceletdesign.com",
                },
                {
                  icon: <MessageCircle size={18} />,
                  label: "WhatsApp",
                  value: "Chat with us directly",
                  href: "https://wa.me/19174950600",
                },
                {
                  icon: <Clock size={18} />,
                  label: "Response Time",
                  value: "Within 24 hours",
                  href: null,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: "var(--color-bg-blush)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-accent)",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--color-text-muted)",
                        marginBottom: "3px",
                      }}
                    >
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "0.9375rem",
                          color: "var(--color-accent)",
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p
                        style={{
                          fontSize: "0.9375rem",
                          color: "var(--color-text)",
                          fontWeight: 500,
                        }}
                      >
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Etsy link */}
            <div
              style={{
                marginTop: "36px",
                padding: "20px",
                backgroundColor: "var(--color-bg-blush)",
                borderRadius: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--color-text)",
                  marginBottom: "6px",
                }}
              >
                Prefer Etsy?
              </p>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-muted)",
                  marginBottom: "12px",
                  lineHeight: 1.6,
                }}
              >
                You can also message us directly through our Etsy shop.
              </p>
              <a
                href="https://www.etsy.com/shop/laylabraceletdesign"
                target="_blank"
                rel="noopener noreferrer"
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
                Visit Etsy Shop
                <ArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div
                style={{
                  padding: "48px 32px",
                  backgroundColor: "var(--color-bg-warm)",
                  borderRadius: "16px",
                  border: "1px solid var(--color-border)",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "2rem", marginBottom: "16px" }}>✅</p>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    marginBottom: "12px",
                    color: "var(--color-text)",
                  }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: "var(--color-text-muted)", lineHeight: 1.7 }}>
                  Your email client should have opened with your message. We&apos;ll
                  get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
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
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="">Select a topic…</option>
                    <option>Bulk Order Inquiry</option>
                    <option>Custom Design Question</option>
                    <option>Order Status</option>
                    <option>Shipping & Delivery</option>
                    <option>Something Else</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help…"
                    rows={6}
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
                    alignSelf: "flex-start",
                  }}
                >
                  Send Message
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
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
