import React from "react";
import { Reservation } from "../../types/reservation";
import { formatDate } from "../../utils/dateFormatters";
import "./ReservationCard.css";
import Dropdown from "../Dropdown/Dropdown";
import { useNavigate } from "react-router";
import {
  getAvailableStatuses,
  getStatusChangeOptions,
} from "../../utils/getAvailableStatusesChanges";

interface ReservationCardProps {
  reservation: Reservation;
  statusColor: string;
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  statusColor,
  setReservations,
}) => {
  const isEditingEnabled =
    reservation.status === "Reserved" || reservation.status === "Due In";
  const navigate = useNavigate();
  const availableStatuses = getAvailableStatuses(reservation.status);
  const statusChangeOptions = getStatusChangeOptions(
    availableStatuses,
    reservation.id,
    setReservations
  );

  const handleRemove = async () => {
    await fetch(`http://localhost:3000/reservations/${reservation.id}`, {
      method: "DELETE",
    });
    // 'Invalidate' query logic. In real world app this should be handled by React Query / SWR
    setReservations((prev) => prev.filter((res) => res.id !== reservation.id));
  };

  return (
    <div className="reservation-card">
      <div
        className="card-status-indicator"
        style={{ backgroundColor: statusColor }}
      ></div>
      <div className="card-content">
        <div className="card-header">
          <h3 className="guest-name">{reservation.guestName}</h3>
          <Dropdown
            icon={
              <div className="action-button">
                <button className="btn-action">⋮</button>
              </div>
            }
            options={[
              ...(isEditingEnabled
                ? [
                    {
                      text: "Edit",
                      action: () => navigate("/edit"),
                    },
                  ]
                : []),
              {
                text: "Delete",
                action: handleRemove,
              },
              ...statusChangeOptions,
            ]}
          />
        </div>

        <div className="stay-dates">
          <div className="date-range">
            <span className="date-label">Przyjazd:</span>
            <span className="date-value">
              {formatDate(reservation.checkInDate)}
            </span>
          </div>
          <div className="date-range">
            <span className="date-label">Wyjazd:</span>
            <span className="date-value">
              {formatDate(reservation.checkOutDate)}
            </span>
          </div>
        </div>

        {reservation.roomNumber && (
          <div className="room-number">
            <span className="room-label">Pokój:</span>
            <span className="room-value">{reservation.roomNumber}</span>
          </div>
        )}

        {reservation.notes && (
          <div className="notes">
            <p>{reservation.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
