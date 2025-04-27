import toast from 'react-hot-toast'
import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'

const useSignIn = () => { 
    const [loading, setLoading] = useState(false) 
    const { setAuthUser } = useAuthContext()

    const signIn = async ({ identifier , password }) => {
        const success = handleInputErrors({ identifier, password })  
        if (!success) {
            return
        }
        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/auth/signin", { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            }
            )
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            localStorage.setItem("splitease-user", JSON.stringify(data)) 
            setAuthUser(data)

        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, signIn } 
}

export default useSignIn  

function handleInputErrors({ identifier, password }) {
    if (!identifier || !password) { 
        toast.error('All fields are required')
        return false
    } 
    return true
}