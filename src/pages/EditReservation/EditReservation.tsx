import { useFormik } from "formik";
import { Reservation } from "../../types/reservation";
import { getValidationSchema } from "../../utils/reservationValidationSchema";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import SelectField from "../../components/SelectField/SelectField";
import { getAvailableStatuses } from "../../utils/getAvailableStatusesChanges";
import { useNavigate } from "react-router";
import { LocationState } from "../../types/navigation";

interface EditReservationProps {
  reservation: Reservation;
}

const EditReservation: React.FC<EditReservationProps> = ({ reservation }) => {
  const navigate = useNavigate();
  const handleSubmit = async (values: Reservation) => {
    const response = await fetch(
      `http://localhost:3000/reservations/${reservation.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(values),
      }
    );

    const updatedItem = await response.json();

    const locationState: LocationState = {
      updatedItem,
    };
    // 'Invalidate' query logic. This should be handled by React Query / SWR
    if (response.ok) {
      navigate("/", { state: locationState });
    }
  };

  const { values, errors, isValid, ...formik } = useFormik<Reservation>({
    onSubmit: () => {
      handleSubmit(values);
    },
    initialValues: reservation,
    validateOnChange: true,
    validationSchema: getValidationSchema(),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <InputField
        label="Guest name"
        value={formik.getFieldProps("guestName").value || ""}
        name="guestName"
        onChange={formik.handleChange}
        errorMessage={errors.guestName}
      />
      <InputField
        label="Check in date"
        type="date"
        value={formik.getFieldProps("checkInDate").value || ""}
        name="checkInDate"
        onChange={formik.handleChange}
        errorMessage={errors.checkInDate}
      />
      <InputField
        label="Check out date"
        type="date"
        value={formik.getFieldProps("checkOutDate").value || ""}
        name="checkOutDate"
        onChange={formik.handleChange}
        errorMessage={errors.checkOutDate}
      />
      <InputField
        label="Room number"
        value={formik.getFieldProps("roomNumber").value || ""}
        name="roomNumber"
        onChange={formik.handleChange}
        errorMessage={errors.roomNumber}
      />
      <InputField
        label="Notes"
        value={formik.getFieldProps("notes").value || ""}
        name="notes"
        onChange={formik.handleChange}
        errorMessage={errors.notes}
      />
      <InputField
        label="Email"
        value={formik.getFieldProps("email").value || ""}
        name="email"
        onChange={formik.handleChange}
        errorMessage={errors.email}
      />
      <SelectField
        label="Status"
        value={formik.getFieldProps("status").value || ""}
        name="status"
        onChange={formik.handleChange}
        errorMessage={errors.email}
        options={getAvailableStatuses(reservation.status)}
      />
      <Button disabled={!isValid} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default EditReservation;
