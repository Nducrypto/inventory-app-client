import axios from "axios";
import { useEffect, useState } from "react";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// const API = axios.create({ baseURL: "http://localhost:5000/api" });

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(url);
        setData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(url);
      setData(data);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  };
  return { data, loading, error, reFetch, setData, API };
};

export default useFetch;
