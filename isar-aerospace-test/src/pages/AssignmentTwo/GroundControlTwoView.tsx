import React from 'react'
import { LineChart } from '../../components/reusable/LineChart/LineChart';

import './GroundControlTwo.scss';

type canvasObj = {
  x: number,
  y: number
}
interface IGroundControlTwoView {
  velocityToTimeData: Array<canvasObj>
  altitudeToTimeData: Array<canvasObj>
  temperatureToTimeData: Array<canvasObj>,
  currentVelocity: number,
  currentAltitude: number,
  currentTemperature: number,
  statusMessage: string,
  isAscending: boolean,
  currentActionStatus: boolean,
  onActOnSpectrum: () => void,
}

function GroundControlTwoView({ 
  velocityToTimeData, 
  altitudeToTimeData, 
  temperatureToTimeData, 
  currentVelocity, 
  currentAltitude, 
  currentTemperature, 
  statusMessage, 
  isAscending,
  currentActionStatus,
  onActOnSpectrum 
}: Readonly<IGroundControlTwoView>) {
  function onPressActOnSpectrum() {
    onActOnSpectrum();
  }
  return (
    <div className='controller-wrapper-two'>
      <p className='group-title-one'>Live data</p>
      <div className='on-time-content-wrapper-two'>
        <div className='velocity-wrapper-two'>
          <p>Spectrum velocity (unit)</p>
        {currentVelocity}
        </div>
        <div className='altitude-wrapper-two'>
          <p>Spectrum altitude (unit)</p>
        {currentAltitude}
        </div>
        <div className='temperature-wrapper-two'>
          <p>Spectrum temperature (unit)</p>
          {currentTemperature}
        </div>
        <div className='right-content-two'>
          <div className='status-wrapper-two'>
            <p>Spectrum current status: </p>
            <p className='status-message-two'>{statusMessage}</p>
          </div>
          <div className='row-wrapper-two'>
            <div className='asc-status-wrapper-two'>
              <p>Ascending status: </p>
              <p className='asc-status-message-two'>{`${isAscending}`}</p>
            </div>
            <div className='asc-status-wrapper-two'>
              <p>Action required: </p>
              <p className='asc-status-message-two'>{`${currentActionStatus}`}</p>
            </div>
            <div className='cta-btn-wrapper-two'>
              <button disabled={!currentActionStatus} className={`${currentActionStatus ? 'cta-btn-two-dark': 'cta-btn-two'}`} onClick={onPressActOnSpectrum}>ActOnSpectrum</button>
            </div>
          </div>
        </div>
      </div>
      <p className='group-title-one'>Live Spectrum stats</p>
      <div className='chart-wrapper-two'>
        <div className='velocity-graph-wrapper-two'>
          <p>Spectrum velocity variation</p>
          <LineChart data={velocityToTimeData} width={440} height={300} color='#E3504D'/>
        </div>
        <div className='altitude-graph-wrapper-two'>
          <p>Spectrum altitude variation</p>
          <LineChart data={altitudeToTimeData} width={440} height={300} color='#01B4BB'/>
        </div>
        <div className='temperature-graph-wrapper-two'>
          <p>Spectrum temperature variation</p>
          <LineChart data={temperatureToTimeData} width={440} height={300} color='#FFA500'/>
        </div>
      </div>
    </div>
  )
}

export default GroundControlTwoView;
