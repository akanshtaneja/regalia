import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";


export const StarRating = ({rating}) => {
  return (
    <div className='flex items-center gap-1'>
        {[1,2,3,4,5].map((star) => {
            if(rating >= star){
                return <FaStar key={star} className='text-yellow-400' />
            }
            else if (rating >= star - 0.5) {
                return <FaStarHalfAlt key={star} className='text-yellow-400' />
            }
            else {
                return <FaRegStar key={star} className ="text-gray-300"/>
            }
        }
            
        )}
        
        
        
    </div>
  )
}
