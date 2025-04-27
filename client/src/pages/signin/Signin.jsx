import React, { useState } from 'react'
import useSignIn from '../../hooks/useSignIn.js'


const signIn = () => {
  const [formData, setFormData] = useState({
    identifier: '',  // email ya phone number
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value 
    })
  } 
  const {signIn} = useSignIn()  
  const handleSubmit = async(e) => {
    e.preventDefault() 

    // basic validation ki kaunsi type ka data hai
    const isEmail = formData.identifier.includes('@')
    const isPhone = /^\d{10}$/.test(formData.identifier)

    if (!isEmail && !isPhone) {
      alert("Please enter a valid email or 10-digit phone number")
      return
    }

    // console.log('Form Data:', formData)
    // yaha API call laga dena later
    await signIn(formData) 
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back!</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Email or Phone</label>
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email or phone"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Sign In
        </button>
      </form>
      <p className="text-center text-gray-600">
        Don’t have an account? <a href="/signup" className="text-blue-500 font-medium">Create one</a>
      </p>
    </div>
  )
}

export default signIn  
