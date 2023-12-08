import React from 'react'
import { LineChart } from './LineChart';

export const data = [
  {x:1, y: 90},
  {x: 2, y: 12},
  {x: 3, y: 34},
  {x: 4, y: 53},
  {x: 5, y: 52},
  {x: 6, y: 9},
  {x: 7, y: 18},
  {x: 8, y: 78},
  {x: 9, y: 28},
  {x: 10, y: 34},
]

type canvasObj = {
  x: number,
  y: number
}
interface IGroundControlTwoView {
  velocityToTimeData: Array<canvasObj>
  altitudeToTimeData: Array<canvasObj>
}

function GroundControlTwoView({ velocityToTimeData, altitudeToTimeData }: IGroundControlTwoView) {
  return (
    <div>
      <LineChart data={velocityToTimeData} width={400} height={300}/>
      <LineChart data={altitudeToTimeData} width={400} height={300}/>
    </div>
  )
}

export default GroundControlTwoView;
