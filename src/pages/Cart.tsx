import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, subtotal, gst, shipping, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 text-center">
        <div className="container mx-auto px-4">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="font-display text-2xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">Browse our products and add items to your cart.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity">
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl font-bold mb-8">
          Shopping Cart ({items.length} items)
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="gradient-card border border-border rounded-xl p-4 flex gap-4"
              >
                <Link to={`/product/${product.slug}`} className="shrink-0">
                  <img src={product.image} alt={product.name} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.slug}`} className="font-display font-semibold text-sm hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">{product.brand}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center bg-secondary rounded-lg">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-2"><Minus className="w-3 h-3" /></button>
                      <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-2"><Plus className="w-3 h-3" /></button>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold">₹{(product.price * quantity).toLocaleString()}</p>
                      {quantity > 1 && <p className="text-xs text-muted-foreground">₹{product.price.toLocaleString()} each</p>}
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(product.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors self-start">
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="gradient-card border border-border rounded-xl p-6 sticky top-28">
              <h3 className="font-display font-semibold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">GST (18%)</span><span>₹{gst.toLocaleString()}</span></div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? <span className="text-success">Free</span> : `₹${shipping}`}</span>
                </div>
                {shipping > 0 && <p className="text-xs text-muted-foreground">Free shipping on orders above ₹5,000</p>}
                <div className="border-t border-border pt-3 flex justify-between font-display font-bold text-lg">
                  <span>Total</span><span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              <button className="w-full mt-6 gradient-primary text-primary-foreground font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-glow">
                Proceed to Checkout
              </button>
              <Link to="/shop" className="block text-center text-sm text-primary mt-3 hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
