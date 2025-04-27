import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useSignUp = () => { 
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()
    const signUp = async ({ name, phone, email,password, confirmPassword }) => {
        const success = handleInputErrors({ name, phone, email,password, confirmPassword })
        if (!success) {
            return 
        }
        
        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, email,password, confirmPassword }) 

            })
            const data = await res.json()
            if(data.error){
                throw new Error(data.error)
            }
            // localstorage
            localStorage.setItem("splitease-user" , JSON.stringify(data)) 
            // context
            setAuthUser(data)
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }
    return {signUp} 
}

export default useSignUp  

function handleInputErrors({ name, phone, email,password, confirmPassword }) {
    if (!name || !phone || !email || !password || !confirmPassword  ) {
        toast.error('All fields are required')
        return false
    }
    if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return false
    }
    if (password.length < 6) {
        toast.error('Password must be atleast 6 characters long')
        return false
    }
    return true
}