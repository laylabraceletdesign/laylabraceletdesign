import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { CheckCircle, Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitContactMutation = trpc.contact.submit.useMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      setSubmitted(true);
      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Thank You!</h1>
          <p className="text-slate-600 mb-4">
            Your message has been sent successfully. We'll get back to you as soon as possible.
          </p>
          <p className="text-slate-600 mb-8">
            Check your email at <span className="font-semibold">{formData.email}</span> for our response.
          </p>
          <Button onClick={() => window.location.href = "/"} className="bg-slate-900 hover:bg-slate-800">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-slate-600">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as quickly as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Subject *
                </label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-slate-900 hover:bg-slate-800"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Email */}
              <div className="bg-slate-50 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-slate-900 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                    <p className="text-slate-600">support@laylabraceletdesign.com</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-slate-50 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-slate-900 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                    <p className="text-slate-600">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-slate-50 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-slate-900 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Location</h3>
                    <p className="text-slate-600">
                      123 Craft Street<br />
                      Handmade City, ST 12345<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Response Time</h3>
                <p className="text-sm text-blue-800">
                  We typically respond to all inquiries within 24 business hours. For urgent matters, please call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
