import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="gradient-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-glow hover:border-primary/30">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-secondary/30">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {discount > 0 && (
              <span className="absolute top-3 left-3 gradient-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
                -{discount}%
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-xs text-primary font-medium mb-1">{product.brand}</p>
            <h3 className="font-display text-sm font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{product.shortDescription}</p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <Star className="w-3.5 h-3.5 fill-warning text-warning" />
              <span className="text-xs font-medium text-foreground">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            </div>

            {/* Price + Cart */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-display text-lg font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              <button
                onClick={handleAdd}
                className="p-2.5 gradient-primary rounded-lg text-primary-foreground hover:opacity-90 transition-opacity"
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
