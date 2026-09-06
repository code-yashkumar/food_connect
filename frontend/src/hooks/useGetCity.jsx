import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAddress, setCurrentCity, setCurrentState } from '../redux/userSlice'
import { setAddress, setLocation } from '../redux/mapSlice'

function useGetCity() {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)
  const apiKey = import.meta.env.VITE_GEOAPIKEY

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          dispatch(setLocation({ lat: latitude, lon: longitude }))

          if (!apiKey) {
            return
          }

          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
          )
          const first = result?.data?.results?.[0]
          if (first) {
            dispatch(setCurrentCity(first.city || first.county || ""))
            dispatch(setCurrentState(first.state || ""))
            dispatch(setCurrentAddress(first.address_line2 || first.address_line1 || ""))
            dispatch(setAddress(first.address_line2 || first.address_line1 || ""))
          }
        } catch (error) {
          console.warn("[Geoapify] Reverse geocode error:", error.message)
        }
      },
      (error) => {
        console.warn("[Geolocation] Could not obtain position:", error.message)
      }
    )
  }, [userData])
}

export default useGetCity
