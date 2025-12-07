'use client';

import { motion } from 'framer-motion';

const stats = [
    { label: "Total Players", value: "2.4M+", color: "text-blue-400" },
    { label: "Games Played", value: "150M+", color: "text-primary" },
    { label: "Won Today", value: "$4.2M", color: "text-green-400" },
    { label: "Online Now", value: "12,450", color: "text-purple-400" },
];

export default function Stats() {
    return (
        <section className="py-12 border-y border-white/5 bg-black/20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <h3 className={`text-4xl md:text-5xl font-black mb-2 ${stat.color} drop-shadow-lg`}>
                                {stat.value}
                            </h3>
                            <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
