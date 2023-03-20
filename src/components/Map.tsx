import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
  Tooltip,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Layer } from 'leaflet'

const Map: React.FC<{ data: any }> = ({ data }) => {
  // Customize the style of the state layer
  const stateStyle = () => {
    return {
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7,
      fillColor: 'gray',
    }
  }

  const stateLabel = (feature: any) => {
    return feature.main.temp
  }

  return (
    <MapContainer
      center={[39.0697999379325, 35.58845227490206]}
      zoom={7}
      scrollWheelZoom={false}
      style={{ height: '100vh', width: '100vw' }}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {data.map((item: any) => {
        const {
          coord: { lat, lon },
          main: { temp },
        } = item
        return (
          <Marker position={[lat, lon]} opacity={0}>
            <Tooltip
              className='tooltip'
              direction='right'
              opacity={1}
              permanent
            >
              <div className='tooltip-div'>
                <p className='temp-tooltip'>{Math.round(temp)}&deg;C</p>
              </div>
            </Tooltip>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )
      })}

      {/* <GeoJSON
        data={data}
        style={stateStyle}
        onEachFeature={(feature, layer) => {
          console.log('feature', feature)
          layer.bindTooltip(stateLabel(feature), { sticky: true })
        }}
      /> */}
    </MapContainer>
  )
}

export default Map
