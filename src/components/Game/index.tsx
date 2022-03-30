import React, { useState, useEffect, useRef } from "react";

import { getRandomValue } from "../../utils/getRandomValue";
import { GameContainer, GameForm, Input, Label } from "./Game.styles";
import { ApiCall, CounterActionTypes, CountriesDataType, Country, InfoText } from "../../store/game/types";

// const initialAnswer: Country = {
//     name: undefined,
//     capital: undefined,
//     iso2: undefined,
//     flag: undefined
// }

const Game:React.FC<{
    countries: Country[],
    countryToGuess: Country,
    apiCall: ApiCall,
    isLoading: boolean,
    goodAnswersCount: number,
    badAnswersCount: number,
    getCountriesData: (url: string, options: any, dataType: CountriesDataType) => void,
    updateApiCall: (url: string, options: any, dataType: CountriesDataType) => void,
    setCountryToGuess: (country: Country) => void,
    updateAnswerCounter: (countActionType: CounterActionTypes) => void,
}>  = ({countries, countryToGuess, apiCall, isLoading, goodAnswersCount, badAnswersCount, getCountriesData, updateApiCall, setCountryToGuess, updateAnswerCounter}) => {

    const [isPlaying, setIsPlaying] = useState(false)
    const [infoText, setInfoText] = useState("")

    const formRef = useRef<any>();

    useEffect(()=> {

        getCountriesData(apiCall.url, apiCall.options, apiCall.dataType)

    },[apiCall, getCountriesData])

    useEffect(()=> {

        if(countryToGuess.iso2) {  

        updateApiCall("https://countriesnow.space/api/v0.1/countries/flag/images",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                "iso2": countryToGuess.iso2
            })
          }, 
          CountriesDataType.FLAG)
        }
    },[countryToGuess.iso2, updateApiCall])

    const handlePlay = () => {
        setIsPlaying((isPlaying)=>!isPlaying)
        setInfoText(()=> "")

        const randomValue = getRandomValue(0, countries.length)
        setCountryToGuess(countries[randomValue])
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            answer: { value: string };
          };
          const playerAnswer = target.answer.value.toLowerCase();

          return playerAnswer === countryToGuess.capital?.toLowerCase() ? handleEndTry(true) : handleEndTry(false)
    }


    const handleEndTry = (wasGoodAnswer: boolean) => {

        if(wasGoodAnswer) {

            updateAnswerCounter(CounterActionTypes.INC)
            if(goodAnswersCount === 4) return handleEndGame(true)

            handlePlay();
            setInfoText(()=> `Bonne réponse, devinez encore ${5 - goodAnswersCount} capitales pour gagner`)
        } else {
            updateAnswerCounter(CounterActionTypes.DEC)
            badAnswersCount === 2 ? handleEndGame(false)  : setInfoText(()=> `Mauvaise réponse, il vous reste encore ${3 - badAnswersCount} essai`)
        }

        formRef.current?.reset()
    }

    const handleEndGame = (hasWin: boolean) => {

        if(hasWin) {
            setInfoText(()=> InfoText.WIN)
        } else {
            setInfoText(()=> InfoText.LOOSE)
        }
        // To do : reset game
        // setAnswer(()=> ({...initialAnswer}))
        setIsPlaying((isPlaying)=> !isPlaying)
    }

  return (

    <GameContainer>
            {isLoading && <div>Loading...</div>}

            {countries.length &&
            <div>
                <button disabled={isPlaying} onClick={handlePlay}>Jouer</button>
            </div>
            }

            {countryToGuess.name && countryToGuess.flag &&
                
                <GameForm ref={formRef} onSubmit={(e)=>handleSubmit(e)}>
                    <Label>
                        {countryToGuess.flag &&
                           <img style={{display: 'block', margin: "auto"}} alt="country flag" width="200" src={countryToGuess.flag}/>
                        }

                        Quelle est la capitale de {countryToGuess.name} :
                        <Input type="text" name="answer" />
                    </Label>
                    <Input type="submit" value="Envoyer" />
                </GameForm>
            }

            {infoText.length > 0 &&
                <p>{infoText}</p>
            }
    </GameContainer>
  )
}

export default Game;