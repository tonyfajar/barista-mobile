
import React, { Component } from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation';
import Setting from './Setting';
import Account from './Account';
import Login from './Login';
import deviceStorage from './Services/deviceStorage'; 
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';


export default class DrawerNavigation extends Component{
	constructor(){
		super();
		this.state = {
			jwt: ''
		};
		
		this.deleteJWT = deviceStorage.deleteJWT.bind(this);
		this.loadJWT = deviceStorage.loadJWT.bind(this);
		this.loadJWT();
	}
	render(){
		console.log("=========== CustomDrawerContent ===========");
		//console.log(this);
		console.log(this.state);
		const Drawer = createDrawerNavigator();
		function CustomDrawerContent(props){
			return(
				<DrawerContentScrollView initialRouteName="Home" contentContainerStyle={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
					<SafeAreaView forceInset={{top:'always', horizontal:'never'}}>
						<DrawerItemList {...props}/>
					</SafeAreaView>
					<DrawerItem label="Logout" component={Setting} onPress={()=> props.logout(props)}/>
				</DrawerContentScrollView>
			)
			
		}
		if (!this.state.jwt) {
		  //console.log(this);
			return (
				<Drawer.Navigator>
					<Drawer.Screen name="Login" component={Login} />
				</Drawer.Navigator>
			);
		} else if (this.state.jwt) {
		  return (
			<Drawer.Navigator drawerContent={props=> <CustomDrawerContent logout={this.deleteJWT} {...props} />}>
				<Drawer.Screen name="Home" component={Navigation} />
			</Drawer.Navigator>
			);
		}
		
	}
}

/*

<DrawerContentScrollView initialRouteName="Home" contentContainerStyle={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
					<SafeAreaView forceInset={{top:'always', horizontal:'never'}}>
						<DrawerItemList {...props}/>
					</SafeAreaView>
					<DrawerItem label="Logout" component={Setting} onPress={()=> props.setState({jwt: ''})}/>
				</DrawerContentScrollView>
<Drawer.Navigator drawerContent={props=> <CustomDrawerContent{...props} />}>
			<Drawer.Screen name="Home" component={Navigation} />
			<Drawer.Screen name="Account" component={Account} />
		  </Drawer.Navigator>
*/