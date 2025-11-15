'use client'
import { useEffect, useState } from 'react'
import { authClient } from '../lib/client'

export default function Balance() {
  const [balance, setBalance] = useState<number | null>(null)
  const session = authClient.useSession()

  useEffect(() => {
    async function loadBalance() {
      const res = await fetch('http://localhost:8000/wallet/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: session.data?.user.id  }), // Replace with actual user ID
      })
      const data = await res.json()
      setBalance(data.balance)
    }
    loadBalance()
  }, [])

  if (balance === null) return <div>Loading...</div>

  return <div className="font-semibold">₹{balance}</div>
}
