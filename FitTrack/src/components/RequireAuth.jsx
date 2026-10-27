import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { API_URL } from '../config/api'

function RequireAuth() {
    const location = useLocation()
    const [status, setStatus] = useState('loading')

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(`${API_URL}/api/me`, {
                    credentials: 'include',
                })

                setStatus(response.ok ? 'authenticated' : 'unauthenticated')
            } catch {
                setStatus('unauthenticated')
            }
        }

        checkSession()
    }, [])

    if (status === 'loading') {
        return <div style={{ padding: '24px', fontSize: '14px' }}>Sprawdzanie sesji...</div>
    }

    if (status === 'unauthenticated') {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    return <Outlet />
}

export default RequireAuth