import * as Yup from "yup";

const textFormSchema = Yup.object().shape({
    newText: Yup.string()
        //минимальная длина - 2 символа
        .min(1, "Must be longer than 1 character")
        //максимальная длина - 20 символов
        .max(400, "Too long message")
        .required("Required"),
});
export default textFormSchema;