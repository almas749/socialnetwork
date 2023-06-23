import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import loginFormSchema from "../FormValidation/LoginFormSchema";
import { login } from "../../redux/reducers/authReducer";
import { getIsAuth } from "../../redux/selectors/authSelectors";
import './Login.css';

const Login = ({ login, isAuth }) => {

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isValid }
    } = useForm({
        resolver: yupResolver(loginFormSchema),
        mode: "onBlur"
    });

    const onSubmit = ({ email, password, rememberMe }) => {
        login(email, password, rememberMe, setError);
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
                    required: true,
                    pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'Pleace enter the valid email'
                    }
                })}
                onFocus={() => clearErrors(["email", "server"])}
            />
            <span className="error-message">{errors.email?.message}</span>
            <input
                type="password"
                placeholder="Password"
                {...register("password", {})}
                onFocus={() => clearErrors(["password", "server"])}
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
            <span className="error-message">{errors.server?.message}</span>
            <input type="submit" disabled={!isValid} />
        </form>
    );
};

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state)
});

export default connect(mapStateToProps, { login })(Login);