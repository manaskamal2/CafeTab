import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Thank you! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page" className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black text-[#4E3B31] mb-6 tracking-tighter">
            Get in <span className="text-[#D97706]">Touch</span>
          </h1>
          <p className="text-xl text-[#737373] max-w-3xl mx-auto leading-relaxed">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Map */}
            <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(78,59,49,0.12)] h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.9999999999995!2d85.5244818!3d25.1991937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2f526f1503e11%3A0x146575e2172e8c43!2sCafe%20TAB%20(Take%20A%20Break)!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cafe TAB Location"
              ></iframe>
              {/* Floating Hours Card */}
              <Card className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm border border-[#E5E5E5] p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-[#D97706]/10 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#D97706]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#4E3B31]">Opening Hours</h3>
                    <p className="text-sm text-[#737373]">Open Daily</p>
                  </div>
                </div>
                <p className="text-base font-semibold text-[#4E3B31]">11:00 AM - 10:00 PM</p>
              </Card>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card
                data-testid="contact-location-card"
                className="bg-white border border-[#E5E5E5] p-6 rounded-xl hover:border-[#D97706]/50 hover:shadow-[0_8px_32px_rgba(78,59,49,0.12)] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#D97706]/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-[#D97706]" />
                </div>
                <h3 className="text-lg font-semibold text-[#4E3B31] mb-2">Location</h3>
                <p className="text-sm text-[#737373] leading-relaxed">
                  Ghagra, near Allahabad Bank<br />Bihar Sharif, Nalanda
                </p>
              </Card>

              <Card
                data-testid="contact-phone-card"
                className="bg-white border border-[#E5E5E5] p-6 rounded-xl hover:border-[#D97706]/50 hover:shadow-[0_8px_32px_rgba(78,59,49,0.12)] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#2D6A4F]/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-[#2D6A4F]" />
                </div>
                <h3 className="text-lg font-semibold text-[#4E3B31] mb-2">Phone</h3>
                <p className="text-sm text-[#737373]">
                  +91 6207725718
                </p>
              </Card>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-white border border-[#E5E5E5] p-8 md:p-10 rounded-2xl shadow-[0_8px_32px_rgba(78,59,49,0.08)]">
              <h2 className="text-3xl font-bold text-[#4E3B31] mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#4E3B31] mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    data-testid="contact-name-input"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-[#E5E5E5] rounded-xl focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#4E3B31] mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    data-testid="contact-email-input"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-[#E5E5E5] rounded-xl focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#4E3B31] mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    data-testid="contact-message-input"
                    placeholder="Tell us what's on your mind..."
                    rows={6}
                    className="w-full px-4 py-3 border border-[#E5E5E5] rounded-xl focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="contact-submit-btn"
                  className="w-full bg-[#4E3B31] text-[#FDFBF7] hover:bg-[#3A2C24] rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
