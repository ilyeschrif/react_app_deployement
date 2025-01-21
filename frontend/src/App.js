import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/vehicles') // Update this URL to match your backend route
            .then((response) => setData(response.data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>Vehicle List</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.power} - {item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
