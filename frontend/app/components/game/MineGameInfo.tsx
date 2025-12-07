import React from 'react'

type mineGameInfoProps = {
  multiplier?: string
  betAmount?: number
  cashedOutAmount?: number
}

function MineGameInfo({ multiplier, betAmount, cashedOutAmount }: mineGameInfoProps) {
  return (
    <div>
      Multiplier : {multiplier ? multiplier : 'N/A'} <br />
      Bet Amount : {betAmount ? betAmount : 'N/A'} <br />
    </div>
  )
}

export default MineGameInfo