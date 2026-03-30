import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function Cart() {
  const { data: cartItems, isLoading, refetch } = trpc.cart.getItems.useQuery();
  const removeItemMutation = trpc.cart.removeItem.useMutation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRemoveItem = async (id: number) => {
    try {
      await removeItemMutation.mutateAsync({ id });
      refetch();
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const total = cartItems?.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0) || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-100 rounded-lg h-24 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Cart is Empty</h1>
          <p className="text-slate-600 mb-8">Start shopping to add items to your cart</p>
          <Link href="/shop">
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="border border-slate-200 rounded-lg p-6 flex gap-6">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-2">
                      Product ID: {item.productId}
                    </h3>
                    <div className="text-sm text-slate-600 space-y-1">
                      {item.customText && <p>Custom Text: {item.customText}</p>}
                      {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                      {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900 mb-4">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-700 flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span className="font-semibold">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-slate-900">${total.toFixed(2)}</span>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full bg-slate-900 hover:bg-slate-800 mb-3">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/shop">
                <Button size="lg" variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
