import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ERRORSCREEN } from "../../../router/config";
import { setHandleServerError } from "../../functions";

interface ErrorContextType {
  handleServerError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const handleServerError = () => {
    navigate(ERRORSCREEN); // Navigate to error screen
  };

  useEffect(() => {
    setHandleServerError(handleServerError);
  }, []);

  return (
    <ErrorContext.Provider value={{ handleServerError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};
