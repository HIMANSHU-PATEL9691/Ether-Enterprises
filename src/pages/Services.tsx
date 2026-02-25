import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services } from '@/data/products';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Services = () => (
  <div className="pt-28 pb-20">
    <div className="container mx-auto px-4">
      <motion.div {...fadeUp} className="text-center mb-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Our Services</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">Professional CCTV installation, maintenance, and support services across India.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <motion.div key={service.id} {...fadeUp} transition={{ delay: i * 0.1 }} className="gradient-card border border-border rounded-xl p-6 hover:shadow-glow hover:border-primary/30 transition-all duration-300">
            <span className="text-4xl block mb-4">{service.icon}</span>
            <h3 className="font-display text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-primary font-semibold text-sm">{service.price}</span>
              <Link to="/contact" className="text-sm gradient-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Book Now
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Services;
