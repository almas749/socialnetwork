import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = ({ isAuth, login, logout }) => {
    return (
        <header className='app-header'>
            <img src="https://static.vecteezy.com/system/resources/previews/001/192/065/original/circle-logo-turbine-png.png" alt="logo" />

            <div className='login-block'>
                {isAuth ?
                    <div>
                        {login} <button onClick={logout}>Log out</button>
                    </div> :
                    <NavLink to='/login'>Login</NavLink>
                }
            </div>

        </header>
    );
}

export default Header;