import { useLocation } from "react-router";
import EditReservation from "./EditReservation"
import useGetReservation from "../../hooks/useGetReservation";

const EditReservationWrapper = () => {
  const { pathname } = useLocation();
  const [, , reservationId] = pathname.split("/");
  const { reservation, loading } = useGetReservation(reservationId);

  if (loading || !reservation) {
    return <p>Please wait...</p>;
  }
  
  return (
    <EditReservation reservation={reservation}/>
  )
}

export default EditReservationWrapper;