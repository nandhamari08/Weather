# SkyCast Pro - Modern Weather Dashboard

SkyCast Pro is a premium, responsive weather dashboard built with React, TypeScript, and Tailwind CSS. It provides real-time weather data and 3-day forecasts with a sleek glassmorphism design.

## Features

- **Real-time Weather**: Current temperature, condition, humidity, wind speed, and "feels like" temperature.
- **3-Day Forecast**: Accurate forecast for the next 3 days including max/min temperatures.
- **Location Detection**: Auto-detect your current location's weather.
- **Search History**: Quick access to your recently searched cities.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Units Toggle**: Switch between Celsius and Fahrenheit.
- **Dynamic Backgrounds**: Background changes based on the current weather condition and time of day.
- **Glassmorphism UI**: Beautiful, modern interface with smooth animations.

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **API**: WeatherAPI.com (Axios for fetching)

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file and add your WeatherAPI key:
   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
   ```
4. Start the development server: `npm run dev`

## License

MIT
