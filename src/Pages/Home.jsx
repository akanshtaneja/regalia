import React from 'react'
const Carousel = React.lazy(() => import("../components/organisms/Carousel"));
import { BestSelling } from '../components/organisms/BestSelling'
import { Footer } from '../components/organisms/Footer'
import { RecentlyViewed } from '../components/organisms/RecentlyViewed'



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
