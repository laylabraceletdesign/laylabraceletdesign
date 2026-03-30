import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: cartItems } = trpc.cart.getItems.useQuery();
  const createOrderMutation = trpc.orders.create.useMutation();
  const clearCartMutation = trpc.cart.clear.useMutation();

  const total = cartItems?.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0) || 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName || !formData.customerEmail || !formData.shippingAddress) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await createOrderMutation.mutateAsync({
        totalAmount: total.toString(),
        shippingAddress: formData.shippingAddress,
        customerEmail: formData.customerEmail,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        items: cartItems,
        notes: "",
      });

      await clearCartMutation.mutateAsync();
      toast.success("Order placed successfully!");
      setLocation(`/order-confirmation/${result.orderNumber}`);
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-600 text-lg mb-4">Your cart is empty</p>
          <Button onClick={() => setLocation("/shop")} className="bg-slate-900 hover:bg-slate-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => setLocation("/cart")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </button>

        <h1 className="text-4xl font-bold text-slate-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Shipping Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
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
                      name="customerEmail"
                      value={formData.customerEmail}
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
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Shipping Address *
                    </label>
                    <textarea
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      placeholder="123 Main St, City, State 12345, Country"
                      rows={4}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                size="lg"
                className="w-full bg-slate-900 hover:bg-slate-800"
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-600">
                      Product #{item.productId} x {item.quantity}
                    </span>
                    <span className="font-semibold">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-slate-900">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
