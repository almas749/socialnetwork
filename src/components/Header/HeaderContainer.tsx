import { FC } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../redux/reduxStore'
import { logout } from '../../redux/reducers/authReducer'
import { getAuthLogin, getIsAuth } from '../../redux/selectors/authSelectors'
import Header from './Header'

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchPropsType = {
    logout: () => void
}

const HeaderContainer: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    return (
        <Header {...props} />
    )

}

const mapStateToProps = (state: RootState) => ({
    isAuth: getIsAuth(state),
    login: getAuthLogin(state)
})

export default connect(mapStateToProps, { logout })(HeaderContainer)