'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react';
import { authClient } from '../lib/client';
import Balance from './Balance';

// TODO : Make the navbar responsive
function Navbar() {
    
    const session = authClient.useSession();
    const [ balance , setBalance ] = useState<number | null>(null)

    const navItems = [
        {
            name: 'Home',
            link: '/'
        } ,
        {
            name: 'Games',
            link: '/games'
        }
    ]
    const authItems = [
        {
            name : 'Login',
            link : '/login'
        } , 
        {
            name : 'Signup',
            link : '/signup'
        }
    ]

    const [isOpen, setIsOpen] = useState<boolean>(false);

    async function handleSignOut () {
        try {
            await authClient.signOut();
        } catch (error) {
            console.error('Signout failed:', error);
        }
    }

  return (
    <div>
        <nav className='p-4 fixed top-0 left-0 right-0 pt-6 flex h-16 justify-around w-full' >
            <div>
                Hello Navbar
            </div>
            <div className='lg:flex hidden gap-10' >
                {
                    navItems.map((item) => (
                        <button className='cursor-pointer' key={item.name} >
                            <Link href={`./${item.link}`}>
                                {item.name}
                            </Link>
                        </button>
                    ))
                }
            </div>
            <div className='lg:flex hidden gap-4 ' >
                { session?.data ? 
                (
                <>
                <Balance />
                <button onClick={handleSignOut}>Sign Out</button>
                </>
                )
                :
                (
                    authItems.map((item) => (
                        <button key={item.name}>
                            <Link href={`./${item.link}`} >
                                {item.name}
                            </Link>
                        </button>
                )))
                }
            </div>
            {/* <div className='lg:hidden block'>
                <GiHamburgerMenu size={25} onClick={() => setIsOpen((prev) => !prev)}  />
            </div> */}
        </nav>
            {/* <div>
                {
                    isOpen && (
                        <div className='lg:hidden block ' >
                            
                        </div>
                    )
                }
            </div> */}
    </div>
  )
}

export default Navbar