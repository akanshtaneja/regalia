import React, { createContext, useContext, useState, useEffect } from 'react'

export  const WishlistContext = createContext ()

export const WishlistProvider = ({children}) => {
    const [wishlistItems, setWishlistItems] = useState([])
    

    
// already saved wishlist loading
useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("LoginId"))
    const savedWishlist = JSON.parse(localStorage.getItem(`Wishlist_${userId}`)) || []
    setWishlistItems(savedWishlist)
}, [])






    // Add to wishlist
    const addToWishlist = (item) => {
        const userId = JSON.parse(localStorage.getItem("LoginId"))
        const isItemInWishlist = wishlistItems.find((wishlistItem) => wishlistItem.id === item.id )
        if (!isItemInWishlist) {
            const updateWishlist = [...wishlistItems, item]
            setWishlistItems(updateWishlist)
            localStorage.setItem(`Wishlist_${userId}`, JSON.stringify(updateWishlist))
        }
        else{
            console.log("item is already in the wishlist")
        }
    }

    // remove from wishlist
    const removeFromWishlist = (item) =>{
        const userId = JSON.parse(localStorage.getItem("LoginId"))
        const isItemInWishlist = wishlistItems.find((wishlistItem) => wishlistItem.id === item.id )
        if(isItemInWishlist){
            const removeItem = wishlistItems.filter((wishlistItem) => wishlistItem.id !== item.id)
           setWishlistItems(removeItem)
            localStorage.setItem(`Wishlist_${userId}`, JSON.stringify(removeItem))
        }
    }

    // toggle wishlist 
    const toggleWishlist =(item) => {
        const isItemInWishlist = wishlistItems.find((wishlistItem) => wishlistItem.id === item.id )
        if(isItemInWishlist){
            removeFromWishlist(item)
        }
        else{
            addToWishlist(item)
        }
    }

  return (
    <>
    <WishlistContext.Provider
    value= {{
        addToWishlist,
        removeFromWishlist,
        wishlistItems,
        toggleWishlist
    }}>
        {children}
    </WishlistContext.Provider>
    </>
  )
}

export const useWishlist = () => useContext(WishlistContext)