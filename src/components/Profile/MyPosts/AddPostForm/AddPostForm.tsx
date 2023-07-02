import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import textFormSchema from "../../../FormValidation/TextFormSchema"
import './../MyPosts.css'

type InputsType = {
    newText: string
}

type PropsType = {
    addPost: ((newPostText: string) => void)
}

const AddPostForm: FC<PropsType> = ({ addPost }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset } = useForm<InputsType>({
            resolver: yupResolver(textFormSchema)
        })

    const onSubmit: SubmitHandler<InputsType> = (data) => {
        onAddPost(data)
        reset()
    }

    const onAddPost = (data: InputsType) => {
        addPost(data.newText)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="posts-form">
            <textarea
                className="post-text"
                placeholder="Write something"
                {...register("newText", { required: true })} />
            <span className="error-message">{errors.newText?.message}</span>
            <input
                type="submit"
                className="post-btn" />
        </form>
    )
}

export default AddPostForm