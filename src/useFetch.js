import {useState, useEffect } from 'react';

let baseUrl = "http://localhost:8000";
if (process.env.NODE_ENV === 'production') {
    baseUrl = "https://violet-amaze-reboot.herokuapp.com";
}

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(`${baseUrl}${url}`, { signal: abortCont.signal })
            .then( res => {
                if(!res.ok) {
                    throw Error('could not fetch data for that resource');
                }
                return res.json();
            })
            .then((data) => { 
                setData(data);
                setIsLoading(false);
                setError(null);
            })
            .catch(error => {
                if(error.name === 'Abort Error') {
                    console.log('fetch aborted');
                } else {
                    setIsLoading(false);
                    console.log(error.message);
                }
            })

            return () => abortCont.abort();

    }, [url])

    return { data, isLoading, error}
}

export default useFetch;