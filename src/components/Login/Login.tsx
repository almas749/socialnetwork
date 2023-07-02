import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import loginFormSchema from "../FormValidation/LoginFormSchema";
import { login } from "../../redux/reducers/authReducer";
import { getCaptchaUrl, getIsAuth } from "../../redux/selectors/authSelectors";
import './Login.css';
import { RootState } from "../../redux/reduxStore";

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | undefined) => Promise<void>
}

type LoginInputsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | undefined
}

const Login: FC<MapStatePropsType & MapDispatchPropsType> = ({ login, isAuth, captchaUrl }) => {

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isValid }
    } = useForm<LoginInputsType>({
        resolver: yupResolver(loginFormSchema),
        mode: "onBlur"
    });

    const onSubmit: SubmitHandler<LoginInputsType> = ({ email, password, rememberMe, captcha }) => {
        login(email, password, rememberMe, captcha)
            .catch(
                (errorMessage) => {
                    setError('root.serverError', {
                        type: "server",
                        message: errorMessage,
                    });
                }
            )
    }

    if (isAuth) {
        return <Navigate to={"/profile"} />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="login">
            <input
                type="text"
                placeholder="Email"
                {...register("email", {
                    pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'Pleace enter the valid email'
                    }
                })}
                onFocus={() => clearErrors(["email"])}
            />
            <span className="error-message">{errors.email?.message}</span>
            <input
                type="password"
                placeholder="Password"
                {...register("password", {})}
                onFocus={() => clearErrors(["password"])}
            />
            <span className="error-message">{errors.password?.message}</span>
            <div>
                <input
                    style={{ 'marginRight': '5px' }}
                    type="checkbox"
                    id="remember_id"
                    {...register("rememberMe", {})} />
                <label htmlFor="remember_id">Remember me</label>
            </div>
            <span className="error-message">{errors.root?.serverError?.message}</span>
            {captchaUrl ? <img src={captchaUrl} alt="captcha" /> : null}
            {captchaUrl ? <input
                placeholder="Captcha"
                type="text"
                {...register("captcha", {})} /> : null}
            <input type="submit" disabled={!isValid} />
        </form>
    );
};

const mapStateToProps = (state: RootState) => ({
    isAuth: getIsAuth(state),
    captchaUrl: getCaptchaUrl(state)
});

export default connect(mapStateToProps, { login })(Login);