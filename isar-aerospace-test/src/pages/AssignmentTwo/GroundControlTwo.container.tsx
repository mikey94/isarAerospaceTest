import React, { useEffect, useState } from 'react';
import { useWs } from '../../hooks/hooks';
import GroundControlTwoView from './GroundControlTwoView';
import { getActOnSpectrum } from '../../services/spectrum.service';

type SpectrumStatus = {
  Velocity: number,
  Altitude: number,
  Temperature: number,
  StatusMessage: string,
  IsAscending: boolean,
  IsActionRequired: boolean
}

type ChartObj = {
  x: number,
  y: number
}
const startTime = Date.now()
function GroundControl() {
  const [spectrumData, setSpectrumData] = useState<Array<SpectrumStatus>>([]);
  const [ready, val, send] = useWs(`${process.env.REACT_APP_WS_URL}`)
  const [dataVToT, setDataVToT] = useState<Array<ChartObj>>([]);
  const [dataAToT, setDataAToT] = useState<Array<ChartObj>>([]);
  const [dataTToT, setDataTToT] = useState<Array<ChartObj>>([]);

  useEffect(() => {
    if (val !== null) {
      setSpectrumData([...spectrumData, JSON.parse(val)])
      generateVelocityToTimeCanvas(JSON.parse(val))
      generateAltitudeToTimeCanvas(JSON.parse(val))
      generateTemperatureToTimeCanvas(JSON.parse(val))
    }
  }, [val])
  // console.log('spectrumData', spectrumData)
  async function onActSpectrumRequest() {
    const response = getActOnSpectrum()
    const data = await response
    console.log('onActSpectrumRequest', data)
  }

  function generateVelocityToTimeCanvas(val: any) {
      const obj = {
        y: parseInt(val.Velocity),
        x: Math.round((Date.now() - startTime) / 500)
      }
    setDataVToT([...dataVToT, obj])
  }

  function generateAltitudeToTimeCanvas(val: any) {
    const obj = {
      y: parseInt(val.Altitude),
      x: Math.round((Date.now() - startTime) / 500)
    }
    setDataAToT([...dataAToT, obj])
  }

  function generateTemperatureToTimeCanvas(val: any) {
    const obj = {
      y: parseInt(val.Temperature),
      x: Math.round((Date.now() - startTime) / 500)
    }
    setDataTToT([...dataTToT, obj])
  }

  function getCurrentVelocity() {
    if (spectrumData.length) {
      const { Velocity } = spectrumData[spectrumData.length -1]
      return Number((Math.round(Velocity * 100) / 100).toFixed(2));
    }
    return 0
  }

  function getCurrentAltitude() {
    if(spectrumData.length) {
      const { Altitude } = spectrumData[spectrumData.length -1]
      return  Number((Math.round(Altitude * 100) / 100).toFixed(2));
    }
    return 0
  }

  function getCurrentTemperature() {
    if(spectrumData.length) {
      const { Temperature } = spectrumData[spectrumData.length -1]
      return  Number((Math.round(Temperature * 100) / 100).toFixed(2));
    }
    return 0
  }

  function getCurrentStatusMessage() {
    if(spectrumData.length) {
      const { StatusMessage } = spectrumData[spectrumData.length -1]
      return StatusMessage;
    }
    return ''
  }

  function getAscendingStatus() {
    if(spectrumData.length) {
      const { IsAscending } = spectrumData[spectrumData.length -1]
      return IsAscending
    }
    return false
  }

  function getActionRequired() {
    if(spectrumData.length) {
      const { IsActionRequired } = spectrumData[spectrumData.length -1]
      return IsActionRequired
    }
    return false
  }

  return (
    <GroundControlTwoView 
      velocityToTimeData={dataVToT} 
      altitudeToTimeData={dataAToT}
      temperatureToTimeData={dataTToT}
      currentVelocity={getCurrentVelocity()} 
      currentAltitude={getCurrentAltitude()}
      currentTemperature={getCurrentTemperature()}
      statusMessage={getCurrentStatusMessage()}
      isAscending={getAscendingStatus()}
      currentActionStatus={getActionRequired()}
      onActOnSpectrum={onActSpectrumRequest}
    />
  )
}

export default GroundControl;
