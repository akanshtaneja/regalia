import React from 'react'
import {Carousel} from '../Components/common/Carousel'
import { BestSelling } from '../Components/common/BestSelling'
import { Footer } from '../Components/common/Footer'
import { RecentlyViewed } from '../Components/common/RecentlyViewed'



export const Home = () => {
  return (
    <>
    <Carousel />
    <BestSelling />
    <RecentlyViewed />
    <Footer />
    </>
    
  )
}
