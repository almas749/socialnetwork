import { useForm, SubmitHandler, UseFormSetError } from "react-hook-form"
import { FC } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { ProfileType } from "../../../types/Types"
import profileDataFormSchema from "../../FormValidation/ProfileDataFormSchema"

import './ProfileInfo.css'

type PropsType = {
    onSubmit: (data: ProfileType, setError: UseFormSetError<ProfileType>) => void
    initialValues: ProfileType
}

const ProfileDataForm: FC<PropsType> = ({ onSubmit, initialValues }) => {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid }
    } = useForm<ProfileType>({
        defaultValues: initialValues,
        resolver: yupResolver(profileDataFormSchema),
        mode: "onBlur"
    })

    const onHandleSubmit: SubmitHandler<ProfileType> = (data) => {
        onSubmit(data, setError)
    }

    return (
        <form className="profile-edit-form" onSubmit={handleSubmit(onHandleSubmit)}>
            <label
                htmlFor="fullName">Full Name: </label>
            <input
                type="text"
                id="fullName"
                placeholder="Full name" {...register("fullName", {})} />
            <span className="error-message">{errors.fullName?.message}</span>
            <label htmlFor="aboutMe">About Me: </label>
            <textarea
                id="aboutMe"
                placeholder="About me" {...register("aboutMe")} />
            <span className="error-message">{errors.aboutMe?.message}</span>
            <label htmlFor="lookingForAJob">Looking for a job: </label>
            <input
                style={{ 'marginRight': '5px' }}
                type="checkbox"
                id="lookingForAJob"
                {...register("lookingForAJob")} />
            <span className="error-message">{errors.lookingForAJob?.message}</span>
            <label
                htmlFor="lookingForAJobDescription">Professional skills: </label>
            <textarea
                id="lookingForAJobDescription"
                placeholder="Professional skills" {...register("lookingForAJobDescription")} />
            <span className="error-message">{errors.lookingForAJobDescription?.message}</span>
            {Object.entries(initialValues.contacts).map(([key, value]) => {
                return (
                    <div key={key}>
                        <label htmlFor={'contacts.' + key}>{key}: </label>
                        <input
                            id={'contacts.' + key}
                            type="text"
                            placeholder={key}
                            {...register(`contacts.${key}` as 'contacts', {})} />
                    </div>
                )
            })}
            <span className="error-message">{errors.root?.serverError?.message}</span>
            <input type="submit" disabled={!isValid} />
        </form>
    )
}

export default ProfileDataForm