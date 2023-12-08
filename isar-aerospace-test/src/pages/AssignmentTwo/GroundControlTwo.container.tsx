import React, { useEffect, useState } from 'react';
import { useWs } from '../../hooks/hooks';
import GroundControlTwoView from './GroundControlTwoView';

type SpectrumStatus = {
  velocity: number,
  altitude: number,
  temperature: number,
  statusMessage: string,
  isAscending: boolean,
  isActionRequired: boolean
}
const startTime = Date.now()
function GroundControl() {
  const [spectrumData, setSpectrumData] = useState<Array<SpectrumStatus>>([]);
  const [ready, val, send] = useWs(`${process.env.REACT_APP_WS_URL}`)
  const [dataVToT, setDataVToT] = useState<any>([]);
  const [dataAToT, setDataAToT] = useState<any>([]);
  useEffect(() => {
    if (val !== null) {
      setSpectrumData([...spectrumData, val])
      generateVelocityToTimeCanvas(val)
      generateAltitudeToTimeCanvas(val)
    }
  }, [val])
  // console.log('spectrumData', spectrumData)
  function generateVelocityToTimeCanvas(val: any) {
      const obj = {
        y: parseInt(JSON.parse(val).Velocity),
        x: Math.round((Date.now() - startTime) / 500)
      }
    setDataVToT([...dataVToT, obj])
  }

  function generateAltitudeToTimeCanvas(val: any) {
    const obj = {
      y: parseInt(JSON.parse(val).Altitude),
      x: Math.round((Date.now() - startTime) / 500)
    }
    setDataAToT([...dataAToT, obj])
  }
  // console.log('dataVToA', dataVToA)
  return (
    <GroundControlTwoView velocityToTimeData={dataVToT} altitudeToTimeData={dataAToT}/>
  )
}

export default GroundControl;
