import React, { useState, useEffect, useRef } from "react";
import useFetch from "../../hook/useFetch";
import { Answer, Country, InfoText} from "../../types/game";
import { getRandomValue } from "../../utils/getRandomValue";
import { GameContainer, GameForm, Input, Label } from "./Game.styles";


const initialAnswer: Answer = {
    correctAnswer: undefined,
    badAnswersCount: 0, 
    goodAnswersCount: 0
}

export const Game = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [infoText, setInfoText] = useState("")
    const [countries, setCountries] = useState<Country[]>([])

    const[answer, setAnswer] = useState<Answer>({...initialAnswer})

    const formRef = useRef<any>();

    const { response, error, loading } = useFetch();

    useEffect(()=> {
        if(response !== null) {
            const filteredData = response.data.filter((country: Country) => country?.name && country?.capital)
            setCountries((countries)=> [...countries,...filteredData]);
        }
    },[response])


    const handlePlay = () => {
        setIsPlaying((isPlaying)=>!isPlaying)
        setInfoText(()=> "")

        const randomValue = getRandomValue(0, countries.length)

        setAnswer((prev)=> ({...prev, correctAnswer: countries[randomValue]}))
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            answer: { value: string };
          };
          const playerAnswer = target.answer.value.toLowerCase();

          return playerAnswer === answer.correctAnswer?.capital.toLowerCase() ? handleEndTry(true) : handleEndTry(false)
    }


    const handleEndTry = (wasGoodAnswer: boolean) => {

        if(wasGoodAnswer) {
            setAnswer((prev)=> ({...prev, goodAnswers: prev.goodAnswersCount++}));
            if(answer.goodAnswersCount === 4) return handleEndGame(true)

            handlePlay();
            setInfoText(()=> `Bonne réponse, devinez encore ${5 - answer.goodAnswersCount} capitales pour gagner`)
        } else {
            setAnswer((prev)=> ({...prev, goodAnswers: prev.badAnswersCount++}));
            answer.badAnswersCount === 2 ? handleEndGame(false)  : setInfoText(()=> `Mauvaise réponse, il vous reste encore ${3 - answer.badAnswersCount} essai`)
        }

        formRef.current?.reset()
    }

    const handleEndGame = (hasWin: boolean) => {

        if(hasWin) {
            setInfoText(()=> InfoText.WIN)
        } else {
            setInfoText(()=> InfoText.LOOSE)
        }
        setAnswer(()=> ({...initialAnswer}))
        setIsPlaying((isPlaying)=> !isPlaying)
    }

  return (

    <GameContainer>
            {loading && <div>Loading...</div>}

            {error && error.message}

            {countries.length &&
            <div>
                <button disabled={isPlaying} onClick={handlePlay}>Jouer</button>
            </div>
            }

            {answer.correctAnswer &&
                <GameForm ref={formRef} onSubmit={(e)=>handleSubmit(e)}>
                    <Label>
                        Quelle est la capitale de {answer.correctAnswer.name} :
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