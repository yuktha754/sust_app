import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function Home() {
    const [data, setData] = useState([
        { name: 'Monday', el: 400, wa: 20, amt: 2400 },
        { name: 'Tuesday', el: 200, wa: 30, amt: 2210 },
        { name: 'Wednesday', el: 1800, wa: 50, amt: 2290 },
        { name: 'Thursday', el: 1200, wa: 40, amt: 2000 },
        { name: 'Friday', el: 800, wa: 40, amt: 2181 },
        { name: 'Saturday', el: 2400, wa: 80, amt: 2500 },
        { name: 'Sunday', el: 2412, wa: 80, amt: 2100 },
    ]);

    const [alerts, setAlerts] = useState([]); // State to track alerts

    // Function to check the limit and set alert message if greater than 2000
    const checkLimit = (value, type) => {
        const limit = 2000; // Set the limit to 2000
        if (value > limit) {
            setAlerts(prev => [...prev, `${type} usage exceeds the limit of ${limit}!`]);
        }
    };

    // Function to generate random values for electricity (el) and water (wa)
    const randomizeData = () => {
        setAlerts([]); // Clear previous alerts before randomizing new data
        const newData = data.map((day) => {
            const newEl = Math.floor(Math.random() * 3000); // Random electricity between 0 and 3000W
            const newWa = Math.floor(Math.random() * 100);  // Random water between 0 and 100L

            // Check limits after generating random values
            checkLimit(newEl, "Electricity");
            checkLimit(newWa, "Water");

            return {
                ...day,
                el: newEl,
                wa: newWa,
            };
        });
        setData(newData);
    };

    // UseEffect to update data every 30 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            randomizeData();
        }, 30000); // 30 seconds interval

        // Cleanup interval when component unmounts
        return () => clearInterval(intervalId);
    }, [data]);

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>CUSTOMER NAME</h3>
                        <BsPeopleFill className='card_icon' />
                    </div>
                    <h2>ANETTE FERNANDES</h2>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>CATEGORIES</h3>
                        <BsFillGrid3X3GapFill className='card_icon' />
                    </div>
                    <h1>01</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>AVERAGE COST</h3>
                        <BsFillArchiveFill className='card_icon' />
                    </div>
                    <h1>1201</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>ALERTS</h3>
                        <BsFillBellFill className='card_icon' />
                    </div>
                    <h1>{alerts.length}</h1>
                </div>
            </div>

            {/* Alerts Section */}
            <div className="alerts-section">
                {alerts.length > 0 && (
                    <div className="alert-box">
                        {alerts.map((alert, index) => (
                            <p key={index} className="alert-text">
                                {alert}
                            </p>
                        ))}
                    </div>
                )}
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="el" fill="#8884d8" />
                        <Bar dataKey="wa" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="el" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="wa" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </main>
    );
}

export default Home;
