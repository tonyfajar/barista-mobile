import AsyncStorage from '@react-native-community/async-storage';
import Login from '../../screens/Login';
import React from 'react';


const deviceStorage = {
  async saveKey(key, valueToSave) {
    try {
      await AsyncStorage.setItem(key, valueToSave);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async loadJWT() {
    try {
      console.log('LOAD TOKEN')
      const jwt = await AsyncStorage.getItem('id_token');
	  const user = await AsyncStorage.getItem('id_user');
	  const role = await AsyncStorage.getItem('role');
      if (jwt !== null) {
        this.setState({
         jwt: jwt,
		 user: user,
		 role:role,
         loading: false
        });
      } else {
        this.setState({
          loading: false
        });
      }
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
	//console.log(this.state.jwt)
  },

  async deleteJWT(navigation) {
	console.log('DELETE')
	navigation.navigation.closeDrawer();
    try{
      await AsyncStorage.removeItem('id_token')
      .then(
        () => {
          this.setState({
            jwt: ''
          })
        }
      );
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
};

export default deviceStorage;