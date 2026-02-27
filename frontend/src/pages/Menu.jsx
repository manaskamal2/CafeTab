import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'Coffee & Beverages', name: 'Coffee & Beverages' },
    { id: 'Snacks & Appetizers', name: 'Snacks & Appetizers' },
    { id: 'Main Courses', name: 'Main Courses' },
    { id: 'Specials & Combos', name: 'Specials & Combos' },
    { id: 'Desserts', name: 'Desserts' },
  ];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${API}/menu`);
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems =
    activeCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const groupedByCategory = categories.reduce((acc, cat) => {
    if (cat.id !== 'all') {
      acc[cat.id] = menuItems.filter((item) => item.category === cat.id);
    }
    return acc;
  }, {});

  return (
    <div data-testid="menu-page" className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black text-[#4E3B31] mb-6 tracking-tighter">
            Our <span className="text-[#D97706]">Menu</span>
          </h1>
          <p className="text-xl text-[#737373] max-w-3xl mx-auto leading-relaxed">
            Explore our delicious selection of coffee, snacks, and meals made fresh daily
          </p>
        </motion.div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
          <div className="mb-12">
            <TabsList
              data-testid="menu-category-tabs"
              className="inline-flex md:flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 md:gap-3 bg-[#F5F0EB] p-3 md:p-2 rounded-2xl md:rounded-full overflow-x-auto md:overflow-visible w-full scrollbar-hide"
            >
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  data-testid={`category-tab-${cat.id}`}
                  className="px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm font-medium transition-all duration-300 data-[state=active]:bg-[#4E3B31] data-[state=active]:text-[#FDFBF7] text-[#4E3B31] hover:bg-[#4E3B31]/10 whitespace-nowrap flex-shrink-0"
                >
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <p className="text-[#737373] text-lg">Loading menu...</p>
            </div>
          ) : (
            <TabsContent value={activeCategory} className="mt-0">
              {activeCategory === 'all' ? (
                // Show all categories with headers
                <div className="space-y-16">
                  {Object.entries(groupedByCategory).map(
                    ([category, items]) =>
                      items.length > 0 && (
                        <motion.div
                          key={category}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                        >
                          <h2 className="text-3xl font-bold text-[#4E3B31] mb-8 border-b-2 border-[#D97706] pb-4 inline-block">
                            {category}
                          </h2>
                          <MenuItemsList items={items} />
                        </motion.div>
                      )
                  )}
                </div>
              ) : (
                // Show filtered category
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <MenuItemsList items={filteredItems} />
                </motion.div>
              )}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

const MenuItemsList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#737373]">No items available in this category</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
        >
          <Card
            data-testid={`menu-item-${idx}`}
            className="bg-white border border-[#E5E5E5] p-6 rounded-xl hover:border-[#D97706]/50 hover:shadow-[0_8px_32px_rgba(78,59,49,0.12)] transition-all duration-300 group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#4E3B31] mb-2 group-hover:text-[#D97706] transition-colors">
                  {item.name}
                </h3>
                <p className="text-[#737373] text-sm leading-relaxed">{item.description}</p>
                {!item.is_available && (
                  <span className="inline-block mt-2 text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">
                    Currently Unavailable
                  </span>
                )}
              </div>
              <div className="flex-shrink-0">
                <div className="text-2xl font-black text-[#D97706]">₹{item.price}</div>
              </div>
            </div>
            {/* Receipt-style dotted line */}
            <div className="mt-4 border-b-2 border-dotted border-[#E5E5E5]"></div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
