import React from 'react'

import { compose, withStateHandlers } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps'

const MapComponent = compose(
  withStateHandlers(
    () => ({
      isOpen: false,
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      }),
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultOptions={props.defaultOptions}>
    {props.markerIcon && (
      <Marker
        position={props.location}
        icon={props.markerIcon}
        onClick={props.onToggleOpen}
      >
        {props.infoWindow && props.isOpen && (
          <>
            <InfoWindow onCloseClick={props.onToggleOpen}>
              {props.infoWindow}
            </InfoWindow>
          </>
        )}
      </Marker>
    )}
  </GoogleMap>
))

const MapWrapper = props => (
  <MapComponent
    location={props.location}
    markerIcon={props.markerIcon}
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${props.apiKey}`}
    loadingElement={<div style={{ height: `100%`, width: '100%' }} />}
    containerElement={<div style={{ height: `100%`, width: '100%' }} />}
    mapElement={<div style={{ height: `100%`, width: '100%' }} />}
    defaultOptions={props.options}
    infoWindow={props.markerInfoComponent}
  />
)
export default MapWrapper

{
  /* <MapWithAMarker
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/> */
}
