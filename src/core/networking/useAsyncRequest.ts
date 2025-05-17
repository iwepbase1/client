/* eslint-disable */
import { useState } from "react";

interface ErrorResponse {
  message: string;
}

interface ResponseCallback<T> {
  (response: T): void;
}

const useAsyncRequest = <T>(asyncFunction: (payload: any) => Promise<T>) => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const execute = async (payload: any, callback?: ResponseCallback<T>) => {
    setLoading(true);
    setError(null);
    try {
      const data = await asyncFunction(payload);
      setResponse(data);
      if (callback) {
        callback(data);
      }
    } catch (err: any) {
      setError(err);
      setResponse(err.response);
      if (callback) {
        callback(err.response);
      }
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, execute };
};

export default useAsyncRequest;
