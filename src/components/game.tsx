import React, { useState, useEffect, useRef } from "react";
import { AnswerCounter, Country, InfoText} from "../types/game";
import { getRandomValue } from "../utils/getRandonValue";

const initialAnswerCounter = {
    badAnswers: 0, 
    goodAnswers: 0
}

const Game = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [infoText, setInfoText] = useState("")
    const [loading, setLoading] = useState(false)
    const [countries, setCountries] = useState<Country[]>([])
    const [goodAnswer, setGoodAnswer] = useState<Country>()
    const [answerCounter, setAnswerCounter] = useState<AnswerCounter>({...initialAnswerCounter})

    const formRef = useRef<any>();

    useEffect(()=> {
        setLoading(true)
        fetch("https://countriesnow.space/api/v0.1/countries/capital")
        .then(res => res.json())
        .then(resJson => {
            const filteredData = resJson.data.filter((country: Country) => country?.name && country?.capital)

            setCountries((countries)=> [...countries,...filteredData]);
            setLoading((loading)=>!loading)
        });
    },[])


    const handlePlay = () => {

        setInfoText(()=> "")

        const randomValue = getRandomValue(0, countries.length)

        setIsPlaying((isPlaying)=>!isPlaying)

        setGoodAnswer(()=> countries[randomValue])

    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            answer: { value: string };
          };
          const answer = target.answer.value.toLowerCase();

          return answer === goodAnswer?.capital.toLowerCase() ? handleEndTry(true) : handleEndTry(false)
    }


    const handleEndTry = (wasGoodAnswer: boolean) => {

        if(wasGoodAnswer) {
            setAnswerCounter((prev)=> ({...prev, goodAnswers: prev.goodAnswers++}));
            if(answerCounter.goodAnswers === 5) return handleEndGame(true)

            handlePlay();
            setInfoText(()=> `Bonne réponse, devinez encore ${5 - answerCounter.goodAnswers} capitales pour gagner`)
        } else {
            setAnswerCounter((prev)=> ({...prev, badAnswers: prev.badAnswers++}));
            answerCounter.badAnswers === 3 ? handleEndGame(false)  : setInfoText(()=> `Mauvaise réponse, il vous reste encore ${3 - answerCounter.badAnswers} essai`)
        }

        formRef.current?.reset()
    }

    const handleEndGame = (hasWin: boolean) => {

        if(hasWin) {
            setInfoText(()=> InfoText.WIN)
        } else {
            setInfoText(()=> InfoText.LOOSE)
        }
        setGoodAnswer(()=> undefined)
        setAnswerCounter({...initialAnswerCounter})
        setIsPlaying((isPlaying)=> !isPlaying)
    }

  return (

    <div>
            {loading && <div>Loading...</div>}

            {countries.length &&
            <div>
                <button disabled={isPlaying} onClick={handlePlay}>Jouer</button>
            </div>
            }

            {goodAnswer &&
                <form ref={formRef} onSubmit={(e)=>handleSubmit(e)}>
                    <label>
                        Quelle est la capitale de {goodAnswer.name} :
                        <input type="text" name="answer" />
                    </label>
                    <input type="submit" value="Envoyer" />
                </form>
            }

            {infoText.length > 0 &&
                <p>{infoText}</p>
            }
    </div>
  )
}

export default Game;