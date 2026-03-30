import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

export default function BulkOrder() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    quantity: "",
    eventType: "",
    eventDate: "",
    customizationDetails: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const createBulkInquiryMutation = trpc.bulkInquiries.create.useMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.quantity) {
      toast.error("Please fill in all required fields");
      return;
    }

    const quantity = parseInt(formData.quantity);
    if (isNaN(quantity) || quantity < 1 || quantity > 10000) {
      toast.error("Quantity must be between 1 and 10000");
      return;
    }

    setIsSubmitting(true);
    try {
      await createBulkInquiryMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        quantity,
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        customizationDetails: formData.customizationDetails,
        message: formData.message,
      });

      setSubmitted(true);
      toast.success("Bulk order inquiry submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit inquiry. Please try again.");
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
            Your bulk order inquiry has been submitted successfully. We'll review your request and get back to you within 24 hours with a custom quote.
          </p>
          <p className="text-slate-600 mb-8">
            Check your email at <span className="font-semibold">{formData.email}</span> for updates.
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Bulk Order Inquiry</h1>
          <p className="text-lg text-slate-600">
            Perfect for teams, schools, events, and corporate gifts. We handle orders from 1 to 5000+ pieces with custom pricing and personalization options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-slate-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Contact Information</h2>
                
                <div className="space-y-4">
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

                  <div className="grid grid-cols-2 gap-4">
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

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Company/Organization
                      </label>
                      <Input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Acme Corp"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-slate-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Order Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Quantity Needed * (1-10,000 pieces)
                    </label>
                    <Input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="100"
                      min="1"
                      max="10000"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Event Type
                      </label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        <option value="">Select an option</option>
                        <option value="team_event">Team Event</option>
                        <option value="school_event">School Event</option>
                        <option value="corporate_gift">Corporate Gift</option>
                        <option value="fundraiser">Fundraiser</option>
                        <option value="wedding">Wedding</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Event Date
                      </label>
                      <Input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Customization */}
              <div className="bg-slate-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Customization Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Customization Details
                    </label>
                    <textarea
                      name="customizationDetails"
                      value={formData.customizationDetails}
                      onChange={handleInputChange}
                      placeholder="e.g., Custom names, specific colors, logo charms, etc."
                      rows={4}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Any additional information or special requests..."
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-slate-900 hover:bg-slate-800"
              >
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </Button>
            </form>
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-blue-50 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Bulk Order Benefits</h3>
              <ul className="space-y-3 text-sm text-blue-800">
                <li className="flex gap-2">
                  <span className="font-bold">✓</span>
                  <span>Custom pricing for large quantities</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">✓</span>
                  <span>Full personalization options</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">✓</span>
                  <span>Fast turnaround times</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">✓</span>
                  <span>Dedicated support</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">✓</span>
                  <span>Free shipping on bulk orders</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-blue-200">
                <p className="text-sm text-blue-800 mb-3">
                  <span className="font-semibold">Quick Response:</span> We typically respond within 24 hours with a custom quote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
