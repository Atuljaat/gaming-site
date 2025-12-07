'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, PlayCircle } from 'lucide-react';

const games = [
    {
        id: 'plinko',
        title: 'Plinko',
        image: '/plinko.png',
        link: '/games/plinko',
        category: 'Luck',
        active: true
    },
    {
        id: 'mines',
        title: 'Mines',
        image: '/mines.png',
        link: '/games/mines',
        category: 'Strategy',
        active: true
    },
    {
        id: 'roulette',
        title: 'Roulette',
        image: '/hero-bg.png', // Placeholder
        link: '/games',
        category: 'Classic',
        active: false
    },
    {
        id: 'blackjack',
        title: 'Blackjack',
        image: '/hero-bg.png', // Placeholder
        link: '/games',
        category: 'Cards',
        active: false
    }
];

export default function FeaturedGames() {
    return (
        <section className="py-24 bg-background relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold mb-4"
                        >
                            Featured <span className="text-primary">Games</span>
                        </motion.h2>
                        <p className="text-gray-400">Select your arena and start winning.</p>
                    </div>
                    <Link href="/games">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors font-medium px-4 py-2"
                        >
                            View All Games <ArrowUpRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {games.map((game, index) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
                        >
                            <Link href={game.active ? game.link : '#'}>
                                <div className="absolute inset-0">
                                    <Image
                                        src={game.image}
                                        alt={game.title}
                                        fill
                                        className={`object-cover transition-transform duration-700 group-hover:scale-110 ${!game.active ? 'grayscale opacity-40' : ''}`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                </div>

                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-medium border border-white/10 text-white">
                                        {game.category}
                                    </span>
                                </div>

                                {!game.active && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="px-4 py-2 bg-black/80 backdrop-blur text-white text-sm font-bold uppercase tracking-widest border border-white/10 rounded-lg transform -rotate-12">
                                            Coming Soon
                                        </span>
                                    </div>
                                )}

                                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
                                    <div className="flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {game.active ? (
                                            <>
                                                <PlayCircle className="w-5 h-5" /> Play Now
                                            </>
                                        ) : (
                                            <span className="text-gray-400">Notify Me</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/games">
                        <button className="inline-flex items-center gap-2 text-primary md:hidden font-medium">
                            View All Games <ArrowUpRight className="w-5 h-5" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
