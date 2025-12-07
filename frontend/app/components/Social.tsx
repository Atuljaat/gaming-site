'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { authClient } from '../lib/client';
import { FaGoogle, FaDiscord, FaReddit } from "react-icons/fa";

function Social() {

    const socialLoginHandler = async (provider: 'google' | 'discord' | 'reddit') => {
        try {
            await authClient.signIn.social({
                provider: provider,
            })
        } catch (error) {
            console.error(`${provider} Signin Error : `, error);
        }
    }

    const socialLogins = [
        {
            name: 'Google',
            icon: FaGoogle,
            provider: 'google',
            handler: () => socialLoginHandler('google'),
            color: 'hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/50'
        },
        {
            name: 'Discord',
            icon: FaDiscord,
            provider: 'discord',
            handler: () => socialLoginHandler('discord'),
            color: 'hover:bg-indigo-500/20 hover:text-indigo-500 hover:border-indigo-500/50'
        },
        {
            name: 'Reddit',
            icon: FaReddit,
            provider: 'reddit',
            handler: () => socialLoginHandler('reddit'),
            color: 'hover:bg-orange-500/20 hover:text-orange-500 hover:border-orange-500/50'
        }
    ]

    return (
        <div className='flex gap-3 justify-center mb-6' >
            {
                socialLogins.map((social) => (
                    <Button
                        key={social.name}
                        type='button'
                        variant="outline"
                        className={`w-full bg-white/5 border-white/10 text-white h-12 transition-all duration-300 ${social.color}`}
                        onClick={social.handler} >
                        <social.icon className="w-5 h-5 mr-2" />
                        {social.name}
                    </Button>
                ))
            }
        </div>
    )
}

export default Social