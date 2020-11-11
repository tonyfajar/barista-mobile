import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AgendaNavigation from './AgendaNavigation';
import Calendar from './Calendar';



export default class Navigation extends Component {
	constructor(props){
		super(props);
		this.state = {
			menu:''
		}
	}
	render() {
		const Stack = createStackNavigator();
		console.log("=========== Navigation ===========");
		return (
			  <Stack.Navigator>
			    <Stack.Screen name="Calendar" component={Calendar} />
			    <Stack.Screen name="Agenda" component={AgendaNavigation} />
			  </Stack.Navigator>
		);
	};
}