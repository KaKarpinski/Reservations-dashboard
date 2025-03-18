import ReservationBoard from "./ReservationBoard";
import "./ReservationBoard.css";
import useAllReservations from "../../hooks/useAllReservations";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const ReservationBoardWrapper: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservations, loading, setReservations } = useAllReservations();

  useEffect(() => {
    // 'Invalidate' query logic. In real world app this should be handled by React Query / SWR
    if (location.state?.newItem) {
      setReservations((prev) => [...prev, location.state.newItem]);
      navigate("/", { replace: true, state: null });
    }
  }, [location.state, setReservations, navigate]);

  return loading ? (
    <div className="loading">Ładowanie danych rezerwacji...</div>
  ) : (
    // This setReservations could be also passed in Context or added to store like Zustand / Redux to avoid props drilling
    <ReservationBoard
      reservations={reservations}
      setReservations={setReservations}
    />
  );
};

export default ReservationBoardWrapper;
