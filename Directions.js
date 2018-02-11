import React from 'react';

import PropTypes from 'prop-types';

import MapboxGL from '@mapbox/react-native-mapbox-gl';

import MapboxClient from 'mapbox';



import Places from './Places';



const styles = MapboxGL.StyleSheet.create({

  directionsLine: {

    lineWidth: 3,

    lineCap: MapboxGL.LineCap.Round,

    lineJoin: MapboxGL.LineJoin.Round,

  },

});


class Directions extends React.Component {



 constructor (props) {

    super(props);



    this.state = {

      mapboxClient: null,

      directions: null,


    };



    this._mapboxClient = null;

  }



  async componentWillReceiveProps () {

    this.setState({ mapboxClient: new MapboxClient(this.props.accessToken) }, () => {

      this.fetchDirections(this.props.origin,this.props.destination);

    });

  }

  async fetchDirections (origin, dest) {

   if (!origin || !dest || !this.state.mapboxClient) {

     return;

   }



   const originLatLng = {

     latitude: origin[1],

     longitude: origin[0],

   };



   const destLatLng = {

     latitude: dest[1],

     longitude: dest[0],

   };



   const requestOptions = {

     profile: this.props.type,

     geometry: 'polyline',

   };



   let res = null;

   try {

     res = await this.state.mapboxClient.getDirections([

       originLatLng,

       destLatLng,

     ], requestOptions);

   } catch (e) {

     console.log(e); // eslint-disable-line

   }



   if (res == null) {

     return;

   }




   const directions = res.entity.routes[0];

   if (!directions) {

     return;

   }



   if (this.props.onDirectionsFetched) {

     this.props.onDirectionsFetched(directions);

   }




   this.setState({
     directions:directions
});

 }



 render () {

   if (!this.state.directions) {

     return null;
   }


   return (

     <MapboxGL.ShapeSource id='mapbox-directions-source' shape={this.state.directions.geometry}>

       <MapboxGL.LineLayer

         id='mapbox-directions-line'

         belowLayerID={Places.UnselectedSymbolID}

         style={[styles.directionsLine, this.props.style]}/>
     </MapboxGL.ShapeSource>

   );

 }

}



export default Directions;
