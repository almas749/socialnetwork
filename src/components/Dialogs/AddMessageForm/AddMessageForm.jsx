import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import textFormSchema from "../../FormValidation/TextFormSchema";
import './../Dialogs.css';

const AddMessageForm = ({ sendMessage }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset } = useForm({
            resolver: yupResolver(textFormSchema)
        });

    const onSubmit = (data) => {
        onSendMessage(data);
        reset();
    }

    const onSendMessage = (data) => {
        sendMessage(data.newText);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="dialogs-send-area">
            <textarea
                className="dialogs-send-text"
                placeholder="Write something"
                {...register("newText", { required: true })} />
            <span className="error-message">{errors.newText?.message}</span>
            <input
                type="submit"
                className="btn dialogs-send-btn" />
        </form>
    );
}

export default AddMessageForm;