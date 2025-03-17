import React from "react";
import { Reservation } from "../../types/reservation";
import { formatDate } from "../../utils/dateFormatters";
import "./ReservationCard.css";
import Dropdown from "../Dropdown/Dropdown";
import { Link } from "react-router";

interface ReservationCardProps {
  reservation: Reservation;
  statusColor: string;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  statusColor,
}) => {
  const isEditingEnabled =
    reservation.status === "Reserved" || reservation.status === "Due In";

  const handleRemove = async () => {
    // TODO: This should also revalidate getReservations query
    await fetch(`http://localhost:3000/reservations/${reservation.id}`, {
      method: "DELETE",
    });
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
              ...(isEditingEnabled ? [<Link to="edit">Edit</Link>] : []),
              <button onClick={handleRemove} className="unstyled-button">
                Delete
              </button>,
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
