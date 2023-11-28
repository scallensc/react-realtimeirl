const valueFormatter = (type: string, inputValue: number) => {
  // altitude from meters to feet
  if (type === 'altitude') {
    return {
      metric: `${(inputValue).toFixed(0)} m`,
      imperial: `${(inputValue * 3.28084).toFixed(0)} ft`
    }
  }
  // distance from km to miles
  if (type === 'distance') {
    return {
      metric: `${(inputValue).toFixed(2)} km`,
      imperial: `${(inputValue * 0.621371).toFixed(2)} mi`
    }
  }
  // speed from kph to mph
  if (type === 'speed') {
    return {
      metric: `${(inputValue).toFixed()} km/h`,
      imperial: `${(inputValue * 0.621371).toFixed()} mph`
    }
  }
  // temperature from celsius to fahrenheit
  if (type === 'temperature') {
    return {
      metric: `${(inputValue).toFixed(2)} °C`,
      imperial: `${(inputValue * 9 / 5 + 32).toFixed(2)} °F`
    }
  }
  // default return
  return { metric: '0', imperial: '0' }
}

export default valueFormatter