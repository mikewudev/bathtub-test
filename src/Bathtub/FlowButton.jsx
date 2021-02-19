import React from 'react'
import { FLOW } from './index'

export default function FlowButton({ flow, onClick }) {
  const label = flow === FLOW.INCREASING ? 'Increase' : 'Decrease'

  return <button onClick={onClick}>{label}</button>
}
