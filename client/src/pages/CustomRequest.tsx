import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

export default function CustomRequest() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    logoUrl: "",
    colorPreferences: "",
    budget: "",
    timeline: "",
    quantity: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const createCustomRequestMutation = trpc.customRequests.create.useMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await createCustomRequestMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        description: formData.description,
        logoUrl: formData.logoUrl,
        colorPreferences: formData.colorPreferences,
        budget: formData.budget,
        timeline: formData.timeline,
        quantity: formData.quantity ? parseInt(formData.quantity) : undefined,
      });

      setSubmitted(true);
      toast.success("Custom request submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Request Received!</h1>
          <p className="text-slate-600 mb-4">
            Your custom design request has been submitted successfully. Our design team will review your requirements and contact you within 48 hours with next steps and pricing.
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
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Custom Bracelet Design Request</h1>
          <p className="text-lg text-slate-600">
            Have a unique vision? We specialize in custom designs including logo charms, specific colors, and special materials. Tell us your ideas and we'll bring them to life.
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
              </div>

              {/* Design Details */}
              <div className="bg-slate-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Design Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Design Description * (Tell us about your custom bracelet idea)
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="e.g., Custom logo charm with company name, specific bead colors, special materials, etc."
                      rows={5}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Logo/Image URL (if applicable)
                    </label>
                    <Input
                      type="url"
                      name="logoUrl"
                      value={formData.logoUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com/logo.png"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Color Preferences
                    </label>
                    <textarea
                      name="colorPreferences"
                      value={formData.colorPreferences}
                      onChange={handleInputChange}
                      placeholder="e.g., Navy blue, gold accents, rainbow gradient, etc."
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="bg-slate-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Project Details</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Quantity Needed
                      </label>
                      <Input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="100"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        <option value="">Select timeline</option>
                        <option value="urgent">Urgent (1-2 weeks)</option>
                        <option value="normal">Normal (2-4 weeks)</option>
                        <option value="flexible">Flexible (1-2 months)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="">Select budget range</option>
                      <option value="under_100">Under $100</option>
                      <option value="100_500">$100 - $500</option>
                      <option value="500_1000">$500 - $1,000</option>
                      <option value="1000_plus">$1,000+</option>
                    </select>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-slate-900 hover:bg-slate-800"
              >
                {isSubmitting ? "Submitting..." : "Submit Custom Request"}
              </Button>
            </form>
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-purple-50 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Custom Design Process</h3>
              <ol className="space-y-3 text-sm text-purple-800">
                <li className="flex gap-2">
                  <span className="font-bold">1.</span>
                  <span>Submit your design request</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">2.</span>
                  <span>We review and contact you within 48 hours</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">3.</span>
                  <span>Design mockup and pricing discussion</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">4.</span>
                  <span>Approval and production begins</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">5.</span>
                  <span>Quality check and shipment</span>
                </li>
              </ol>

              <div className="mt-6 pt-6 border-t border-purple-200">
                <p className="text-sm text-purple-800">
                  <span className="font-semibold">Questions?</span> Contact us at support@laylabraceletdesign.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
