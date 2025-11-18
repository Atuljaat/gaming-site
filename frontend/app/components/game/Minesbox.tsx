'use client'
import React from 'react'
import { useState } from 'react'

function Minesbox(cellIndex: number) {
    const [isReveal,setIsReveal] = useState<boolean>(false);
    
    let hitapi = 'http://localhost:8000/mines/reveal'

    async function revealBox (){
        const response = await fetch(hitapi,)
    }
    
  return (
    <div>
        <button>
            {
                isReveal ? "Revealed" : "Not Revealed"
            }
        </button>
    </div>
  )
}

export default Minesbox