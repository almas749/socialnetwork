import * as Yup from "yup"
import { ContactsType } from "../../types/Types"

const profileDataFormSchema = Yup.object().shape({
    fullName: Yup.string()
        .max(35, "Too long name")
        .required("Required"),
    aboutMe: Yup.string()
        .max(60, "Too long"),
    lookingForAJob: Yup.boolean(),
    lookingForAJobDescription: Yup.string()
        .max(200, "Too long"),
    contacts: Yup.object<ContactsType>()
})
export default profileDataFormSchema