
import { useState, createContext, useMemo, useEffect, useCallback } from "react";
import fetchData from "../func/fetch";
import { deleteStorageItem, getStorageItem, setStorageItem } from "../func/localstorage";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [authUser, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    const user = useMemo(() => authUser, [authUser]);
    const [favIds, setFavIds] = useState([]);

    const handleUser = async () => {
        const { data, error_status } = await fetchData('profile/', null, null, 'GET');

        console.log(data, error_status);

        if (error_status) {
            setIsAuth(false);
            return deleteStorageItem('auth_t');
        }
        console.log(data, error_status);
        setUser(data);

        if (!data?.['saved_apartments']) return;

        data['saved_apartments']?.map(({ id }) => setFavIds(ids => [...ids, id]));
    }

    useEffect(() => {

        const checkAuth = async () => {
            const auth = getStorageItem('auth_t');

            if (!auth) return;

            setIsAuth(true);
            handleUser();

        }

        checkAuth();
    }, []);

    const updateAuth = useCallback((status, token) => {

        status ?
            setStorageItem('auth_t', token)
            :
            deleteStorageItem('auth_t');

        setIsAuth(() => status);
        status && handleUser();

    }, []);

    const addFav = useCallback((apartment) => {

        setUser(user => {
            let saved_apartments = user['saved_apartments'] ?? [];
            return { user, saved_apartments: [...saved_apartments, apartment] };
        });

        setFavIds(ids => [...ids, apartment.id])

    }, []);

    const removeFav = useCallback((id) => {

        setUser(user => {
            let saved_apartments = user['saved_apartments'] ?? [];
            return { user, saved_apartments: saved_apartments.filter(({ id: iId }) => iId != id) };
        });

        setFavIds(ids => ids.filter((iId) => iId != id));

    }, []);

    const authValues = {
        user,
        setUser,
        isAuth,
        setIsAuth,
        updateAuth,
        addFav,
        removeFav,
        favIds,
    }

    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    )
}