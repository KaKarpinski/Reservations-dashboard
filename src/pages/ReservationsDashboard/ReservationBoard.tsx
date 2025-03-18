import React, { useMemo } from "react";
import {
  Reservation,
  ReservationStatus,
  reservationStatuses,
} from "../../types/reservation";
import ReservationCard from "../../components/ReservationCard/ReservationCard";
import "./ReservationBoard.css";
import StatusColumn from "../../components/StatusColumn/StatusColumn";
import { statusColors } from "../../utils/statusColors";

interface ReservationBoardProps {
  reservations: Reservation[];
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
}

const ReservationBoard: React.FC<ReservationBoardProps> = ({
  reservations,
  setReservations,
}) => {
  const groupedReservations = useMemo(() => {
    const groups: Record<ReservationStatus, Reservation[]> =
      reservationStatuses.reduce((acc, status) => {
        acc[status] = [];
        return acc;
      }, {} as Record<ReservationStatus, Reservation[]>);

    reservations.forEach((reservation) => {
      groups[reservation.status].push(reservation);
    });

    return groups;
  }, [reservations]);

  return (
    <div className="reservation-board">
      {Object.entries(groupedReservations).map(([status, reservationList]) => (
        <StatusColumn
          status={status as ReservationStatus}
          listLength={reservationList.length}
          key={status}
        >
          {reservationList.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              statusColor={statusColors[reservation.status]}
              setReservations={setReservations}
            />
          ))}
          {reservationList.length === 0 && (
            <div className="empty-status">Brak rezerwacji</div>
          )}
        </StatusColumn>
      ))}
    </div>
  );
};

export default ReservationBoard;
