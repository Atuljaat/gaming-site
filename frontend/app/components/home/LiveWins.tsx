'use client';

import { motion } from 'framer-motion';
import { User, BadgeCheck } from 'lucide-react';

const wins = [
    { user: "Alex_99", game: "Plinko", amount: "$1,240.50", time: "2s ago" },
    { user: "ProGamer", game: "Mines", amount: "$5,000.00", time: "5s ago" },
    { user: "CryptoKing", game: "Roulette", amount: "$850.25", time: "12s ago" },
    { user: "LuckyStrike", game: "Plinko", amount: "$2,100.00", time: "15s ago" },
    { user: "GhostRunner", game: "Blackjack", amount: "$450.00", time: "22s ago" },
    { user: "Viper", game: "Mines", amount: "$9,800.00", time: "28s ago" },
    { user: "Shadow", game: "Slots", amount: "$3,250.75", time: "35s ago" },
];

export default function LiveWins() {
    return (
        <div className="w-full bg-black/40 border-y border-white/5 backdrop-blur-sm overflow-hidden py-3">
            <div className="flex relative items-center">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

                <div className="flex items-center gap-4 px-4 border-r border-white/10 mr-4 z-20 bg-background/50">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="font-bold text-sm tracking-wide text-green-500 uppercase whitespace-nowrap">Live Wins</span>
                </div>

                <motion.div
                    className="flex items-center gap-8 whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {/* Duplicate list for infinite scroll effect */}
                    {[...wins, ...wins, ...wins].map((win, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm bg-white/5 px-4 py-1.5 rounded-full border border-white/5 hover:border-primary/30 transition-colors cursor-pointer group">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                                <User className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{win.user}</span>
                            <span className="text-gray-500 text-xs">in {win.game}</span>
                            <span className="text-green-400 font-bold flex items-center gap-1">
                                {win.amount}
                                {parseFloat(win.amount.replace(/[^0-9.]/g, '')) > 1000 && <BadgeCheck className="w-3 h-3 text-blue-400" />}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
