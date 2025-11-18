import React from 'react'
import BetControls from '@/app/components/game/BetControls'
import MinesUI from '@/app/components/game/MinesUI'

function page() {
  return (
    <div className='min-h-screen flex justify-evenly items-center'>
      <BetControls />
      <MinesUI />
    </div>
  )
}

export default page