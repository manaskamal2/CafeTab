import React from 'react';
import { motion } from 'framer-motion';

export const Gallery = () => {
  const images = [
    {
      url: 'https://images.pexels.com/photos/35204925/pexels-photo-35204925.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      title: 'Cozy Interior',
      category: 'Ambiance',
    },
    {
      url: 'https://images.pexels.com/photos/28052357/pexels-photo-28052357.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      title: 'Perfect Coffee',
      category: 'Beverages',
    },
    {
      url: 'https://images.pexels.com/photos/28445589/pexels-photo-28445589.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      title: 'Delicious Momos',
      category: 'Food',
    },
    {
      url: 'https://images.pexels.com/photos/29631417/pexels-photo-29631417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      title: 'Aromatic Biryani',
      category: 'Food',
    },
    {
      url: 'https://images.unsplash.com/photo-1753351057972-daf1ab19548e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGZyaWVuZHMlMjBlYXRpbmclMjBhdCUyMGNhZmV8ZW58MHx8fHwxNzcyMTMxMTIxfDA&ixlib=rb-4.1.0&q=85',
      title: 'Good Times',
      category: 'People',
    },
    {
      url: 'https://images.unsplash.com/photo-1771554753130-9e63a3f63e4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxjb3p5JTIwY2FmZSUyMGludGVyaW9yJTIwd2FybSUyMGxpZ2h0aW5nfGVufDB8fHx8MTc3MjEzMTExNnww&ixlib=rb-4.1.0&q=85',
      title: 'Relaxing Space',
      category: 'Ambiance',
    },
  ];

  return (
    <div data-testid="gallery-page" className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black text-[#4E3B31] mb-6 tracking-tighter">
            Our <span className="text-[#D97706]">Gallery</span>
          </h1>
          <p className="text-xl text-[#737373] max-w-3xl mx-auto leading-relaxed">
            Experience the warmth, flavors, and moments that make Cafe TAB special
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="break-inside-avoid"
            >
              <div
                data-testid={`gallery-item-${idx}`}
                className="relative group overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(78,59,49,0.08)] hover:shadow-[0_8px_32px_rgba(78,59,49,0.12)] transition-all duration-300"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4E3B31]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-xs font-semibold text-[#D97706] uppercase tracking-wide mb-1">
                    {image.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">{image.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 bg-[#F5F0EB] rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#4E3B31] mb-4">
            Visit Us & Create Your Own Memories
          </h2>
          <p className="text-lg text-[#737373] mb-8">
            We're open daily from 11:00 AM to 10:00 PM
          </p>
        </motion.div>
      </div>
    </div>
  );
};
