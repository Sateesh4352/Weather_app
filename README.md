# Weather App

- This Weather App is a React-based application that provides weather information for a specified location. 
- It uses the OpenWeatherMap API to fetch weather data and displays information like temperature, humidity, wind speed, and weather conditions. 
- The application also displays the current date and time for the specified location in a 24-hour format.

## Features

- Displays weather information including temperature, humidity, wind speed, and weather conditions.
- Fetches weather data for a specified location.
- Shows current date and time for the specified location in a 24-hour format.
- Handles loading state and displays an appropriate message if the location is not found.

## Prerequisites

- Node.js and npm should be installed on your system.

## Getting Started

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/weather-app.git
    cd weather-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up OpenWeatherMap API Key**:
   - Create a `utils.js` file in the `src/utils` directory.
   - Add your OpenWeatherMap API key to the `utils.js` file:
     ```javascript
     export const API_KEY = 'YOUR_API_KEY_HERE';
     ```

4. **Run the application**:
    ```bash
    npm start
    ```

## Code Explanation

### `Home.js`

This is the main component that handles fetching and displaying weather data.

```javascript
import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone'; 
import cloudy from '../Assets/cloudy.png';
import sunny from '../Assets/sunny.png';
import rainy from '../Assets/rainy.png';
import snowy from '../Assets/snowy.png';
import loadinggif from '../Assets/loading.gif';

import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import { API_KEY } from '../utils/utils';


