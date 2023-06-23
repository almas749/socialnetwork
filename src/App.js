import { Routes, Route } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { initApp } from './redux/reducers/appReducer';
import { withRouter } from './hoc/withRouter';
import Preloader from './components/common/Preloader/Preloader';
import Navbar from './components/Navbar/Navbar';
import HeaderContainer from './components/Header/HeaderContainer';
import './App.css';

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));
const Login = lazy(() => import('./components/Login/Login'));

const App = ({ initialized, initApp }) => {

    useEffect(() => {
        initApp();
    }, []);

    if (!initialized) {
        return <Preloader />
    }

    return (
        <div className="container">
            <div className="app-wrapper">
                <HeaderContainer />
                <Navbar />
                <div className="app-content">
                    <Suspense fallback={<Preloader />}>
                        <Routes>
                            <Route
                                path="/dialogs"
                                element={<DialogsContainer />} />
                            <Route
                                path="/profile"
                                element={<ProfileContainer />} >
                                <Route
                                    path=":userId"
                                    element={<ProfileContainer />} />
                            </Route>
                            <Route
                                path="/users"
                                element={<UsersContainer />} />
                            <Route
                                path="/login"
                                element={<Login />} />
                            {/* <Route path="/news" element={<News />} />
                            <Route path="/music" element={<Music />} />
                            <Route path="/settings" element={<Settings />} /> */}
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    connect(mapStateToProps, { initApp }),
    withRouter
)(App);
