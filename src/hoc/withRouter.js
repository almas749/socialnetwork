import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const withRouter = (Component) => (props) => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Component
            {...props}
            router={{ location, navigate, params }}
        />
    );
}