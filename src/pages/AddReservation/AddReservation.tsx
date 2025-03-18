import { useFormik } from "formik";
import { Reservation } from "../../types/reservation";
import { useValidationSchema } from "./validationSchema";
import InputField from "../../components/InputField/InputField";
import "./AddReservation.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";
import useAllReservations from "../../hooks/useAllReservations";
import { getNewId } from "../../utils/getNewId";

const isCheckInToday = (checkInDate: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkIn = new Date(checkInDate);
  checkIn.setHours(0, 0, 0, 0);
  return checkIn > today;
};

const AddReservation: React.FC = () => {
  const navigate = useNavigate();
  const { reservations, loading } = useAllReservations();
  const lastId = reservations?.[reservations.length - 1]?.id ?? "";
  const newId = lastId && !loading ? getNewId(lastId) : "";

  const handleSubmit = async (values: Reservation) => {
    const status = isCheckInToday(values.checkInDate) ? "Reserved" : "Due In";
    const newItem: Reservation = {
      ...values,
      id: newId,
      status,
    };

    const response = await fetch("http://localhost:3000/reservations", {
      method: "POST",
      body: JSON.stringify(newItem),
    });

    const createdItem = await response.json();

    // 'Invalidate' query logic. This should be handled by React Query / SWR
    if (response.ok) {
      navigate("/", { state: { newItem: createdItem } });
    }
  };

  const { values, errors, isValid, ...formik } = useFormik<Reservation>({
    onSubmit: () => {
      handleSubmit(values);
    },
    initialValues: {
      id: "",
      guestName: "",
      checkInDate: "",
      checkOutDate: "",
      status: "Reserved",
      roomNumber: "",
      notes: "",
      email: "",
    },
    validateOnChange: true,
    validationSchema: useValidationSchema(),
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
      <Button disabled={!isValid} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AddReservation;
