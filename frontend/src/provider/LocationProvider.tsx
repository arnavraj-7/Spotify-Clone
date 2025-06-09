import { useLocationStore } from '@/stores/LocationStore';
import React, {  useEffect,useRef } from 'react'
import { useLocation } from 'react-router-dom'

const LocationProvider = ({children}:{children:React.ReactNode}) => {
    const {prevlocation,setPrevlocation} = useLocationStore();
    const prevLocationRef = useRef("/");
    const location = useLocation()
    useEffect(() => {
        setPrevlocation(prevLocationRef.current)
        prevLocationRef.current = location.pathname
    }, [location])
  return (
    <div>{children}</div>
  )
}

export default LocationProvider