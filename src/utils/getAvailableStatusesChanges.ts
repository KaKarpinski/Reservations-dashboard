import { DropdownProps } from "../components/Dropdown/Dropdown";
import { Reservation, ReservationStatus } from "../types/reservation";

export const getAvailableStatuses = (status: ReservationStatus): ReservationStatus[] => {
  if (status === 'Reserved') {
    return ['Canceled', 'Due In']
  } else if (status === 'Due In') {
    return ['Canceled', 'No Show', 'In House']
  } else if (status === 'In House') {
    return ['Checked Out']
  } else if (status === 'Canceled') {
    return ['Reserved']
  } else return []
}

// Can't say it is a pure function, but with use of React Query we could handle this invalidation in OnSuccess callback.
const updateStatus = async (
  status: ReservationStatus,
  reservationId: string,
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>
) => {
  await fetch(`http://localhost:3000/reservations/${reservationId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      status
    }),   
  })
  setReservations((prev) =>
    // This still has only O(n) complexity so with 1000 records it won't be a performance issue
    prev.map((res) =>
      res.id === reservationId ? { ...res, status } : res
    )
  );
}

export const getStatusChangeOptions = (
  availableStatuses: ReservationStatus[],
  reservationId: string,
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>
): DropdownProps['options']=> {
  if (availableStatuses.length === 0) return [];
 const statuses = availableStatuses.map(status => ({
    text: `Move to ${status}`,
    action: () => updateStatus(status, reservationId, setReservations)
  }));
  return statuses;
}
