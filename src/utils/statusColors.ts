import { ReservationStatus } from "../types/reservation";

export const statusColors: Record<ReservationStatus, string> = {
  Reserved: "#3498db",
  "Due In": "#2ecc71",
  "In House": "#9b59b6",
  "Due Out": "#f39c12",
  "Checked Out": "#7f8c8d",
  Canceled: "#e74c3c",
  "No Show": "#c0392b",
};
