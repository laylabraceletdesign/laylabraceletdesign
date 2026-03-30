import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Truck, Sparkles, Heart } from "lucide-react";

export default function Home() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Sample products for display
  const featuredProducts = [
    { id: 1, name: "Minimalist Pearl", price: "$28", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop" },
    { id: 2, name: "Gold Beaded", price: "$32", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop" },
    { id: 3, name: "Gemstone Mix", price: "$35", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop" },
    { id: 4, name: "Delicate Chain", price: "$26", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop" },
  ];

  const categories = [
    { title: "Custom Name Bracelets", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=300&fit=crop" },
    { title: "Bulk Orders", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=300&fit=crop" },
    { title: "Couple Bracelets", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=300&fit=crop" },
  ];

  const testimonials = [
    { text: "Absolutely beautiful craftsmanship. Exceeded my expectations!", author: "Sarah M." },
    { text: "Perfect gift idea. My sister loved it!", author: "Emma L." },
    { text: "The quality is incredible for the price. Highly recommend!", author: "Jessica K." },
  ];

  const instagramImages = [
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&h=800&fit=crop')",
            filter: "brightness(0.4)",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 text-center max-w-2xl px-4">
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-6 tracking-tight">
            Handmade Bracelets That Tell Your Story
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 font-light">
            Custom designs, made with care
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg rounded-sm"
            onClick={() => window.location.href = "/shop"}
          >
            Shop Now
          </Button>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="bg-white border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Handmade Quality */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-serif text-foreground mb-2">Handmade Quality</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Each bracelet is carefully crafted by hand with premium materials
              </p>
            </div>

            {/* Custom Designs */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-serif text-foreground mb-2">Custom Designs</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Personalize your bracelet with names, colors, and special touches
              </p>
            </div>

            {/* Fast Delivery */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Truck className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-serif text-foreground mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Quick turnaround times with careful packaging and tracking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Featured Collection</h2>
            <p className="text-muted-foreground text-lg">Discover our most loved designs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative overflow-hidden bg-muted rounded-sm mb-4 aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      hoveredProduct === product.id ? "scale-105" : "scale-100"
                    }`}
                  />
                  {hoveredProduct === product.id && (
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center transition-all duration-300">
                      <Button
                        size="sm"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-sm"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-foreground mb-2">{product.name}</h3>
                <p className="text-muted-foreground">{product.price}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-accent text-accent hover:bg-accent/5 rounded-sm"
              onClick={() => window.location.href = "/shop"}
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Shop by Category</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-sm group cursor-pointer h-64">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <h3 className="text-2xl font-serif text-white text-center px-4">{category.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Loved by Customers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-sm border border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic leading-relaxed">"{testimonial.text}"</p>
                <p className="text-muted-foreground font-medium">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM GRID */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Follow Us @LaylaBracelet</h2>
            <p className="text-muted-foreground">Join our community on Instagram</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {instagramImages.map((image, idx) => (
              <div key={idx} className="aspect-square overflow-hidden rounded-sm group cursor-pointer">
                <img
                  src={image}
                  alt="Instagram post"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-accent text-accent-foreground">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <h3 className="font-serif text-lg mb-4">Layla Bracelet</h3>
              <p className="text-sm opacity-80">Handmade bracelets that tell your story</p>
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-serif text-sm mb-4">Shop</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="/shop" className="hover:opacity-100 transition">All Products</a></li>
                <li><a href="/bulk-order" className="hover:opacity-100 transition">Bulk Orders</a></li>
                <li><a href="/custom-request" className="hover:opacity-100 transition">Custom Designs</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-serif text-sm mb-4">Company</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="/contact" className="hover:opacity-100 transition">Contact</a></li>
                <li><a href="#" className="hover:opacity-100 transition">About</a></li>
                <li><a href="#" className="hover:opacity-100 transition">FAQ</a></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-serif text-sm mb-4">Follow</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100 transition">Instagram</a></li>
                <li><a href="#" className="hover:opacity-100 transition">TikTok</a></li>
                <li><a href="#" className="hover:opacity-100 transition">Pinterest</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-accent-foreground/20 pt-8 text-center text-sm opacity-75">
            <p>&copy; 2026 Layla Bracelet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
