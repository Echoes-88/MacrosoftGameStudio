export const LOADING = 'LOADING';

export const loading = (status: boolean) => ({
  type: LOADING,
  status
});