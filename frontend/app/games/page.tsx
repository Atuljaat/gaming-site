import React from 'react'
import { auth } from '../lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

async function page() {
  // const session = await auth.api.getSession({
  //   headers: await headers()
  // })

  // if (!session?.session) {
  //   redirect('/login')
  // }

  return (
    <div className='flex items-center justify-center min-h-screen text-3xl ' >
        THIS IS A GAME PAGE AND YOU NEED TO BE LOGIN TO SEE THIS
    </div>
  )
}

export default page