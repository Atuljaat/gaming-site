'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { GiHamburgerMenu } from "react-icons/gi";
import { authClient } from '../lib/client';
import { useUserStore } from '../store/userStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';

// TODO : Make the navbar responsive
function Navbar() {

    const session = authClient.useSession();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [balance, setBalance] = useState<number | null>(null)
    const { walletBalance } = useUserStore()
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', link: '/' },
        { name: 'Games', link: '/games' }
    ]
    const authItems = [
        { name: 'Login', link: '/login' },
        { name: 'Signup', link: '/signup' }
    ]

    async function handleSignOut() {
        try {
            await authClient.signOut();
        } catch (error) {
            console.error('Signout failed:', error);
        }
    }

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/10 py-4' : 'py-6 bg-transparent'}`} >
                <div className="container mx-auto px-6 h-16 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/40 transition-colors">
                            <Gamepad2 className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            NEXUS<span className="text-primary">GAMING</span>
                        </span>
                    </Link>

                    <div className='lg:flex hidden gap-8 items-center' >
                        {
                            navItems.map((item) => (
                                <Link key={item.name} href={`./${item.link}`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group">
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                                </Link>
                            ))
                        }
                    </div>

                    <div className='lg:flex hidden gap-4 items-center' >
                        {session?.data ?
                            (
                                <div className="flex items-center gap-4">
                                    <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                                        <span className="text-xs text-gray-400">Balance:</span>
                                        <span className="font-bold text-primary">${walletBalance?.toFixed(2) || '0.00'}</span>
                                    </div>
                                    <button
                                        onClick={handleSignOut}
                                        className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )
                            :
                            (
                                <div className="flex items-center gap-4">
                                    {authItems.map((item) => (
                                        <Link key={item.name} href={`./${item.link}`}>
                                            <button className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${item.name === 'Signup'
                                                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(var(--primary),0.3)]'
                                                    : 'text-white hover:bg-white/10'
                                                }`}>
                                                {item.name}
                                            </button>
                                        </Link>
                                    ))}
                                </div>
                            )
                        }
                    </div>

                    <div className='lg:hidden block'>
                        <button onClick={() => setIsOpen((prev) => !prev)} className="p-2 text-white hover:bg-white/10 rounded-lg">
                            <GiHamburgerMenu size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className='fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-xl lg:hidden flex flex-col p-6 gap-6 border-t border-white/10'
                    >
                        <div className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={`./${item.link}`}
                                    className="text-lg font-medium text-white p-2 hover:bg-white/5 rounded-lg"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="h-px bg-white/10" />
                        <div className="flex flex-col gap-4">
                            {!session?.data ? authItems.map((item) => (
                                <Link key={item.name} href={`./${item.link}`} onClick={() => setIsOpen(false)}>
                                    <button className={`w-full py-3 rounded-xl font-bold ${item.name === 'Signup' ? 'bg-primary text-primary-foreground' : 'bg-white/5 text-white'
                                        }`}>
                                        {item.name}
                                    </button>
                                </Link>
                            )) : (
                                <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="w-full py-3 rounded-xl font-bold bg-red-500/10 text-red-500">
                                    Sign Out
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar