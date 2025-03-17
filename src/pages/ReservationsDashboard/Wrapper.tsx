import { useEffect, useState } from "react";
import { Reservation } from "../../types/reservation";
import reservationsData from "./../../data/reservations.json";
import { mapResponseObjectToReservation } from "../../utils/reservationUtils";
import ReservationBoard from "./ReservationBoard";
import "./ReservationBoard.css";

const ReservationBoardWrapper: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
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
    }, 800);
  }, []);
  
  return (
    loading ? (
      <div className="loading">Ładowanie danych rezerwacji...</div>
    ) : (
      <ReservationBoard reservations={reservations} />
    )
  )
} 

export default ReservationBoardWrapper;