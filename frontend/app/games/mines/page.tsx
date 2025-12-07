'use client'
import React from 'react'
import MineBox from '@/app/components/game/MineBox'
import MineBetBox from '@/app/components/game/MineBetBox'
import { useState } from 'react'
import MineGameInfo from '@/app/components/game/MineGameInfo'

function page() {
  const [isGameStarted,setIsGameStarted] = useState(false);

  function handleGameStart(value:boolean):void{
    setIsGameStarted(value);
  }

  return (
    <div className='min-h-screen grid py-16 grid-cols-2 '>
      <div className='p-4 grid gap-6'>
        <MineBetBox isGameStarted={isGameStarted} handleStartGame={handleGameStart}/>
        <MineGameInfo/>
      </div>
      <div className='grid grid-cols-5 grid-rows-5 gap-1 p-4  '>
        {
          Array.from({length : 25},(_,index)=>(
            <MineBox key={index} index={index+1} isClickable={isGameStarted}/>
          ))
        }
      </div>
    </div>
  )
}

export default page