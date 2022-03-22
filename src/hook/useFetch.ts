import { useState, useEffect, useCallback } from 'react';

const useFetch = (url: string, options?: any) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(url, options);
      console.log(res)
      const parsedData = await res.json();
      setResponse(parsedData);
      setError(null);
    } catch (err) {
      setError(err as any);
    } finally {
      setLoading(false);
    }
  }, [url, options]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { response, error, loading };
};
export default useFetch;