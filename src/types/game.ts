export type ApiCall = {
    url: string,
    options?: any
  }

  export type FetchResponse = {
      response: {
          error: boolean,
          msg: string,
          data: any
      },
      error: any,
      loading: boolean
  }

  export type Country = {
    name: string,
    capital: string,
    iso2: string,
  }
  
  export type Answer = {
    correctAnswer: Country | undefined,
    flag?: string,
    badAnswersCount: number,
    goodAnswersCount: number,
  }

  export enum InfoText {
    WIN = 'Gagné !',
    LOOSE = 'Perdu'
}