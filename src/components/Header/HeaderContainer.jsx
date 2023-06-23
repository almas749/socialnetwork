import { connect } from 'react-redux';
import { logout } from '../../redux/reducers/authReducer';
import { getAuthLogin, getIsAuth } from '../../redux/selectors/authSelectors';
import Header from './Header';

const HeaderContainer = (props) => {

    return (
        <Header {...props} />
    );

}

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state),
    login: getAuthLogin(state)
});

export default connect(mapStateToProps, { logout })(HeaderContainer);