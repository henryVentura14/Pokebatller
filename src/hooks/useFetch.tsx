import { useState, useEffect } from 'react';
import axios from '../config/AxiosConfig';

function useFetch(endpoint: string) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(endpoint);
                setData(response.data);
                setError(null);
            } catch (error) {
                setError('Error fetching data from PokeAPI');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [endpoint]);

    return { data, loading, error };
}

export default useFetch;
