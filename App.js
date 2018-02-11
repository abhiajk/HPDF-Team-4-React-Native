import React, { Component } from 'react';
import RNNode from 'react-native-node';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput
} from 'react-native';
import {Container,Header, Card, CardItem,Title, Button,Drawer,InputGroup,Input,aBadge, Icon,Content,Left, Right,Footer,Fab,Spinner,FooterTab,Thumbnail,H3,H2,Body,Top,Bottom,Tabs,Tab,TabHeading,hasTabs} from 'native-base';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import MapboxClient from 'mapbox';
import UI from './UI';
import Directions from './Directions';
import Mapbox from '@mapbox/react-native-mapbox-gl';




export default class App extends Component<{}> {

	render(){

		return(

    <UI />
		);
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
