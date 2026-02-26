import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Users, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const About = () => {
  return (
    <div data-testid="about-page" className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black text-[#4E3B31] mb-6 tracking-tighter">
            About <span className="text-[#D97706]">Cafe TAB</span>
          </h1>
          <p className="text-xl text-[#737373] max-w-3xl mx-auto leading-relaxed">
            More than just a café - we're a community space where memories are made over great food and coffee.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24"
        >
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold text-[#4E3B31] mb-6">Our Story</h2>
            <div className="space-y-4 text-[#737373] leading-relaxed">
              <p>
                Cafe TAB (Take A Break) was born from a simple idea: to create a warm, welcoming space in Bihar Sharif where people could escape the daily hustle and enjoy quality food and beverages.
              </p>
              <p>
                Located in the heart of Ghagra, near Allahabad Bank, we've become a beloved destination for students, professionals, and families alike. Our journey started with a passion for great coffee and has evolved into serving some of the best momos and biryani in town.
              </p>
              <p>
                Every dish we serve, every cup of coffee we brew, is crafted with care and attention to detail. We believe that food tastes better when it's made with love and served with a smile.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(78,59,49,0.12)]">
              <img
                src="https://images.unsplash.com/photo-1771554753130-9e63a3f63e4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxjb3p5JTIwY2FmZSUyMGludGVyaW9yJTIwd2FybSUyMGxpZ2h0aW5nfGVufDB8fHx8MTc3MjEzMTExNnww&ixlib=rb-4.1.0&q=85"
                alt="Cafe Interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-4xl font-bold text-[#4E3B31] mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: 'Quality First',
                description: 'We never compromise on the quality of ingredients and preparation',
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Building connections and creating a welcoming space for everyone',
              },
              {
                icon: Target,
                title: 'Consistency',
                description: 'Same great taste and service, every single time you visit',
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'Striving to exceed expectations in everything we do',
              },
            ].map((value, idx) => (
              <Card
                key={idx}
                data-testid={`value-card-${idx}`}
                className="bg-white border border-[#E5E5E5] p-8 rounded-xl hover:border-[#D97706]/50 hover:shadow-[0_8px_32px_rgba(78,59,49,0.12)] transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 bg-[#D97706]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#D97706]/20 transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-[#D97706]" />
                </div>
                <h3 className="text-xl font-semibold text-[#4E3B31] mb-3">{value.title}</h3>
                <p className="text-[#737373] text-sm leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* What We Offer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#F5F0EB] rounded-3xl p-12 md:p-16"
        >
          <h2 className="text-4xl font-bold text-[#4E3B31] mb-12 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Cozy Ambiance',
                items: ['Comfortable seating', 'Warm lighting', 'Pleasant music', 'Air-conditioned space'],
              },
              {
                title: 'Great Food',
                items: ['Fresh ingredients', 'Authentic flavors', 'Diverse menu', 'Special combos'],
              },
              {
                title: 'Convenience',
                items: ['Free Wi-Fi', 'Takeaway service', 'Delivery available', 'Parking nearby'],
              },
            ].map((section, idx) => (
              <div key={idx} data-testid={`offer-section-${idx}`}>
                <h3 className="text-2xl font-semibold text-[#4E3B31] mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#737373]">
                      <div className="w-2 h-2 bg-[#D97706] rounded-full"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
