import { useEffect, useState } from "react";
import API from "./API";

const useLoad = (endpoint) => {
  const [records, setRecords] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState("Loading records...");
  const [isLoading, setIsLoading] = useState(true);

  const loadRecords = async () => {
    setIsLoading(true);
    const response = await API.get(endpoint);
    setIsLoading(false);

    if (response.isSuccess) {
      setRecords(response.result || []);
    } else {
      setRecords([]);
      setLoadingMessage(response.message || "Failed to load records.");
    }
  };

  useEffect(() => {
    loadRecords();
  }, [endpoint]);

  return [records, isLoading, loadingMessage, loadRecords];
};

export default useLoad;
