import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Star, Check, Minus, Plus, Zap } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard';
import { toast } from 'sonner';

const tabs = ['Description', 'Specifications', 'Installation', 'Warranty'];

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <p className="text-muted-foreground text-lg">Product not found.</p>
        <Link to="/shop" className="text-primary hover:underline mt-2 inline-block">Back to Shop</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleAdd = () => {
    addToCart(product, quantity);
    toast.success(`${quantity}× ${product.name} added to cart`);
  };

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="gradient-card border border-border rounded-2xl overflow-hidden aspect-square">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
            <span className="text-primary text-sm font-medium mb-1">{product.brand}</span>
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="font-medium text-sm">{product.rating}</span>
              </div>
              <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${product.inStock ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                {product.inStock ? '● In Stock' : '● Out of Stock'}
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-sm font-bold text-success">Save {discount}%</span>
                </>
              )}
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{product.description}</p>

            {/* Quantity + Add */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-secondary rounded-xl">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 hover:text-primary transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-3 hover:text-primary transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 inline-flex items-center justify-center gap-2 gradient-primary text-primary-foreground font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-glow"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
            </div>

            <Link
              to="/cart"
              onClick={handleAdd}
              className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-semibold py-3.5 rounded-xl hover:bg-secondary/80 transition-colors border border-border"
            >
              <Zap className="w-4 h-4" /> Buy Now
            </Link>

            {/* Key specs */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
                <div key={key} className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">{key}</p>
                  <p className="text-sm font-medium">{val}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="flex gap-1 border-b border-border mb-6 overflow-x-auto">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === i ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="gradient-card border border-border rounded-xl p-6">
            {activeTab === 0 && <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>}
            {activeTab === 1 && (
              <div className="space-y-3">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground">{key}</span>
                    <span className="text-sm font-medium">{val}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 2 && (
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2"><Check className="w-4 h-4 text-success mt-0.5 shrink-0" /> Professional installation by certified technicians</div>
                <div className="flex items-start gap-2"><Check className="w-4 h-4 text-success mt-0.5 shrink-0" /> Free installation on orders above ₹5,000</div>
                <div className="flex items-start gap-2"><Check className="w-4 h-4 text-success mt-0.5 shrink-0" /> Includes cable routing, mounting, and system configuration</div>
                <div className="flex items-start gap-2"><Check className="w-4 h-4 text-success mt-0.5 shrink-0" /> Mobile app setup for remote viewing</div>
              </div>
            )}
            {activeTab === 3 && (
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2"><Check className="w-4 h-4 text-success mt-0.5 shrink-0" /> 2 Year manufacturer warranty</div>
                <div className="flex items-start gap-2"><Check className="w-4 h-4 text-success mt-0.5 shrink-0" /> Free replacement for manufacturing defects</div>
                <div className="flex items-start gap-2"><Check className="w-4 h-4 text-success mt-0.5 shrink-0" /> Extended warranty available (AMC plans)</div>
                <div className="flex items-start gap-2"><Check className="w-4 h-4 text-success mt-0.5 shrink-0" /> Pan-India service network</div>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
