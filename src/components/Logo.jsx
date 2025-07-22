import React from 'react'
import logoImg from '../assets/ad126155-fcda-442d-8908-6c72111a62d1.jpg' 

function Logo({ width = '100px' }) {
  return (
    <img
      src={logoImg}
      alt="Mega-Blog Logo"
      style={{ width, height: width }}
      className="block rounded-full object-cover"
    />
  )
}

export default Logo