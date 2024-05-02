import { useState, useEffect } from 'react';
import axiosInstance from '../config/AxiosConfig';

function PokeFetch(endpoint: string) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(endpoint);
                setData(response.data.results);
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

export default PokeFetch;
