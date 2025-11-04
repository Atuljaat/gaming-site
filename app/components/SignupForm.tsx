'use client'
import React from 'react'
import { useRef , useState } from 'react'
import { Button } from '@/components/ui/button';
import type { FormEvent } from 'react';
import { authClient } from '../lib/client';
import { useRouter } from 'next/navigation';
import Social from './Social';

function SignupForm () {
    let usernameRef = useRef<HTMLInputElement>(null);
    let passwordRef = useRef<HTMLInputElement>(null);
    let emailRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const formInputs = [
        { label: 'Username', type: 'text', name: 'username' , ref: usernameRef },
        { label: 'Email', type: 'email', name: 'email' , ref: emailRef } ,
        { label: 'Password', type: 'password', name: 'password' , ref: passwordRef },
    ]

    const submitHandler = async (e:FormEvent): Promise<void> => {
        e.preventDefault();
        const username = usernameRef.current?.value || '';
        const email = emailRef.current?.value || '';
        const password = passwordRef.current?.value || '';

        const {data , error } = await authClient.signUp.email({
            name : username,
            email : email,
            password : password,
            callbackURL : 'http://localhost:3000/'
        })

        if (error) {
            setError(error.message || 'An error occurred during sign up.');
            return;
        }

        if (data.token) {
            router.push('/');
            return
        }
    }

  return (
    <div>
        <form onSubmit={submitHandler} className='flex items-center justify-center flex-col min-h-screen gap-3'>
            <div className='text-4xl'>
                SIGNUP
            </div>
            {
                error && <p className='text-red-500'> {error} </p>
            }
            {
                formInputs.map((input) => (
                    <div key={input.name}>
                        <label htmlFor={input.name}> {input.label} : </label>
                        <input className='border rounded-sm pl-1 border-black' required={true} type={input.type} name={input.name} ref={input.ref} id={input.name} />
                    </div>
                ))
            }
            <Button type='submit' > Submit </Button>
        <div>
            <Social />
        </div>
        </form>
    </div>
  )
}

export default SignupForm