import { useState, useEffect } from "react";
import axios from "axios";
// import { RAPID_API_KEY } from "@env";

// const RapidAPIKey = RAPID_API_KEY;

function useFetch(endpoint, query) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: { ...query },
        headers: {
            "X-RapidAPI-Key": "df2455708bmsheaa2c8675399141p164655jsn89c1c8a6fba0",
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
    };

    const fetchData = async () => {
        setIsLoading(true);

        // try {
        //     const response = await axios(options);

        //     console.log(response);

        //     setData(response.data.data);
        //     setIsLoading(false);
        // } catch (error) {
        //     setError(error);
        //     console.log(error);
        // } finally {
        //     setIsLoading(false);
        // }

        await axios(options)
            .then((response) => {
                setData(response.data.data);
                setIsLoading(false);

                console.log("RESPONSE", response);
            })
            .catch((error) => {
                setError(error);
                console.log("ERROR", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return { data, isLoading, error, refetch };
}

export default useFetch;
