import React from 'react'

export const debounce = (fn, delay) => {
  let timer
  return (...args) => {
    clearTimeout(timer)

    timer = setTimeout(()=>{
      fn (...args)
    }, delay)
  }

}
