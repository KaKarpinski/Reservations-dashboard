import { useEffect, useState } from "react";
import { Reservation } from "../types/reservation";
import reservationsData from "./../data/reservations.json";
import { mapResponseObjectToReservation } from "../utils/reservationUtils";

const useAllReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      try {
        const validReservations = reservationsData.reservations.map(
          mapResponseObjectToReservation
        );
        setReservations(validReservations);
      } catch (error) {
        console.error("Błąd podczas przetwarzania danych rezerwacji:", error);
      } finally {
        setLoading(false);
      }
  }, []);
  
  return { reservations, loading, setReservations };
};

export default useAllReservations;