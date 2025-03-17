import * as Yup from 'yup';
import { fieldRequired, maxLength, minLength, validEmail } from '../../utils/validationWarnings';

export const useValidationSchema = () => {
  return Yup.object({
    guestName: Yup.string().trim().required(fieldRequired).min(5, minLength).max(100, maxLength),
    checkInDate: Yup.string().trim().required(fieldRequired).max(100, maxLength),
    checkOutDate: Yup.string().trim().required(fieldRequired).max(100, maxLength),
    status: Yup.string().trim().required(fieldRequired),
    roomNumber: Yup.number(),
    notes: Yup.string().min(5, minLength).max(50, maxLength),
    email: Yup.string().trim().email(validEmail),
  });
};
