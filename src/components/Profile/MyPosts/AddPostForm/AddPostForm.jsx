import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import './../MyPosts.css';
import textFormSchema from "../../../FormValidation/TextFormSchema";

const AddPostForm = ({ addPost }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset } = useForm({
            resolver: yupResolver(textFormSchema)
        });

    const onSubmit = (data) => {
        onAddPost(data);
        reset();
    }

    const onAddPost = (data) => {
        addPost(data.newText);
    };

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
    );
}

export default AddPostForm;