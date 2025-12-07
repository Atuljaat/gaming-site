'use client';

import { motion } from 'framer-motion';
import { Trophy, Zap, Users, Shield, Target, Gift, Smartphone, Globe, Cpu } from 'lucide-react';

const features = [
    {
        icon: Trophy,
        title: "Daily Tournaments",
        description: "Compete daily in automated tournaments for your favorite titles and win big.",
        color: "from-yellow-400 to-orange-500"
    },
    {
        icon: Zap,
        title: "Instant Matchmaking",
        description: "Zero wait times. Smart queueing system assigns you to fair matches instantly.",
        color: "from-blue-400 to-indigo-500"
    },
    {
        icon: Gift,
        title: "Real Rewards",
        description: "Earn points, skins, and cryptocurrency directly to your connected wallet.",
        color: "from-green-400 to-emerald-500"
    },
    {
        icon: Shield,
        title: "Anti-Cheat Protected",
        description: "Our kernel-level protection ensures fair play for every single match.",
        color: "from-red-400 to-pink-500"
    },
    {
        icon: Users,
        title: "Community Clans",
        description: "Create or join clans, scrim against others, and climb the clan leaderboards.",
        color: "from-purple-400 to-pink-500"
    },
    {
        icon: Target,
        title: "Skill-Based Ranking",
        description: "Climb the ELO ladder and prove you're the best in your region.",
        color: "from-cyan-400 to-blue-500"
    },
    {
        icon: Smartphone,
        title: "Mobile Optimized",
        description: "Play seamlessly on any device. Your progress syncs everywhere.",
        color: "from-teal-400 to-green-500"
    },
    {
        icon: Globe,
        title: "Global Servers",
        description: "Low latency servers deployed across 15 regions worldwide.",
        color: "from-indigo-400 to-purple-500"
    },
    {
        icon: Cpu,
        title: "AI Analysis",
        description: "Get personalized insights and coaching tips after every match.",
        color: "from-rose-400 to-red-500"
    }
];

export default function Features() {
    return (
        <section className="py-24 relative overflow-hidden bg-background">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-1" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 mb-4 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium text-sm"
                    >
                        PLATFORM FEATURES
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-black mb-6"
                    >
                        BUILT FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">PROS</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-400 text-xl"
                    >
                        We provide the ultimate competitive environment with state-of-the-art infrastructure.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Hover Glow */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 blur-[50px] transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}>
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
