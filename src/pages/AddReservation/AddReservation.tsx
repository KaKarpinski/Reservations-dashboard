import { useFormik } from "formik";
import { Reservation } from "../../types/reservation";
import { useValidationSchema } from "./validationSchema";
import InputField from "../../components/InputField/InputField";
import "./AddReservation.css";
import Button from "../../components/Button/Button";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router";

const isCheckInToday = (checkInDate: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkIn = new Date(checkInDate);
  checkIn.setHours(0, 0, 0, 0);
  return checkIn > today;
};

const AddReservation: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values: Reservation) => {
    const status = isCheckInToday(values.checkInDate) ? "Reserved" : "Due In";
    const dataToPost: Reservation = {
      ...values,
      status,
    };
    // TODO: This should also revalidate getReservations query
    const mutation = await fetch("http://localhost:3000/reservations", {
      method: "POST",
      body: JSON.stringify(dataToPost),
    });
    if (mutation.ok) {
      navigate("/");
    }
  };

  const { values, errors, isValid, ...formik } = useFormik<Reservation>({
    onSubmit: () => {
      handleSubmit(values);
    },
    initialValues: {
      id: "123",
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
      />
      {errors.guestName && <ErrorMessage>{errors.guestName}</ErrorMessage>}
      <InputField
        label="Check in date"
        type="date"
        value={formik.getFieldProps("checkInDate").value || ""}
        name="checkInDate"
        onChange={formik.handleChange}
      />
      {errors.checkInDate && <ErrorMessage>{errors.checkInDate}</ErrorMessage>}
      <InputField
        label="Check out date"
        type="date"
        value={formik.getFieldProps("checkOutDate").value || ""}
        name="checkOutDate"
        onChange={formik.handleChange}
      />
      {errors.checkOutDate && (
        <ErrorMessage>{errors.checkOutDate}</ErrorMessage>
      )}
      <InputField
        label="Room number"
        value={formik.getFieldProps("roomNumber").value || ""}
        name="roomNumber"
        onChange={formik.handleChange}
      />
      {errors.roomNumber && <ErrorMessage>{errors.roomNumber}</ErrorMessage>}
      <InputField
        label="Notes"
        value={formik.getFieldProps("notes").value || ""}
        name="notes"
        onChange={formik.handleChange}
      />
      {errors.notes && <ErrorMessage>{errors.notes}</ErrorMessage>}
      <InputField
        label="Email"
        value={formik.getFieldProps("email").value || ""}
        name="email"
        onChange={formik.handleChange}
      />
      {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      <Button disabled={!isValid} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AddReservation;
