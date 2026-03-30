import { useState } from "react";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { ShoppingCart, Plus, Minus, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id ? parseInt(params.id) : 0;

  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { data: product, isLoading } = trpc.products.getById.useQuery({ id: productId });
  const addToCartMutation = trpc.cart.addItem.useMutation();

  const handleAddToCart = async () => {
    if (!product) return;

    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    setIsAddingToCart(true);
    try {
      await addToCartMutation.mutateAsync({
        productId: product.id,
        quantity,
        customText: customText || undefined,
        selectedColor,
        selectedSize,
        price: product.price.toString(),
      });
      toast.success("Added to cart!");
      setCustomText("");
      setSelectedColor("");
      setSelectedSize("");
      setQuantity(1);
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-slate-200 rounded-lg h-96 animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-slate-200 rounded w-3/4 animate-pulse" />
              <div className="h-6 bg-slate-200 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-600 text-lg">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <img
              src={product.image || ""}
              alt={product.title}
              className="w-full rounded-lg object-cover"
            />
          </div>

          {/* Product Details */}
          <div>
            <p className="text-sm text-slate-500 uppercase tracking-wide mb-2">
              {product.category.replace(/_/g, " ")}
            </p>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{product.title}</h1>

            <div className="mb-6">
              <span className="text-3xl font-bold text-slate-900">
                ${Number(product.price || 0).toFixed(2)}
              </span>
              {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
                <span className="ml-3 text-lg text-slate-500 line-through">
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-slate-600 mb-8">{product.description}</p>

            {/* Customization Options */}
            <div className="space-y-6 mb-8">
              {/* Custom Text */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Personalize with Text (Optional - Max 12 Letters)
                </label>
                <Input
                  type="text"
                  placeholder="Enter name or text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value.slice(0, 12))}
                  maxLength={12}
                  className="text-lg"
                />
                <p className="text-sm text-slate-500 mt-2">
                  {customText.length}/12 characters
                </p>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Select Color *
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {product.colors && product.colors.length > 0 ? (
                    product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`p-3 rounded-lg border-2 transition-all capitalize text-sm font-medium ${
                          selectedColor === color
                            ? "border-slate-900 bg-slate-100"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {color.replace(/_/g, " ")}
                      </button>
                    ))
                  ) : (
                    <p className="text-slate-500">No colors available</p>
                  )}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Select Size *
                </label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes && product.sizes.length > 0 ? (
                      product.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="standard">Standard</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Order Limits Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Order Information</p>
                <p>Minimum order: {product.minOrder || 1} | Maximum order: {(product.maxOrder || 5000).toLocaleString()} pieces</p>
                <p className="mt-1">For bulk orders over 100 pieces, contact us for special pricing.</p>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              size="lg"
              className="w-full bg-slate-900 hover:bg-slate-800 mb-4"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </Button>

            {/* Bulk Order CTA */}
            <Button variant="outline" size="lg" className="w-full">
              Request Bulk Order
            </Button>

            {/* Product Info */}
            <div className="mt-12 border-t border-slate-200 pt-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Product Details</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex justify-between">
                  <span>Material:</span>
                  <span className="font-medium">Handmade Beads</span>
                </li>
                <li className="flex justify-between">
                  <span>Customization:</span>
                  <span className="font-medium">Up to 12 letters</span>
                </li>
                <li className="flex justify-between">
                  <span>Production Time:</span>
                  <span className="font-medium">1-3 business days</span>
                </li>
                <li className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-medium">Worldwide</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
