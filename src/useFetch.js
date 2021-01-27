import { useState, useEffect } from 'react';


const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect( () => {
    const abortCont = new AbortController();


    setTimeout( () => {   // Used only for this project to mimic the time load in the real world
      fetch(url, { signal: abortCont.signal })
      .then(res => {
        if (!res.ok) {
          throw Error('Could not fetch the data from server');
        }
        return res.json();
      })
      .then( (data) => {  // If error happened but later we could fetch data again, set Error back to 'null'
        setData(data);
        setIsLoading(false);
        setError(null);
      })
      .catch(err => {     // If the error happened, we don't want to show the word "Loading..."
        if (err.name === 'AbortError') {
          console.log('Fetch aborted;')
        } else {
          setIsLoading(false);
          setError(err.message);
        }
      });
    }, 1000);   // Wait for an additional of 1 second

    return () => abortCont.abort();

  }, [url]);

  return { data, isLoading, error }
}


export default useFetch;