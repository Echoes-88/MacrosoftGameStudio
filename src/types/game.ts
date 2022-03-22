
  export type Country = {
    name: string,
    capital: string,
  }
  
  export type Answer = {
    correctAnswer: Country | undefined,
    badAnswersCount: number,
    goodAnswersCount: number,
  }

  export enum InfoText {
    WIN = 'Gagné !',
    LOOSE = 'Perdu'
}