import { ComponentType } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export function withRouter<WCP>(Component: ComponentType<WCP>){
    return (props: WCP) => {
        const params = useParams();
        const location = useLocation();
        const navigate = useNavigate();

        return (
            <Component
                {...props as WCP}
                router={{ location, navigate, params }}
            />
        );
    }
}