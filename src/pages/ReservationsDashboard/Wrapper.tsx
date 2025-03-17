import ReservationBoard from "./ReservationBoard";
import "./ReservationBoard.css";
import useAllReservations from "../../hooks/useAllReservations";

const ReservationBoardWrapper: React.FC = () => {
  const { reservations, loading } = useAllReservations();

  return loading ? (
    <div className="loading">Ładowanie danych rezerwacji...</div>
  ) : (
    <ReservationBoard reservations={reservations} />
  );
};

export default ReservationBoardWrapper;
