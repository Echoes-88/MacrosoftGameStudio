export enum ApiCall {
  LOADING = 'LOADING'
}

export interface loading {
  type: ApiCall.LOADING,
  status: boolean
}