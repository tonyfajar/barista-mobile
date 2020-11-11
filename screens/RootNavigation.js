import * as React from 'react';
import { Button, View ,ActivityIndicator} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './DrawerNavigation';
import Setting from './Setting';
import Account from './Account';
import Login from './Login';
import deviceStorage from './Services/deviceStorage'; 

export default class RootNavigation extends React.Component {
	constructor(){
		super();
		this.state = {
			jwt: '',
			loading: false
		};
		this.newJWT = this.newJWT.bind(this);
		this.deleteJWT = deviceStorage.deleteJWT.bind(this);
		this.loadJWT = deviceStorage.loadJWT.bind(this);
		this.loadJWT();
	}
	newJWT(jwt){
		this.setState({
			jwt: jwt
		})
	}
	render() {
		const RootNavigationStack = createDrawerNavigator();
		console.log('=========== ROOT NAVIGATION ===========');
		return (
			<NavigationContainer>
				<RootNavigationStack.Navigator>
					<RootNavigationStack.Screen name="Login" component={Login}/>
					<RootNavigationStack.Screen name="Calendar" component={DrawerNavigation} />
				</RootNavigationStack.Navigator>
			</NavigationContainer>
		);
	}
}
//{!this.state.jwt ? (
					//<RootNavigationStack.Screen name="Login" component={Login}/>
					//):(
					//<RootNavigationStack.Screen name="Calendar" component={DrawerNavigation} />
				//)}