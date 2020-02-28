import React, { useState, useEffect } from 'react';

function useCustomFetch(url: string) {
  // 1a. Use the data state variable
  const [data, setData] = useState([]);

  // 2a. Use the loading state variable
  const [loading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  async function customFetch(url: string) {
    try {
      const response = await fetch(url);
      const rData = await response.json();
      if (response.status == 200) {
        setData(rData);
      } else {
        throw new Error();
        setError(true);
      }
    } catch(e) {
      setError(true);
    }
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      customFetch(url);
      setLoading(false);
    }, 2000);
  }, []);

  return [data, loading, hasError]

}

export default useCustomFetch;