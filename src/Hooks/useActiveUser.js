import { useEffect, useState } from "react"
import { BackendApi } from "../Componets/Shared/Api/BackendApi";

const useActiveUser = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`${BackendApi}/auth/loginUser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setUser(data))
    }, [user])

    return [user]
}

export default useActiveUser;