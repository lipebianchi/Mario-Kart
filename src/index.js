const Players = {
    "MARIO": {
        name: "Mario",
        speed: 4,
        maneuverability: 3,
        power: 3,
        points: 0
    },

    "LUIGI": {
        name: "Luigi",
        speed: 3,
        maneuverability: 4,
        power: 4,
        points: 0
    },
    "PEACH": {
        name: "Peach",
        speed: 3,
        maneuverability: 4,
        power: 2,
        points: 0
    },
    "YOSHI": {
        name: "Yoshi",
        speed: 2,
        maneuverability: 4,
        power: 3,
        points: 0
    },
    "DONKEY KONG": {
        name: "Donkey Kong",
        speed: 2,
        maneuverability: 2,
        power: 5,
        points: 0
    },
    "BOWSER": {
        name: "Bowser",
        speed: 5,
        maneuverability: 2,
        power: 5,
        points: 0
    }
}

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1
}

async function generateTrack(){
    return Math.floor(Math.random() * 3) + 1
}

async function getResultDice(charName, diceResult, attribute){
    console.log(`${charName} rolou um dado 🎲 e tirou: ${diceResult}\n🎯 Resultado: ${attribute} + ${diceResult} = ${attribute + diceResult}\n`)
}

async function getWinnerRound(dice1, dice2, player1, player2, attribute){
    switch(attribute){
        case 1:
            if(dice1 + player1.speed > dice2 + player2.speed){
                player1.points++
                console.log(`\n🏅 ${player1.name} VENCEU e ganhou 1 ponto!\n\n---------------------------`)
            }else if(dice2 + player2.speed > dice1 + player1.speed){
                player2.points++
                console.log(`\n🏅 ${player2.name} VENCEU e ganhou 1 ponto!\n\n---------------------------`)
            }else{
                console.log("\nNão houve vencedores!\n")
            }
            break
        case 2:
            if(dice1 + player1.maneuverability > dice2 + player2.maneuverability){
                player1.points++
                console.log(`\n🏅 ${player1.name} VENCEU e ganhou 1 ponto!\n\n---------------------------`)
            }else if(dice2 + player2.maneuverability > dice1 + player1.maneuverability){
                player2.points++
                console.log(`\n🏅 ${player2.name} VENCEU e ganhou 1 ponto!\n\n---------------------------`)
            }else{
                console.log("\nNão houve vencedores!\n")
            }
            break
        case 3:
            if(dice1 + player1.power > dice2 + player2.power){
                if(player2.points > 0){
                    player2.points--
                    console.log(`\n🧨 ${player2.name} PERDEU e perdeu 1 ponto!\n\n---------------------------`)
                }else{
                    console.log("\nNão há pontos a perder!\n---------------------------")
                } 
            }else if(dice2 + player2.power > dice1 + player1.power){
                if(player1.points > 0){
                    player1.points--
                    console.log(`\n🧨 ${player1.name} PERDEU e perdeu 1 ponto!\n\n---------------------------`)
                }else{
                    console.log("Não há pontos a perder!\n---------------------------")
                }
            }else{
                console.log("\nNão houve vencedores!\n")
            }
            break
    }
}

async function getWinnerGame(player1, player2){
    if(player1.points > player2.points){
        console.log(`🏅 ${player1.name} venceu com ${player1.points} pontos vs ${player2.points} pontos de ${player2.name}`)
    }else if(player1.points < player2.points){
        console.log(`🏅 ${player2.name} venceu com ${player2.points} pontos vs ${player1.points} pontos de ${player1.name}`)
    }else{
        console.log(`Não houve vencedores, pontos empatados em ${player1.points}!`)
    }
}

async function startRace(player1, player2){
    for(let round = 1; round <= 5; round++){
        console.log(`🚥 RODADA ${round} começando! 🚀\n---------------------------`)
        track = await generateTrack()

        switch(track){
            case 1:
                console.log("PISTA DA VEZ: RETA!\n")
                dice1 = await rollDice()
                dice2 = await rollDice()

                await getResultDice(player1.name, dice1, player1.speed)
                await getResultDice(player2.name, dice2, player2.speed)
                
                await getWinnerRound(dice1, dice2, player1, player2, 1)
                break
            case 2:
                console.log("PISTA DA VEZ: CURVA!\n")
                dice1 = await rollDice()
                dice2 = await rollDice()

                await getResultDice(player1.name, dice1, player1.maneuverability)
                await getResultDice(player2.name, dice2, player2.maneuverability)

                await getWinnerRound(dice1, dice2, player1, player2, 2)
                break
            case 3:
                console.log("PISTA DA VEZ: CONFRONTO!\n")
                dice1 = await rollDice()
                dice2 = await rollDice()

                await getResultDice(player1.name, dice1, player1.power)
                await getResultDice(player2.name, dice2, player2.power)

                await getWinnerRound(dice1, dice2, player1, player2, 3)
                break
        }
    }
}

(async function main(){
    const player1 = Players["PEACH"]
    const player2 = Players["BOWSER"]
    console.log(`🏁🚨 Corrida entre ${player1.name} e ${player2.name} começando...\n`)
    await startRace(player1, player2)
    await getWinnerGame(player1, player2)
})()