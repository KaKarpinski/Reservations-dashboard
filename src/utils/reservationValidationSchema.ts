import * as Yup from 'yup';
import {
  fieldRequired,
  isCheckoutAfter,
  maxLength,
  minLength,
  validDate,
  validEmail,
} from "./validationWarnings";

declare module "yup" {
  interface DateSchema<
    TType extends Yup.Maybe<Date> | undefined,
    TContext extends Yup.AnyObject,
    TDefault extends Date | undefined,
    TFlags extends Yup.Flags
  > {
    notInThePast(
      message: string
    ): Yup.DateSchema<TType, TContext, TDefault, TFlags>;
    isAfter(
      message: string,
      field: string
    ): Yup.DateSchema<TType, TContext, TDefault, TFlags>;
  }
}

Yup.addMethod(Yup.date, "notInThePast", function (message) {
  return this.test("not-in-the-past", message, function (value) {
    if (!value) {
      return true;
    }
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const date = new Date(value);
    date.setHours(0, 0, 0, 0);
    return date >= now;
  });
});

Yup.addMethod(Yup.date, "isAfter", function (message, otherDateField) {
  return this.test("is-after", message, function (value) {
    const { path, createError, parent } = this;

    if (!value || !parent[otherDateField]) {
      return true;
    }

    if (value <= parent[otherDateField]) {
      return createError({ path, message });
    }

    return true;
  });
});

export const getValidationSchema = () => {
  return Yup.object({
    guestName: Yup.string()
      .trim()
      .required(fieldRequired)
      .min(5, minLength)
      .max(100, maxLength),
    checkInDate: Yup.date().notInThePast(validDate).required(fieldRequired),
    checkOutDate: Yup.date()
      .required(fieldRequired)
      .isAfter(isCheckoutAfter, "checkInDate")
      .notInThePast(validDate),
    status: Yup.string().trim().required(fieldRequired),
    roomNumber: Yup.number(),
    notes: Yup.string().min(5, minLength).max(50, maxLength),
    email: Yup.string().trim().email(validEmail),
  });
};
