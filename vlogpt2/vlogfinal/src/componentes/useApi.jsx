import { useState, useCallback } from "react";

const useApi = (baseUrl) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  const get = useCallback(
    async (endpoint) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          headers: getHeaders(),
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl]
  );

  const post = async (endpoint, payload) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Error al crear");
      setData(result);
      return result;
    } catch (e) {
      setError(e.toString());
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const put = async (endpoint, id, payload) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}${endpoint}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Error al actualizar");
      setData(result);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const del = async (endpoint, id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}${endpoint}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error("Error al eliminar");
      setData(null); 
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    get,
    post,
    put,
    del,
  };
};

export default useApi;
