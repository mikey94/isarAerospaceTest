import React from 'react'
import './GroundControlOne.scss';
import { LineChart } from '../../components/reusable/LineChart/LineChart';

type canvasObj = {
  x: number,
  y: number
}
interface IGroundControlOneView {
  currentVelocity: number,
  currentAltitude: number,
  currentTemperature: number,
  currentStatus: string,
  currentAscendingStatus: boolean,
  onSpectrumStatus: () => void,
  velocityToTimeData: Array<canvasObj>,
  altitudeToTimeData: Array<canvasObj>
}

function GroundControlOneView({ currentVelocity, currentAltitude, currentTemperature, currentStatus, currentAscendingStatus, onSpectrumStatus, velocityToTimeData,
  altitudeToTimeData }: IGroundControlOneView) {
  function requestSpectrumData() {
    onSpectrumStatus();
  }
  return (
    <div className='controller-wrapper-one'>
      <div className='on-time-content-wrapper-one'>
        <div className='velocity-wrapper-one'>
          <p>Spectrum velocity (unit)</p>
        {currentVelocity}
        </div>
        <div className='altitude-wrapper-one'>
          <p>Spectrum altitude (unit)</p>
        {currentAltitude}
        </div>
        <div className='temperature-wrapper-one'>
          <p>Spectrum temperature (unit)</p>
          {currentTemperature}
        </div>
        <div className='right-content-one'>
          <div className='status-wrapper-one'>
            <p>Spectrum current status: </p>
            <p className='status-message-one'>{currentStatus}</p>
          </div>
          <div className='row-wrapper-one'>
            <div className='asc-status-wrapper-one'>
              <p>Ascending status: </p>
              <p className='asc-status-message-one'>{`${currentAscendingStatus}`}</p>
            </div>
            <div className='cta-btn-wrapper-one'>
              <button className='cta-btn-one' onClick={requestSpectrumData}>Get Spectrum Status</button>
            </div>
          </div>
        </div>
      </div>
      <div className='chart-wrapper-one'>
        <div className='velocity-graph-wrapper-one'>
          <p>Spectrum velocity variation</p>
          <LineChart data={velocityToTimeData} width={450} height={300} color='#E3504D'/>
        </div>
        <div className='altitude-graph-wrapper-one'>
          <p>Spectrum altitude variation</p>
          <LineChart data={altitudeToTimeData} width={450} height={300} color='#01B4BB'/>
        </div>
      </div>
    </div>
  )
}

export default GroundControlOneView;
