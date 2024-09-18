import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import axios from 'axios';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [energyData, setEnergyData] = useState(null);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    axios.get('http://localhost:3000/api/energy')
      .then(response => {
        setEnergyData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <Home energyData={energyData} />
    </div>
  );
}

export default App;
