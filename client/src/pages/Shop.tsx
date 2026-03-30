import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Search, Filter } from "lucide-react";

const CATEGORIES = [
  { value: "all", label: "All Products" },
  { value: "name_bracelets", label: "Name Bracelets" },
  { value: "heishi_clay", label: "Heishi & Clay" },
  { value: "seed_bead", label: "Seed Bead" },
  { value: "corporate", label: "Corporate & Logo" },
  { value: "crystal_gemstone", label: "Crystal & Gemstone" },
  { value: "faith", label: "Faith & Spiritual" },
  { value: "eco_friendly", label: "Eco-Friendly Wood" },
  { value: "team_sports", label: "Team & Sports" },
  { value: "phone_charms", label: "Phone Charms" },
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allProducts, isLoading } = trpc.products.list.useQuery();

  let products = allProducts || [];

  // Filter by category
  if (selectedCategory !== "all") {
    products = products.filter((p) => p.category === selectedCategory);
  }

  // Filter by search query
  if (searchQuery) {
    products = products.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Sort
  if (sortBy === "price-low") {
    products = [...products].sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortBy === "price-high") {
    products = [...products].sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sortBy === "newest") {
    products = [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Shop Bracelets</h1>
          <p className="text-slate-600">
            Discover our collection of handmade, customizable bracelets
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Sort By
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Main Content - Products */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-slate-100 rounded-lg h-80 animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600 text-lg">No products found. Try adjusting your filters.</p>
              </div>
            ) : (
              <>
                <div className="mb-6 text-sm text-slate-600">
                  Showing {products.length} product{products.length !== 1 ? "s" : ""}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`}>
                      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                        <img
                          src={product.image || ""}
                          alt={product.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2">
                            {product.title}
                          </h3>
                          <p className="text-sm text-slate-500 mb-3 capitalize">
                            {product.category.replace(/_/g, " ")}
                          </p>
                          <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                            {product.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-lg font-bold text-slate-900">
                                ${Number(product.price || 0).toFixed(2)}
                              </span>
                              {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
                                <span className="ml-2 text-sm text-slate-500 line-through">
                                  ${Number(product.originalPrice).toFixed(2)}
                                </span>
                              )}
                            </div>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
