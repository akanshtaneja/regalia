import React, { createContext, useContext, useState } from 'react'

export  const WishlistContext = createContext ()

export const WishlistProvider = ({children}) => {
    const [wishlistItems, setWishlistItems] = useState([])

    

    // Add to wishlist
    const addToWishlist = (item) => {
        const isItemInWishlist = wishlistItems.find((wishlistItem) => wishlistItem.id === item.id )
        if (!isItemInWishlist) {
            const updateWishlist = [...wishlistItems, item]
            setWishlistItems(updateWishlist)
            localStorage.setItem("Wishlist", JSON.stringify(updateWishlist))
        }
        else{
            console.log("item is already in the wishlist")
        }
    }

    // remove from wishlist
    const removeFromWishlist = (item) =>{
        const isItemInWishlist = wishlistItems.find((wishlistItem) => wishlistItem.id === item.id )
        if(isItemInWishlist){
            const removeItem = wishlistItems.filter((wishlistItem) => wishlistItem.id !== item.id)
           setWishlistItems(removeItem)
            localStorage.setItem("Wishlist", JSON.stringify(removeItem))
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