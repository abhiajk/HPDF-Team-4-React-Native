import React from 'react';
import {Container,Header, Card, CardItem,Title, Button,Drawer,InputGroup,Input,aBadge, Icon,Content,Left, Right,Footer,Fab,Spinner,FooterTab,Thumbnail,H3,H2,Body,Top,Bottom,Tabs,Tab,TabHeading,hasTabs} from 'native-base';

import PropTypes from 'prop-types';

import MapboxGL from '@mapbox/react-native-mapbox-gl';

import Mapbox from '@mapbox/react-native-mapbox-gl';

import { View, PixelRatio, Platform,StyleSheet, Text, Dimensions,TextInput,FlatList} from 'react-native';
import MapboxClient from 'mapbox';


import Directions from './Directions';

import Places from './Places';
import Theme from './Theme';
import DirectionType from './DirectionType';

const MAPBOX_ACCESS_TOKEN = 'REPLACE WITH YOUR MAPBOX ACCESS TOKEN';

class MapView extends React.Component {


  async componentWillMount () {
    MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);
  }
   constructor (props) {

    super(props);

    let destination = null, activeID = -1;
    this.state = {

    activeIndex: 0,

    activeID: activeID,

    origin: null,

    region: null,

    layout: null,

    destination: destination,




   };
   }


get directionsStyle () {

    return {

      lineColor: 'green',

    };

  }



 render () {

	 return (



			 <MapboxGL.MapView

				 ref={c => this.map = c}

				 zoomLevel={1}

				 styleURL={Mapbox.StyleURL.Street}

				 centerCoordinate={[28, 77]}

				 style={{ flex: 1 }}>



				 {this.props.children}



				 <Directions


         accessToken={MAPBOX_ACCESS_TOKEN}
					 origin={this.props.origin}

					destination={this.props.destination}



					 style={this.directionsStyle} />


					       </MapboxGL.MapView>


);
}

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  }

});
export default MapView;
