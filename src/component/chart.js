import React from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto'
import { Paper, useMediaQuery } from "@mui/material";

function LineChart({ data, granularity, setGranularity }) {
  const opts = {
    tooltips: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
      }
    }
  };
  const updateGranularity = (gn) => {
    setGranularity('')
  }
  console.log('e')
  const mobile = useMediaQuery('(max-width: 890px)')
  return (
    <Paper sx={{ height: mobile ? '80%' : '90%' , width: mobile ? '100%' : '90%', borderRadius: '0px', padding: '5px' }}>
      <div style={{ height: '85%' }}>
        <div style={{marginBottom:'30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ borderRadius: '5px', alignItems: 'center', justifyContent: 'center', marginTop: '4px', display: 'flex', backgroundColor: '#d5d5d5', padding: '5px' }}>
            <div
              onClick={() => updateGranularity('1d')}
              style={
                true ?
                  { cursor: 'pointer', marginRight: '15px', padding: '5px', backgroundColor: '#fff', borderRadius: '5px' } :
                  { cursor: 'pointer', marginRight: '4px', padding: '5px' }
              }>1D</div>
            <div
              onClick={() => updateGranularity('7d')}
              style={
                granularity === '' ?
                  { cursor: 'pointer', marginRight: '15px', padding: '5px', backgroundColor: '#fff', borderRadius: '5px' } :
                  { cursor: 'pointer', marginRight: '15px', padding: '5px' }
              }>7D</div>
            <div
              onClick={() => updateGranularity('1m')}
              style={
                granularity === '' ?
                  { cursor: 'pointer', marginRight: '15px', padding: '5px', backgroundColor: '#fff', borderRadius: '5px' } :
                  { cursor: 'pointer', marginRight: '15px', padding: '5px' }
              }>1M</div>
            <div
              onClick={() => updateGranularity('3m')}
              style={
                granularity === '' ?
                  { cursor: 'pointer', marginRight: '15px', padding: '5px', backgroundColor: '#fff', borderRadius: '5px' } :
                  { cursor: 'pointer', marginRight: '15px', padding: '5px' }
              }>3M</div>
            <div
              onClick={() => updateGranularity('1y')}
              style={
                granularity === '' ?
                  { cursor: 'pointer', marginRight: '8px', padding: '5px', backgroundColor: '#fff', borderRadius: '5px' } :
                  { cursor: 'pointer', marginRight: '8px', padding: '5px' }
              }>1Y</div>
          </div>
        </div>
        <Line style={{ height: '60vh' }} data={data} options={opts} />
      </div>
    </Paper>
  );
}

export default React.memo(LineChart);
Chart.register(CategoryScale)
