'use client';

import { motion } from 'framer-motion';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import { Package, Layers, Database } from 'lucide-react';



const COLORS = ['#f97316', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6', '#eab308'];





const containerVariants = {

  hidden: { opacity: 0 },

  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }

};



const itemVariants = {

  hidden: { y: 20, opacity: 0, scale: 0.95 },

  visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.4 } }

};



export default function Overview({ totalProducts, totalStock, categoriesCount, cartItemsCount, contributedCount, categoryData }: any) {

  const stats = [

    { label: 'Total Products', value: totalProducts, icon: Package },

    { label: 'Total Stock', value: totalStock, icon: Database },

    { label: 'Categories Matrix', value: categoriesCount, icon: Layers },

  ];



  const chartData = categoryData.map((item: any) => ({ name: item._id, value: item.count }));



  return (

    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">

     

      {/* Top Cards with better hover animation */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {stats.map((stat, i) => (

          <motion.div

            key={i}

            variants={itemVariants}

            whileHover={{ y: -5, scale: 1.02 }}

            whileTap={{ scale: 0.98 }}

            className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer"

          >

            <div>

              <p className="text-sm font-bold text-gray-400 uppercase">{stat.label}</p>

              <h3 className="text-2xl font-extrabold text-gray-700 mt-1">{stat.value}</h3>

            </div>

            <div className="p-4 bg-orange-50 rounded-2xl text-orange-600"><stat.icon size={28} /></div>

          </motion.div>

        ))}

      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

       

        {/* Category Chart Section with Tooltip */}

        <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">

          <h3 className="text-lg font-bold text-gray-900 mb-6">PRODUCTS BY CATEGORY</h3>

          <div className="h-48">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">

                  {chartData.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}

                </Pie>

                {/* Tooltip add করা হয়েছে */}

                <Tooltip

                    contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}

                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </motion.div>



        {/* User Activity Section */}

        <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">

          <h3 className="text-lg font-bold text-gray-900 mb-8">USER ACTIVITY METRICS</h3>

          <div className="space-y-8">

            {[ { label: 'Cart Items', value: cartItemsCount }, { label: 'My Contributions', value: contributedCount } ].map((metric, i) => (

              <div key={i}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold text-gray-600">{metric.label}</span>

                  <span className="font-bold text-orange-600">{metric.value}</span>

                </div>

                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">

                  <motion.div

                    initial={{ width: 0 }}

                    whileInView={{ width: `${Math.min(metric.value * 10, 100)}%` }}

                    transition={{ duration: 1.5, ease: "easeInOut" }}

                    className="h-full bg-orange-500 rounded-full"

                  />

                </div>

              </div>

            ))}

          </div>

        </motion.div>

      </div>

    </motion.div>

  );

} 

