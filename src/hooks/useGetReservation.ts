import { useEffect, useState } from "react";
import { Reservation } from "../types/reservation";

const useGetReservation = (reservationId: string) => {
  const [reservation, setReservation] = useState<Reservation>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/reservations/${reservationId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Reservation = await response.json();
        setReservation(data);
      } catch (error) {
        console.error("Błąd podczas przetwarzania danych rezerwacji:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reservationId]);
  
  return { reservation, loading, setReservation };
};

export default useGetReservation;