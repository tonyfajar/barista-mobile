import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, createAppContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Form from './Form/Agenda';
import Peserta from './Form/Peserta';
import deviceStorage from './Services/deviceStorage'; 


export default class AgendaNavigation extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.loadJWT = deviceStorage.loadJWT.bind(this);
		this.loadJWT();
    }
	render() {
	  console.log("=========== AgendaNavigation ===========");
	  const Tab = createMaterialTopTabNavigator();
	  if(this.props.route.params.data.action == 'Add'){
		  return (
			  <Form action={'Add'} backToCalendar={()=>this.props.navigation.navigate('Calendar')}/>
		  );
	  }else if(!this.state.role == 'ADMINROOT'){
		return (
			<Tab.Navigator>
				<Tab.Screen name="Details" component={Form} initialParams={this.props.route.params.data}/>
			</Tab.Navigator>
		);
	  }else{
		return (
			<Tab.Navigator>
				<Tab.Screen name="Details" component={Form} initialParams={this.props.route.params.data}/>
				<Tab.Screen name="Direksi" component={Peserta} initialParams={this.props.route.params.data}/>
				<Tab.Screen name="Protokol" component={Peserta} initialParams={this.props.route.params.data}/>
			</Tab.Navigator>
		);
	  }
	}
}
			 // <Tab.Screen name="Direksi" component={Peserta} data={this.props.route.params.data}/>
