import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import textFormSchema from "../../FormValidation/TextFormSchema";
import './../Dialogs.css';

type PropsType = {
    sendMessage: ((newMessageText: string) => void)
}

type AddMessageFormInputsType = {
    newText: string
}

const AddMessageForm: FC<PropsType> = ({ sendMessage }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset } = useForm<AddMessageFormInputsType>({
            resolver: yupResolver(textFormSchema)
        });

    const onSubmit: SubmitHandler<AddMessageFormInputsType> = (data) => {
        onSendMessage(data);
        reset();
    }

    const onSendMessage = (data: AddMessageFormInputsType) => {
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