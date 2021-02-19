import React, { useEffect, useState } from 'react'
import FlowButton from './FlowButton'
import Tub from './Tub'

export const FLOW = {
  INCREASING: 'increasing',
  DECREASING: 'decreasing',
  STOPPED: 'stopped',
}

const WATER_LEVEL_MIN = 0
const WATER_LEVEL_MAX = 5
const WATER_LEVEL_RATE = 1 // How much the water changes each update

const FLOW_RATE_SECS = 2

export default function Bathtub() {
  const [flow, setFlow] = useState(FLOW.STOPPED)
  const [waterLevel, setWaterLevel] = useState(2)

  useEffect(() => {
    const interval = setInterval(() => {
      if (flow === FLOW.STOPPED) {
        return
      }

      // Use callback to make sure we're always dealing with
      // the current state value. Technically not required,
      // but good to be sure in case of multiple timers.
      setWaterLevel((currentLevel) => {
        const nextLevel =
          flow === FLOW.INCREASING
            ? currentLevel + WATER_LEVEL_RATE
            : currentLevel - WATER_LEVEL_RATE

        if (!withinRange(nextLevel)) {
          return currentLevel
        }

        return nextLevel
      })
    }, FLOW_RATE_SECS * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [flow])

  return (
    <div className="container">
      <Tub waterLevel={waterLevel} />
      <FlowButton
        flow={FLOW.INCREASING}
        onClick={() => setFlow(FLOW.INCREASING)}
      />
      <FlowButton
        flow={FLOW.DECREASING}
        onClick={() => setFlow(FLOW.DECREASING)}
      />
    </div>
  )
}

function withinRange(waterLevel) {
  const aboveMin = waterLevel >= WATER_LEVEL_MIN
  const belowMax = waterLevel <= WATER_LEVEL_MAX

  return aboveMin && belowMax
}
