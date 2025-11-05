'use client'
import React from 'react'
import { useRef , useState } from 'react'
import { Button } from '@/components/ui/button';
import type { FormEvent } from 'react';
import { authClient } from '../lib/client';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Social from './Social';

function LogininForm () {
    let passwordRef = useRef<HTMLInputElement>(null);
    let emailRef = useRef<HTMLInputElement>(null);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const formInputs = [
        { label: 'Email', type: 'email', name: 'email' , ref: emailRef } ,
        { label: 'Password', type: 'password', name: 'password' , ref: passwordRef },
    ]

    const submitHandler = async (e:FormEvent): Promise<void> => {
        e.preventDefault();
        const email = emailRef.current?.value || '';
        const password = passwordRef.current?.value || '';

        const {data , error } = await authClient.signIn.email({
            email : email,
            password : password,
            rememberMe : rememberMe,
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
            <div className='text-4xl ' >
                LOGIN 
            </div>
            {
                error && <p className='text-red-500'> {error} </p>
            }
            {
                formInputs.map((input) => (
                    <div key={input.name}>
                        <label htmlFor={input.name}> {input.label} : </label>
                        <input className='border-black border rounded-sm pl-1' required={true} type={input.type} name={input.name} ref={input.ref} id={input.name} />
                    </div>
                ))
            }
            <div  className='flex items-center gap-2' >
                <Label htmlFor='rememberMe' className='font-normal' >
                    Remember Me
                </Label>
                <Checkbox 
                id='rememberMe'
                checked={rememberMe}
                onCheckedChange={() => {
                    setRememberMe(!rememberMe)
                }}
                className='border-black hover:cursor-pointer'></Checkbox>
            </div>
            <Button type='submit' > Submit </Button>
        <div>
            <Social />
        </div>
        </form>
    </div>
  )
}

export default LogininForm