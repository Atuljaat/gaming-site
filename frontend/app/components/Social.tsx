'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { authClient } from '../lib/client';
import { discord } from 'better-auth/social-providers';

function Social() {

    const socialLoginHandler = async (provider: 'google' | 'discord' | 'reddit') => {
        try {
            await authClient.signIn.social({
                provider : provider,
            })
        } catch (error) {
            console.error(`${provider} Signin Error : `, error);
        }
    }
    
        
    const socialLogins = [
        {
            name : 'Google',
            provider : 'google',
            handler : () => socialLoginHandler('google')
        } ,
        {
            name : 'Discord',
            provider : 'discord',
            handler : () => socialLoginHandler('discord')
        } ,
        {
            name : 'Reddit',
            provider : 'reddit',
            handler : () => socialLoginHandler('reddit')
        }
    ]

  return (
    <div className='grid grid-cols-2 py-2 gap-5' >
        {
            socialLogins.map((social) => (
                <Button 
                key={social.name} 
                type='button'
                className='hover:cursor-pointer' 
                onClick={social.handler} >
                    {social.name}
                </Button>
            ))
        }
    </div>
  )
}

export default Social