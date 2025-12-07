'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { useUserStore } from '@/app/store/userStore'
import { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { startMineGame } from '@/app/actions/startGame'
import type { mineGameStartParams } from '@/app/actions/startGame'

type mineBetBoxProps = {
    isGameStarted : boolean,
    handleStartGame : (value:boolean) => void
}

function MineBetBox({isGameStarted,handleStartGame}:mineBetBoxProps) {
    const { walletBalance, user } = useUserStore();
    const [clientSecret, setClientSecret] = useState(crypto.randomUUID());
    const [betAmount, setBetAmount] = useState(0);
    const [numberOfMines, setNumberOfMines] = useState(1);
    const [gameData , setGameData] = useState<any>(null);


    async function startGame (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const params: mineGameStartParams = {
            userId: user?.userId || '',
            clientSecret: clientSecret,
            betAmount: betAmount,
            numberOfMines: numberOfMines
        }
        try {
            const res = await startMineGame(params);
            console.log("game started ", res);
            handleStartGame(true);
            setGameData(res);
            console.log("game data ",gameData);
        } catch (error) {
            console.log("error starting game ", error);
        }
    }


    return (
        <div className='flex flex-col justify-center'>
            <form onSubmit={(e) => startGame(e)}>

                <div className='grid w-full max-w-sm gap-6'>
                    <div>
                        <Label>
                            Bet Amount
                        </Label>
                        <InputGroup>
                            <InputGroupInput value={betAmount.toString()} onChange={(e) => setBetAmount(Number(e.target.value))} placeholder='enter your bet Amount' type='number' required={true} min={0} max={walletBalance} disabled={isGameStarted} />
                            <InputGroupAddon align={'inline-end'}>
                                <InputGroupText>
                                    coins
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    <div>

                        <Label>
                            Select Number of Mines
                        </Label>
                        <Select
                            required={true}
                            disabled={isGameStarted}
                            defaultValue={numberOfMines.toString()}
                            onValueChange={(e) => setNumberOfMines(Number(e))} >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectGroup>
                                    {
                                        Array.from({ length: 24 }, (_, index) => (
                                            <SelectItem key={index} value={String(index + 1)}> {index + 1} Mines</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>
                            Client Secret
                        </Label>
                        <InputGroup>
                            <InputGroupInput
                                value={clientSecret}
                                onChange={(e) => setClientSecret(e.target.value)}
                                maxLength={40}
                                disabled={isGameStarted}
                                placeholder='client secret' type='text' />
                        </InputGroup>
                    </div>
                   {!isGameStarted ? 
                    <Button className='hover:cursor-pointer' type='submit'>
                        Start Game
                    </Button> :
                    <Button disabled={true} className='hover:cursor-not-allowed' type='button'>
                        Cash Out
                    </Button>
                    }
                </div>
            </form>
            
        </div>
    )
}

export default MineBetBox