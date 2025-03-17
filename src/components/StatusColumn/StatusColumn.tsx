import { ReservationStatus } from "../../types/reservation";
import { statusColors } from "../../utils/statusColors";
import "./StatusColumn.css";

interface StatusColumnProps {
  status: ReservationStatus;
  listLength: number;
  children: React.ReactNode;
}

const StatusColumn: React.FC<StatusColumnProps> = ({
  status,
  listLength,
  children,
}) => {
  return (
    <div key={status} className="status-column">
      <div
        className="status-header"
        style={{
          backgroundColor: statusColors[status as ReservationStatus],
        }}
      >
        <h2>{status}</h2>
        <span className="reservation-count">{listLength}</span>
      </div>
      <div className="reservation-list">{children}</div>
    </div>
  );
};

export default StatusColumn;
