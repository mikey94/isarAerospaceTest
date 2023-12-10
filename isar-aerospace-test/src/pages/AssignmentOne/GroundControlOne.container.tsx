import React, { useEffect, useState } from 'react'
import { getSpectrumStatus } from '../../services/spectrum.service';
import GroundControlOneView from './GroundControlOneView';

type SpectrumData = {
  velocity: number,
  altitude: number,
  temperature: number,
  statusMessage: string,
  isAscending: boolean,
  isActionRequired: boolean
}
type ChartObj = {
  x: number,
  y: number
}
const startTime = Date.now()
function GroundControl() {
  const [spectrumData, setSpectrumData] = useState<Array<SpectrumData>>([]);
  const [dataVToT, setDataVToT] = useState<Array<ChartObj>>([]);
  const [dataAToT, setDataAToT] = useState<Array<ChartObj>>([]);
  const [dataTToT, setDataTToT] = useState<Array<ChartObj>>([]);

  async function checkSpectrumStatus () {
    const response = getSpectrumStatus()
    const result = await response
    setSpectrumData([...spectrumData, result])
    generateVelocityToTimeCanvas(result)
    generateAltitudeToTimeCanvas(result)
    generateTemperatureToTimeCanvas(result)
  }

  useEffect(() => {
    checkSpectrumStatus();
  }, [])
 
  function requestNewSpectrumStatus() {
    checkSpectrumStatus();
  }

  function getCurrentVelocity() {
    if(spectrumData.length) {
      const { velocity } = spectrumData[spectrumData.length -1]
      return Number((Math.round(velocity * 1000) / 1000).toFixed(3));
    }
    return 0
  }

  function getCurrentAltitude() {
    if(spectrumData.length) {
      const { altitude } = spectrumData[spectrumData.length -1]
      return Number((Math.round(altitude * 1000) / 1000).toFixed(3));
    }
    return 0
  }

  function getCurrentTemperature() {
    if(spectrumData.length) {
      const { temperature } = spectrumData[spectrumData.length -1]
      return Number((Math.round(temperature * 1000) / 1000).toFixed(3));
    }
    return 0
  }

  function getCurrentStatus() {
    if(spectrumData.length) {
      const { statusMessage } = spectrumData[spectrumData.length -1]
      return statusMessage
    }
    return ''
  }

  function getCurrentAscStatus() {
    if(spectrumData.length) {
      const { isAscending } = spectrumData[spectrumData.length -1]
      return isAscending
    }
    return false
  }

  function getActionRequired() {
    if(spectrumData.length) {
      const { isActionRequired } = spectrumData[spectrumData.length -1]
      return isActionRequired
    }
    return false
  }

  function generateVelocityToTimeCanvas(val: any) {
    const obj = {
      y: parseInt(val.velocity),
      x: Math.round((Date.now() - startTime) / 500)
    }
    setDataVToT([...dataVToT, obj])
  }

  function generateAltitudeToTimeCanvas(val: any) {
    const obj = {
      y: parseInt(val.altitude),
      x: Math.round((Date.now() - startTime) / 500)
    }
    setDataAToT([...dataAToT, obj])
  }

  function generateTemperatureToTimeCanvas(val: any) {
    const obj = {
      y: parseInt(val.temperature),
      x: Math.round((Date.now() - startTime) / 500)
    }
    setDataTToT([...dataTToT, obj])
  }

  return (
    <GroundControlOneView 
      currentVelocity={getCurrentVelocity()} 
      currentAltitude={getCurrentAltitude()} 
      currentTemperature={getCurrentTemperature()}
      currentStatus={getCurrentStatus()}
      currentAscendingStatus={getCurrentAscStatus()}
      currentActionStatus={getActionRequired()}
      onSpectrumStatus={requestNewSpectrumStatus}
      velocityToTimeData={dataVToT}
      altitudeToTimeData={dataAToT}
      temperatureToTimeData={dataTToT}
    />
  )
}

export default GroundControl;
