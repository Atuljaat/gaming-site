"use server"

export type mineGameStartParams = {
    userId : string,
    clientSecret: string,
    betAmount: number,
    numberOfMines: number
}

export type mineGameStartResponse = {
    gameId : string,
    hash_server_seed : string,
    multiplier : string,
    tilesRemaining : string,
    betId : string
}

export type mineGameErrorResponse = {
    error : string,
    errorMsg : string
}

export async function startMineGame({userId,clientSecret: clientSeed,betAmount,numberOfMines}:mineGameStartParams) : Promise<mineGameStartResponse | mineGameErrorResponse | undefined> {
    try {
        const res = await fetch('http://127.0.0.1:8000/games/mines/start',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                "userId" : userId,
                "clientSecret":clientSeed,
                "bet":betAmount,
                "minesCount":numberOfMines
            })
        })
        if (res.ok){
            const data = await res.json()
            return data;
        }
    } catch (error) {
        return ({error : 'error starting mine game' , errorMsg : String(error)} );
    }
}
