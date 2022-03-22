import { useState, useEffect } from 'react';

const useFetch = () => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/capital");
      const parsedData = await res.json();
      setResponse(parsedData);
      setError(null);
    } catch (err) {
      setError(err as any);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { response, error, loading };
};
export default useFetch;