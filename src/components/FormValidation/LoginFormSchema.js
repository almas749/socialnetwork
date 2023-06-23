import * as Yup from "yup";

const loginFormSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email address must be a valid address")
        //минимальная длина - 2 символа
        .min(2, "Must be longer than 2 characters")
        //максимальная длина - 20 символов
        .max(30, "The email should have at most 30 characters")
        .required("Required"),
    password: Yup.string()
        .min(6, "Must be longer than 6 characters")
        .required("Required")
});
export default loginFormSchema;