import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import UseSignUpHook from '../../hooks/UseSignUpHook'

const SignUp = () => {
  const { loading , signup } = UseSignUpHook();

  const [inputs , setInputs] = useState({
    fullName : "",
    username : "",
    password : "",
    confirmpassword : "",
    gender : "",
  })

  const handleCheckBoxChange = (gender) => {
    setInputs({...inputs , gender : gender})
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    await signup(inputs)
  }


  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-lg bg-gray-400 bg-clip-padding backdrop-filter
      backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>Sign Up 
        <span className='text-blue-500'>ChatApp</span></h1>

        <form onSubmit={handleSignup}>
          
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input type="text" placeholder='Enter Full Name' className='w-full input input-bordered h-10'
              value={inputs.fullName} onChange={(e) => setInputs({...inputs , fullName : e.target.value})} />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input type="text" placeholder='Enter Username' className='w-full input input-bordered h-10'
              value={inputs.username} onChange={(e) => setInputs({...inputs , username : e.target.value})} />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input type="password" placeholder='Enter Password' className='w-full input input-bordered h-10' 
              value={inputs.password} onChange={(e) => setInputs({...inputs , password : e.target.value})} />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input type="password" placeholder='Confirm Password' className='w-full input input-bordered h-10' 
              value={inputs.confirmpassword} onChange={(e) => setInputs({...inputs , confirmpassword : e.target.value})} />
          </div>

          {/* GENDER CHECKBOX COMES HERE */}

          <GenderCheckBox onCheckBoxChange = {handleCheckBoxChange} selectedGender = {inputs.gender} />

          <Link to ="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>Already have an account</Link>

          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default SignUp
