import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => (
  <footer className="bg-card border-t border-border mt-20">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-7 h-7 text-primary" />
            <span className="font-display text-lg font-bold">Ether Enterprises</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            India's trusted CCTV & security solutions provider. Quality products, expert installation, and 24/7 support.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/shop" className="hover:text-primary transition-colors">Shop All</Link>
            <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-display font-semibold mb-4">Categories</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/shop?category=dome" className="hover:text-primary transition-colors">Dome Cameras</Link>
            <Link to="/shop?category=bullet" className="hover:text-primary transition-colors">Bullet Cameras</Link>
            <Link to="/shop?category=ip" className="hover:text-primary transition-colors">IP Cameras</Link>
            <Link to="/shop?category=dvr-nvr" className="hover:text-primary transition-colors">DVR/NVR</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold mb-4">Contact Us</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +91 98765 43210</span>
            <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> info@etherentp.com</span>
            <span className="flex items-start gap-2"><MapPin className="w-4 h-4 text-primary mt-0.5" /> 123, Security Lane, New Delhi, India</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ether Enterprises. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
