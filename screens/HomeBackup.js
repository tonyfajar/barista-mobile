import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {  Button } from 'native-base';

import Calender from './Calender';
import Details from './Form/Agenda';
import Peserta from './Form/Peserta';
import AgendaNavigation from './AgendaNavigation';

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
	
	render() {
		const Stack = createStackNavigator();
		console.log("=========== HOME ===========");
		return (
		<NavigationContainer independent={true} >
		  <Stack.Navigator initialRouteName="Calendar">
			<Stack.Screen name="Agenda" component={Calender} />
			<Stack.Screen name="Details" options={{ headerTitle: 'Ubah Agenda'}} component={AgendaNavigation} />
			<Stack.Screen name="Add" options={{ headerTitle: 'Tambah Agenda'}} component={Details}/>
			<Stack.Screen name="Direksi" options={{ headerTitle: 'Direksi'}} component={Peserta}/>
			<Stack.Screen name="Protokol" options={{ headerTitle: 'Protokol'}} component={Peserta}/>
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