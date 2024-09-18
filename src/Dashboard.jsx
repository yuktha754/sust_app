import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to your Socket.io server
const socket = io('http://localhost:4000'); // Adjust the URL as needed

const Dashboard = () => {
  const [electricity, setElectricity] = useState(0);
  const [water, setWater] = useState(0);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    socket.on('data', (data) => {
      setElectricity(data.electricity);
      setWater(data.water);
    });

    return () => {
      socket.off('data');
    };
  }, []);

  useEffect(() => {
    if (electricity > 2500) {
      setAlert('Electricity usage exceeds 2500W!');
    } else if (water > 80) {
      setAlert('Water usage exceeds 80L!');
    } else {
      setAlert('');
    }
  }, [electricity, water]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Electricity Usage: {electricity}W</p>
      <p>Water Usage: {water}L</p>
      {alert && <div className="alert">{alert}</div>}
    </div>
  );
};

export default Dashboard;
