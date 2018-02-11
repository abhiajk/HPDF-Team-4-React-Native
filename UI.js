import React from 'react';

import { StyleSheet, Text, View, Dimensions,TextInput,FlatList} from 'react-native';

import {Container,Header, Card, CardItem,Title, Button,Drawer,InputGroup,Input,aBadge, Icon,Content,Left, Right,Footer,Fab,Spinner,FooterTab,Thumbnail,H3,H2,Body,Top,Bottom,Tabs,Tab,TabHeading,hasTabs} from 'native-base';
import MapView from './MapView';
const API_KEY = 'REPLACE WITH YOUR GOOGLE API KEY' ;
class UI extends React.Component {


constructor(props) {

 super(props);

 this.state = {

   origin:null,
   destination:null,
   startLoc:'',
   destinationLoc:'',
   data:'',
   time:'',
   footerColor:({
     backgroundColor:'transparent'
   })
 };
}

getDirection(startLoc,destinationLoc){

fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${startLoc}&destinations=${destinationLoc}&key=${API_KEY}`)
.then((result)=>result.json())
.then((res)=>{

      let distance=res.rows.map((row)=>{
          return row.elements.map((e)=>{
          return `${e.distance.text}`
          }).join('\n')
        }).join('\n')
        let duration=res.rows.map((row)=>{
            return row.elements.map((e)=>{
            return `${e.duration.text}`
            }).join('\n')
          }).join('\n')
          let color={
                backgroundColor:'white'
            }
			this.setState({
        data:'Distance between source and destination :'+`${distance}`,
				time:'Time of travel :'+`${duration}`,
				footerColor:color
		})
}	),

  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${startLoc}&key=${API_KEY}`)
  .then((result)=>result.json())
  .then((res)=>{
    let latitude = res.results[0].geometry.location.lat

    let longitude = res.results[0].geometry.location.lng

   this.setState({
    origin:[longitude,latitude],
    })

}	),
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${destinationLoc}&key=${API_KEY}`)
  .then((result)=>result.json())
  .then((res)=>{
    let latitude = res.results[0].geometry.location.lat

    let longitude = res.results[0].geometry.location.lng


    this.setState({
    destination:[longitude,latitude],

  })

}	)

}

render() {

let{startLoc, destinationLoc}=this.state;

return(

  <View>
 <View style={styles.map}>
    <MapView
    origin={this.state.origin}
    destination={this.state.destination}/>
  </View>
<View style={{height:Dimensions.get('window').height,justifyContent:'space-between'}}>

  <View style={{height:150,marginTop:20,backgroundColor:'white'}}>
				 <TextInput
			value={startLoc}
			placeholder='Enter Source'
				style={{height:50}}
			onChangeText={(startLoc)=> this.setState({startLoc})}></TextInput>



       <TextInput
			value={destinationLoc}
			placeholder='Enter destination'
			style={{height:50}}
			onChangeText={(destinationLoc)=> this.setState({destinationLoc})}></TextInput>
<Button success style={{width: Dimensions.get('window').width,justifyContent:'center'}} onPress={() =>this.getDirection(this.state.startLoc,this.state.destinationLoc)}>< Text style={{paddingTop:5,fontWeight:'bold'}}>Directions</Text></Button>


</View>
<View>
<Footer style={{backgroundColor:'transparent',height:80}}>

<FooterTab  style={this.state.footerColor}>
<View style={{flexDirection:'column',width:Dimensions.get('window').width}}>
<Text style={{color:'#2f4f4f'}}>{this.state.data}</Text>
<Text style={{color:'#2f4f4f'}}>{this.state.time}</Text>

</View>
	</FooterTab>

						</Footer>
</View>
      </View>

</View>
);
}
}

const styles = StyleSheet.create({

  map: {

    position: 'absolute',

    top: 0,

    left: 0,

    right: 0,

    bottom: 0,

    width: Dimensions.get('window').width,

    height: Dimensions.get('window').height

  },

});
export default UI;
