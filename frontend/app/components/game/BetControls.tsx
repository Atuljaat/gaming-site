'use client'
import React from 'react'
import { useUserStore } from '@/app/store/userStore'

function BetControls() {
  const { walletBalance } = useUserStore()

  return (
    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-slate-700">

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-center text-blue-400">
        Place Your Bet
      </h2>

      {/* Bet Amount */}
      <div className="space-y-2">
        <label htmlFor="amount" className="text-sm text-gray-300">
          Bet Amount
        </label>
        <input
          type="number"
          min={1}
          max={walletBalance}
          step={1}
          defaultValue={1}
          className="w-full bg-slate-800 px-4 py-3 rounded-lg outline-none border border-slate-700
                     focus:border-blue-500 transition-all"
        />
        <p className="text-xs text-gray-400">
          Max: {walletBalance}
        </p>
      </div>

      {/* Number of Mines */}
      <div className="space-y-2">
        <label htmlFor="mines" className="text-sm text-gray-300">
          Number of Mines
        </label>

        <input
          type="number"
          min={1}
          max={25}
          step={1}
          defaultValue={3}
          className="w-full bg-slate-800 px-4 py-3 rounded-lg outline-none border border-slate-700
                     focus:border-blue-500 transition-all"
        />

        <p className="text-xs text-gray-400">
          Choose between 1 – 25 mines
        </p>
      </div>

      {/* Play Button */}
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-3 rounded-xl 
                   text-lg font-semibold shadow-lg"
      >
        Start Game
      </button>
    </div>
  )
}

export default BetControls
