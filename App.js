import React from 'react';
import { Text, View, ActivityIndicator  } from 'react-native';
import Navigation from './screens/Navigation';
import DrawerNavigation from './screens/DrawerNavigation';
import RootNavigation from './screens/RootNavigation';

import Login from './screens/Login';
import deviceStorage from './screens/Services/deviceStorage'; 
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class App extends React.Component {
	
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

	render(){
		/*if(this.state.loading){
		  return (
			<View>
			  <ActivityIndicator size="large" color="#0000ff"/>
			</View>
		   );
		} else if (!this.state.jwt) {
		  return (
			<Login newJWT={this.newJWT} />
		  );
		} else if (this.state.jwt) {
		  return (
			<DrawerNavigation jwt={this.state.jwt} deleteJWT={this.deleteJWT} />
		  );
		}*/

		return(
			<RootNavigation />
		);
	}
	
}
const styles = {
  spinnerContainer: {
    flex: 1,
    justifyContent: "center"
  }
};