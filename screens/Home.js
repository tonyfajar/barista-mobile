import React, {Component} from 'react';
import { Button,View, Text, StyleSheet } from 'react-native';
import { NavigationContainer,createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//import {  Button } from 'native-base';

//import Calendar from './Calendar';
//import Details from './Form/Agenda';
//import Peserta from './Form/Peserta';
//import AgendaNavigation from './AgendaNavigation';

export default class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			proc:'',
			judul_agenda :'',
			kode_agenda : '',
			tanggal_agenda:'',
			waktu_agenda:'',
			lokas:'',
			foto:''
		};	
	}
	
	HomeScreen({ navigation }) {
	  return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		  <Button
			title="Go to Profile"
			onPress={() => navigation.navigate('Profile')}
		  />
		</View>
	  );
	}
	ProfileScreen({ navigation }) {
		Tab1 =()=> {
	  return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>1</Text>
		</View>
	  );
	}
	Tab2=()=>{
	  return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>2</Text>
		</View>
	  );
	}
	const Tab = createMaterialTopTabNavigator();


	/*	console.log(this)
	  const AppNavigator = createMaterialTopTabNavigator({
			Home:this.Tab1,
			Tab2:this.Tab2,
		})
	  const AppIndex = createAppContainer(AppNavigator)*/
	  return (	
		 <Tab.Navigator>
		  <Tab.Screen name="Home" component={this.Tab1} />
		  <Tab.Screen name="Settings" component={this.Tab2} />
		</Tab.Navigator>
	  );
	}
	
	NotificationsScreen({ navigation }) {
	  return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		  <Button
			title="Go to Settings"
			onPress={() => navigation.navigate('Settings')}
		  />
		  <Button title="Go back" onPress={() => navigation.goBack()} />
		</View>
	  );
	}
	SettingsScreen({ navigation }) {
	  return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		  <Button title="Go back" onPress={() => navigation.goBack()} />
		</View>
	  );
	}
	render() {
		const Stack = createStackNavigator();
		console.log("=========== HOME ===========");
		return (
			<NavigationContainer>
			  <Stack.Navigator>
			    <Stack.Screen name="Home" component={this.HomeScreen} />
			    <Stack.Screen name="Notifications" component={this.NotificationsScreen} />
			    <Stack.Screen name="Profile" component={this.ProfileScreen} />
			    <Stack.Screen name="Settings" component={this.SettingsScreen} />
			  </Stack.Navigator>
			</NavigationContainer>
		);
	}
}

const styles = StyleSheet.create({
	RigtHeader:{
		fontSize:30,
		marginRight: 10
	},
});