import React from 'react'
import { useNavigate } from 'react-router-dom'

function RaouterNav({afterName, name, path}) {

        const navigate = useNavigate()

  return (
    <div className='routerNav'>
        <p onClick={() => navigate(path)} >{afterName}</p>
        <p>{name}</p>
    </div>
  )
}

export default RaouterNav