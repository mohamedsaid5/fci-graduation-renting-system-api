import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ isAuth, route = '/login' }) {

    const redirect = window?.location?.pathname;

    return (
        isAuth ? <Outlet /> : <Navigate to={`${route}?redirect=${redirect}`} />
    )
}
