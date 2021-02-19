import React from 'react'

export default function Tub({ waterLevel }) {
  const water = Array.from({ length: waterLevel })

  return (
    <div className="tub">
      {water.map((level, index) => (
        <div key={index} className="water" />
      ))}
    </div>
  )
}
