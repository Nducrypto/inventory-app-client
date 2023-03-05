import axios from "axios";
import { useEffect, useState } from "react";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// const API = axios.create({ baseURL: "http://localhost:5000/api" });

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await API.get(url);
        setData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error, setData, API };
};

export default useFetch;
