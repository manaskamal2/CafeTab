import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Coffee, Wifi, UtensilsCrossed, Clock, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Home = () => {
  const [promotions, setPromotions] = useState([]);
  const [featuredMenu, setFeaturedMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [promosRes, menuRes] = await Promise.all([
          axios.get(`${API}/promotions`),
          axios.get(`${API}/menu`),
        ]);
        setPromotions(promosRes.data);
        setFeaturedMenu(menuRes.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div data-testid="home-page" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="md:col-span-6 space-y-6"
            >
              {/* Promotional Banner */}
              {promotions.length > 0 && (
                <div data-testid="promo-banner" className="inline-block bg-[#D97706]/10 border border-[#D97706]/30 rounded-full px-6 py-2">
                  <p className="text-sm font-semibold text-[#D97706]">{promotions[0].title}</p>
                </div>
              )}

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#4E3B31] leading-none tracking-tighter">
                Your Perfect<br />
                <span className="text-[#D97706]">Break Spot</span><br />
                in Bihar Sharif
              </h1>

              <p className="text-lg md:text-xl text-[#737373] leading-relaxed font-light max-w-xl">
                Experience the perfect blend of cozy ambiance, quality coffee, delicious momos, and authentic biryani. Your favorite hangout awaits.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/menu">
                  <Button
                    data-testid="hero-menu-btn"
                    className="bg-[#4E3B31] text-[#FDFBF7] hover:bg-[#3A2C24] rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    View Menu
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    data-testid="hero-location-btn"
                    className="border-2 border-[#4E3B31] text-[#4E3B31] hover:bg-[#4E3B31] hover:text-[#FDFBF7] rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300"
                    variant="outline"
                  >
                    Visit Us
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right: Image Collage */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="md:col-span-6"
            >
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(78,59,49,0.12)]">
                  <img
                    src="https://images.pexels.com/photos/35204925/pexels-photo-35204925.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Cafe Interior"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Floating Elements */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#D97706] fill-[#D97706]" />
                    <span className="text-2xl font-black text-[#4E3B31]">4.4</span>
                  </div>
                  <p className="text-xs text-[#737373] mt-1">Google Rating</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features - Bento Grid */}
      <section className="py-24 md:py-32 bg-[#F5F0EB]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#4E3B31] mb-4 tracking-tight">
              Why Choose Cafe TAB?
            </h2>
            <p className="text-lg text-[#737373] max-w-2xl mx-auto">
              More than just a café - it's your second home in Bihar Sharif
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: UtensilsCrossed,
                title: 'Best Momos & Biryani',
                description: 'Savor the most delicious momos and aromatic biryani in town',
                color: '#D97706',
              },
              {
                icon: Coffee,
                title: 'Quality Coffee',
                description: 'Premium coffee blends brewed to perfection every time',
                color: '#2D6A4F',
              },
              {
                icon: Wifi,
                title: 'Free High-Speed Wi-Fi',
                description: 'Stay connected while you relax and work',
                color: '#D97706',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card
                  data-testid={`feature-card-${idx}`}
                  className="bg-white border border-[#E5E5E5] p-8 rounded-xl hover:border-[#D97706]/50 hover:shadow-[0_8px_32px_rgba(78,59,49,0.12)] transition-all duration-300 h-full group"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#4E3B31] mb-3">{feature.title}</h3>
                  <p className="text-[#737373] leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#4E3B31] mb-4 tracking-tight">
              Featured Favorites
            </h2>
            <p className="text-lg text-[#737373] max-w-2xl mx-auto">
              Taste the dishes everyone's talking about
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMenu.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card
                  data-testid={`featured-item-${idx}`}
                  className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden hover:border-[#D97706]/50 hover:shadow-[0_8px_32px_rgba(78,59,49,0.12)] transition-all duration-300 group"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-[#4E3B31]">{item.name}</h3>
                      <span className="text-lg font-bold text-[#D97706]">₹{item.price}</span>
                    </div>
                    <p className="text-sm text-[#737373]">{item.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/menu">
              <Button
                data-testid="view-full-menu-btn"
                className="bg-[#4E3B31] text-[#FDFBF7] hover:bg-[#3A2C24] rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300"
              >
                View Full Menu
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-[#F5F0EB]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#4E3B31] mb-4 tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-lg text-[#737373] max-w-2xl mx-auto">
              Don't just take our word for it - hear from our happy customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rahul Kumar',
                role: 'Student',
                review: 'Best place to study and enjoy great coffee in Bihar Sharif! The Wi-Fi is fast and the ambiance is perfect for long study sessions.',
                rating: 5,
              },
              {
                name: 'Priya Singh',
                role: 'Food Blogger',
                review: 'The momos here are absolutely delicious! Authentic taste and generous portions. The biryani is a must-try too!',
                rating: 5,
              },
              {
                name: 'Amit Sharma',
                role: 'Professional',
                review: 'My go-to spot for morning coffee before work. Friendly staff, cozy atmosphere, and consistently good quality. Highly recommend!',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card
                  data-testid={`testimonial-${idx}`}
                  className="bg-white border border-[#E5E5E5] p-8 rounded-xl hover:border-[#D97706]/50 hover:shadow-[0_8px_32px_rgba(78,59,49,0.12)] transition-all duration-300 h-full"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#D97706] fill-[#D97706]" />
                    ))}
                  </div>
                  <p className="text-[#737373] mb-6 leading-relaxed italic">"{testimonial.review}"</p>
                  <div className="mt-auto">
                    <p className="text-[#4E3B31] font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-[#737373]">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 md:py-32 bg-[#4E3B31] text-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Visit Us Today!
            </h2>
            <p className="text-xl text-[#FDFBF7]/80 mb-8 max-w-2xl mx-auto">
              Open daily from 11:00 AM to 10:00 PM. Located at Ghagra, near Allahabad Bank, Bihar Sharif.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button
                  data-testid="cta-contact-btn"
                  className="bg-[#D97706] text-white hover:bg-[#B86506] rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <MapPin className="mr-2 w-5 h-5" />
                  Get Directions
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
