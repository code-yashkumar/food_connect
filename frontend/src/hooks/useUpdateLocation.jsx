import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useSelector } from 'react-redux'

function useUpdateLocation() {
  const { userData } = useSelector(state => state.user)

  useEffect(() => {
    if (!userData || typeof navigator === "undefined" || !navigator.geolocation) {
      return
    }

    const updateLocation = async (lat, lon) => {
      try {
        await axios.post(`${serverUrl}/api/user/update-location`, { lat, lon }, { withCredentials: true })
      } catch (error) {
        console.warn("[Location] Update failed:", error.message)
      }
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        updateLocation(pos.coords.latitude, pos.coords.longitude)
      },
      (err) => {
        console.warn("[Location] Watch error:", err.message)
      }
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [userData])
}

export default useUpdateLocation
