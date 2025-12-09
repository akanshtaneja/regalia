import React from 'react'
import {useNavigate} from 'react-router-dom'

export const Breadcrumb = ({title}) => {
    const navigate = useNavigate()
  return (
    
    <div className='w-full px-6 py-2 hidden md:block'>
        <h1 className='text-l text-gray-700 font-semibold'>
            <span className='cursor-pointer' onClick={() => navigate('/')}>Home</span>/
            <span className='cursor-pointer' onClick={() => navigate('/products')}>Products</span>/
            <span>{title}</span>
            </h1>
    </div>
  )
}
