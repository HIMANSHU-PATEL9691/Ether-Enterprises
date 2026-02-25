import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Thank you! We will contact you shortly.');
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-muted-foreground">Get in touch for inquiries, quotes, or installation booking</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="gradient-card border border-border rounded-xl p-6 space-y-4"
          >
            <div>
              <label className="text-sm font-medium mb-1 block">Name *</label>
              <input
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full bg-secondary text-foreground rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary border border-border"
                placeholder="Your name"
                maxLength={100}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Phone *</label>
              <input
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="w-full bg-secondary text-foreground rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary border border-border"
                placeholder="+91 9691365052"
                maxLength={15}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <input
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full bg-secondary text-foreground rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary border border-border"
                placeholder="your@email.com"
                maxLength={255}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Message *</label>
              <textarea
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                rows={4}
                className="w-full bg-secondary text-foreground rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary border border-border resize-none"
                placeholder="Tell us what you need..."
                maxLength={1000}
              />
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 gradient-primary text-primary-foreground font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </motion.form>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="gradient-card border border-border rounded-xl p-6">
              <h3 className="font-display font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary" /><div><p className="text-muted-foreground">Phone</p><p className="font-medium">+91 9691365052</p></div></div>
                <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary" /><div><p className="text-muted-foreground">Email</p><p className="font-medium">patel@123</p></div></div>
                <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-primary mt-0.5" /><div><p className="text-muted-foreground">Address</p><p className="font-medium">123, Security Lane, Karol Bagh, New Delhi - 110005</p></div></div>
              </div>
            </div>

            <div className="gradient-card border border-border rounded-xl p-6">
              <h3 className="font-display font-semibold mb-2">Business Hours</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Monday – Saturday: 10:00 AM – 8:00 PM</p>
                <p>Sunday: 11:00 AM – 5:00 PM</p>
              </div>
            </div>

            <a
              href="https://wa.me/919691365052"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-success text-success-foreground font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity w-full"
            >
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
