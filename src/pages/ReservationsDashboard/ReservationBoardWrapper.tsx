import ReservationBoard from "./ReservationBoard";
import "./ReservationBoard.css";
import useAllReservations from "../../hooks/useAllReservations";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { LocationState } from "../../types/navigation";

const ReservationBoardWrapper: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservations, loading, setReservations } = useAllReservations();

  useEffect(() => {
    // 'Invalidate' query logic. In real world app this should be handled by React Query / SWR
    const locationState: LocationState = location.state;
    if (locationState?.newItem || locationState?.updatedItem) {
      if (locationState?.newItem)
        setReservations((prev) => [...prev, locationState.newItem!]);
      if (locationState?.updatedItem)
        setReservations((prev) =>
          prev.map((res) =>
            res.id === locationState.updatedItem!.id
              ? locationState.updatedItem!
              : res
          )
        );
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
