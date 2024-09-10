// src/ReservationContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const ReservationContext = createContext();

// Create a provider component
export const ReservationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [reservationData, setReservationData] = useState(null);

  return (
    <ReservationContext.Provider value={{ user, setUser, reservationData, setReservationData }}>
      {children}
    </ReservationContext.Provider>
  );
};

// Create a custom hook to use the context
export const useReservation = () => useContext(ReservationContext);
