import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";

export interface EmailData {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send email notification via LLM (simulated)
 * In production, integrate with a real email service like SendGrid, Mailgun, or AWS SES
 */
export async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    // Log the email for now (in production, use real email service)
    console.log(`[EMAIL] Sending to ${data.to}: ${data.subject}`);
    
    // Notify owner of important emails
    if (data.subject.includes("Order") || data.subject.includes("Inquiry")) {
      await notifyOwner({
        title: `Email Sent: ${data.subject}`,
        content: `Email sent to ${data.to}`,
      });
    }
    
    return true;
  } catch (error) {
    console.error("[EMAIL] Failed to send email:", error);
    return false;
  }
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail(
  customerEmail: string,
  customerName: string,
  orderNumber: string,
  totalAmount: string,
  items: any[]
): Promise<boolean> {
  const itemsHtml = items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">Product #${item.productId}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">x${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">$${(Number(item.price) * item.quantity).toFixed(2)}</td>
    </tr>
  `
    )
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Order Confirmation</h2>
      <p>Hi ${customerName},</p>
      <p>Thank you for your order! We're excited to create your custom bracelets.</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Order Total:</strong> $${totalAmount}</p>
      </div>
      
      <h3>Order Items:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="padding: 10px; text-align: left;">Product</th>
            <th style="padding: 10px; text-align: left;">Quantity</th>
            <th style="padding: 10px; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p><strong>What's Next?</strong></p>
        <ul>
          <li>We'll start production within 1-2 business days</li>
          <li>You'll receive a shipping notification with tracking info</li>
          <li>Typical delivery time is 5-10 business days</li>
        </ul>
      </div>
      
      <p>If you have any questions, please reply to this email or contact us at support@laylabraceletdesign.com</p>
      
      <p style="color: #999; font-size: 12px; margin-top: 30px;">
        © 2026 Layla Bracelet Design. All rights reserved.
      </p>
    </div>
  `;

  return sendEmail({
    to: customerEmail,
    subject: `Order Confirmation - ${orderNumber}`,
    html,
  });
}

/**
 * Send bulk inquiry acknowledgment email
 */
export async function sendBulkInquiryAcknowledgmentEmail(
  customerEmail: string,
  customerName: string,
  inquiryNumber: string,
  quantity: number
): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Bulk Order Inquiry Received</h2>
      <p>Hi ${customerName},</p>
      <p>Thank you for submitting your bulk order inquiry! We're thrilled to help you create custom bracelets for your event or organization.</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Inquiry Number:</strong> ${inquiryNumber}</p>
        <p><strong>Quantity:</strong> ${quantity.toLocaleString()} pieces</p>
      </div>
      
      <p><strong>What Happens Next:</strong></p>
      <ol>
        <li>Our team will review your inquiry within 24 hours</li>
        <li>We'll send you a custom quote with pricing and timeline</li>
        <li>Once approved, we'll begin production</li>
        <li>You'll receive updates throughout the process</li>
      </ol>
      
      <p>For urgent inquiries or to discuss your needs further, feel free to call us at +1 (555) 123-4567</p>
      
      <p style="color: #999; font-size: 12px; margin-top: 30px;">
        © 2026 Layla Bracelet Design. All rights reserved.
      </p>
    </div>
  `;

  return sendEmail({
    to: customerEmail,
    subject: `Bulk Order Inquiry Received - ${inquiryNumber}`,
    html,
  });
}

/**
 * Send custom request acknowledgment email
 */
export async function sendCustomRequestAcknowledgmentEmail(
  customerEmail: string,
  customerName: string,
  requestNumber: string
): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Custom Design Request Received</h2>
      <p>Hi ${customerName},</p>
      <p>Thank you for submitting your custom bracelet design request! We love creating unique pieces tailored to your vision.</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Request Number:</strong> ${requestNumber}</p>
      </div>
      
      <p><strong>Our Design Process:</strong></p>
      <ol>
        <li>Our design team reviews your requirements (48 hours)</li>
        <li>We'll send you a mockup and pricing proposal</li>
        <li>You approve the design and we begin production</li>
        <li>Quality check and shipment</li>
      </ol>
      
      <p>We'll be in touch within 48 hours with next steps. If you have any additional details to share, feel free to reply to this email.</p>
      
      <p style="color: #999; font-size: 12px; margin-top: 30px;">
        © 2026 Layla Bracelet Design. All rights reserved.
      </p>
    </div>
  `;

  return sendEmail({
    to: customerEmail,
    subject: `Custom Design Request Received - ${requestNumber}`,
    html,
  });
}

/**
 * Send shipping notification email
 */
export async function sendShippingNotificationEmail(
  customerEmail: string,
  customerName: string,
  orderNumber: string,
  trackingNumber: string
): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Your Order is on the Way!</h2>
      <p>Hi ${customerName},</p>
      <p>Great news! Your order has been shipped and is on its way to you.</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
      </div>
      
      <p>You can track your package using the tracking number above. Typical delivery time is 5-10 business days.</p>
      
      <p>If you have any questions about your shipment, please don't hesitate to contact us.</p>
      
      <p style="color: #999; font-size: 12px; margin-top: 30px;">
        © 2026 Layla Bracelet Design. All rights reserved.
      </p>
    </div>
  `;

  return sendEmail({
    to: customerEmail,
    subject: `Your Order is Shipped - ${orderNumber}`,
    html,
  });
}
