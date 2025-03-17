import React, { useMemo } from "react";
import { Reservation, ReservationStatus } from "../../types/reservation";
import ReservationCard from "../../components/ReservationCard/ReservationCard";
import "./ReservationBoard.css";
import StatusColumn from "../../components/StatusColumn/StatusColumn";
import { statusColors } from "../../utils/statusColors";

interface ReservationBoardProps {
  reservations: Reservation[];
}

const ReservationBoard: React.FC<ReservationBoardProps> = ({
  reservations,
}) => {
  const groupedReservations = useMemo(() => {
    const groups: Record<ReservationStatus, Reservation[]> = {
      Reserved: [],
      "Due In": [],
      "In House": [],
      "Due Out": [],
      "Checked Out": [],
      Canceled: [],
      "No Show": [],
    };

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
        >
          {reservationList.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              statusColor={statusColors[reservation.status]}
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
