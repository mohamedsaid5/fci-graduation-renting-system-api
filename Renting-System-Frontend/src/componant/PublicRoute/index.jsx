import { Navigate, Outlet, useSearchParams } from 'react-router-dom';

export default function PublicRoute({ isAuth }) {

    const [searchParams] = useSearchParams();

    return (
        !isAuth ? <Outlet /> : <Navigate to={`${searchParams.get("redirect") || "/"}`} />
    )
}
