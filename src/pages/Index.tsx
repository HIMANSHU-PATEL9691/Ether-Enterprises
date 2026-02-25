import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Award, Package, ArrowRight, Star, Phone, MessageCircle } from 'lucide-react';
import { products, categories, testimonials } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Index = () => {
  const featured = products.filter(p => p.featured).slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative gradient-hero min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/20 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <span className="inline-flex items-center gap-2 gradient-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-6">
                <ShieldCheck className="w-3.5 h-3.5" /> Trusted by 10,000+ Customers Across India
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
            >
              Secure Your World with{' '}
              <span className="text-gradient">Smart CCTV</span>{' '}
              Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8 max-w-xl"
            >
              Premium security cameras, professional installation, and 24/7 support. Protect your home, office, and business with Ether Enterprises.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-glow"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-semibold px-8 py-3.5 rounded-xl hover:bg-secondary/80 transition-colors border border-border"
              >
                Get Free Quote
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Browse by Category</h2>
            <p className="text-muted-foreground">Find the perfect security solution for your needs</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.id} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <Link
                  to={`/shop?category=${cat.id}`}
                  className="block gradient-card border border-border rounded-xl p-6 text-center hover:shadow-glow hover:border-primary/30 transition-all duration-300 group"
                >
                  <span className="text-3xl block mb-3">{cat.icon}</span>
                  <h3 className="font-display font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground">{cat.count} Products</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Why Choose Ether Enterprises?</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: '24/7 Support', desc: 'Round the clock assistance' },
              { icon: Package, title: 'Free Installation', desc: 'On orders above ₹5,000' },
              { icon: Award, title: '2 Year Warranty', desc: 'Guaranteed quality' },
              { icon: ShieldCheck, title: 'Genuine Products', desc: '100% authentic brands' },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="gradient-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 gradient-primary rounded-xl flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Our best-selling security cameras & systems</p>
            </div>
            <Link to="/shop" className="hidden md:inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">What Our Customers Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={t.id} {...fadeUp} transition={{ delay: i * 0.1 }} className="gradient-card border border-border rounded-xl p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">"{t.text}"</p>
                <p className="font-display font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="gradient-card border border-primary/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px]" />
            </div>
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Need Help Choosing the Right Camera?</h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Our security experts will help you find the perfect CCTV solution for your needs. Get a free consultation today!</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-success text-success-foreground font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
