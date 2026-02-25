import { motion } from 'framer-motion';
import { Shield, Target, Eye, Award } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const About = () => (
  <div className="pt-28 pb-20">
    <div className="container mx-auto px-4">
      <motion.div {...fadeUp} className="text-center mb-16">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">About Ether Enterprises</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          With over 10 years of experience in the security industry, we are one of India's most trusted CCTV and surveillance solutions providers.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <motion.div {...fadeUp} className="gradient-card border border-border rounded-xl p-8">
          <Target className="w-10 h-10 text-primary mb-4" />
          <h3 className="font-display text-xl font-semibold mb-3">Our Mission</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To make world-class security technology accessible and affordable for every Indian home and business. We believe everyone deserves peace of mind.
          </p>
        </motion.div>
        <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="gradient-card border border-border rounded-xl p-8">
          <Eye className="w-10 h-10 text-primary mb-4" />
          <h3 className="font-display text-xl font-semibold mb-3">Our Vision</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To be India's #1 destination for smart security solutions, powered by cutting-edge technology and unmatched customer service.
          </p>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { value: '10+', label: 'Years Experience' },
          { value: '10,000+', label: 'Happy Customers' },
          { value: '50,000+', label: 'Cameras Installed' },
          { value: '500+', label: 'Cities Covered' },
        ].map((stat, i) => (
          <div key={i} className="gradient-card border border-border rounded-xl p-6 text-center">
            <p className="font-display text-3xl font-bold text-gradient mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Brands */}
      <motion.div {...fadeUp} className="text-center">
        <h2 className="font-display text-2xl font-bold mb-6">Brands We Deal With</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {['Hikvision', 'CP Plus', 'Dahua', 'Godrej', 'Honeywell'].map(brand => (
            <div key={brand} className="gradient-card border border-border rounded-xl px-8 py-4">
              <span className="font-display font-semibold text-muted-foreground">{brand}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default About;
