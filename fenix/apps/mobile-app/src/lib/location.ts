import * as Location from 'expo-location'

export const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    throw new Error('Permiso de ubicación denegado')
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High
  })

  return {
    lat: location.coords.latitude,
    lng: location.coords.longitude
  }
}
