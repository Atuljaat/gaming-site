'use client'
import React from 'react'
import { useState } from 'react'

type MineBoxProps = {
  index: number , 
  isClickable?: boolean
}

function mineBox({index,isClickable}:MineBoxProps){
  const [isRevealed, setIsRevealed] = useState(false);
  
  function revealBox(){
    if (isClickable){
      setIsRevealed(true);
    }
  }

  return (
    <button 
    disabled={!isClickable}
    onClick={revealBox}
    className='h-25 w-25 flex px-2 items-center justify-center bg-red-400 rounded-md hover:cursor-pointer'>
        {
          isRevealed ? 
          index :
          'not revealed'
        }
    </button>
  )
}

export default mineBox