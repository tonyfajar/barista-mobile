import React, { Component, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Text, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import { Loading } from './common/Loading';

import axios from 'axios';
import deviceStorage from './Services/deviceStorage'; 

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: 'DIRDAN1',
      password: '123456',
      error: '',
      loading: false
    };

    this.loginUser = this.loginUser.bind(this);
	this.onLoginFail = this.onLoginFail.bind(this);
  }

  loginUser() {
	console.log(this.props.navigation);
    const { username, password } = this.state;
    this.setState({ error: '', loading: true });
	
	var formdata=new FormData();
    formdata.append("username",username);
	formdata.append("password",password);
	console.log(formdata);
	var config = {
	  method: 'post',
	  url: 'http://barista.kurniateknologi.co.id/API/login',
	  //url: 'http://192.168.43.110:8080/barista/API/login',
	  headers: { 
		'X-API-KEY': 'BARISTA-KEY', 
		'Content-Type': 'application/x-www-form-urlencoded', 
	  },
	  data : formdata
	};
 
 // NOTE Post to HTTPS only in production
    axios(config)
    .then((response) => {
	  console.log("=========== LOGIN ===========");
      deviceStorage.saveKey("id_token", response.data.token);
	  deviceStorage.saveKey("role", response.data.data.role);
	  deviceStorage.saveKey("id_user", response.data.data.id);
	  console.log(this.props.navigation.navigate('Calendar'));
    })
    .catch((error) => {
		console.log("=========== LOGIN ERROR ===========");
		console.log(error)
	  this.onLoginFail(error);
    });
  }
  
  onLoginFail(error) {
    this.setState({
      error: error,
      loading: false
    });
  }
  
  render() {
    const { username, password, error, loading } = this.state;
	const { container, button, errorTextStyle } = styles;
	console.log("=========== LOGIN ===========");
	return (
		<Container >
			<Header />
			<Content contentContainerStyle={{flex: 1}} >
			  <Form style={container}>
				<Item floatingLabel>
				  <Label>Username</Label>
				  <Input 
				  onChangeText={(username) => this.setState({username})}
					value={this.state.username}/>
				</Item>
				<Item floatingLabel last>
				  <Label>Password</Label>
				  <Input secureTextEntry onChangeText={(password) => this.setState({password})}
					value={this.state.password}/>
				</Item>
				<Text style={errorTextStyle}>
					{error}
				  </Text>
				{!loading ?
					<Button block primary style={ button} onPress={this.loginUser}>
						<Text>Login</Text>
					</Button>
					 :
					<Loading size={'large'} />
				  }
				
			  </Form>
			</Content>
		  </Container>
    );
  }
}

const styles = StyleSheet.create({	
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  button:{
	marginTop:'10%',
	marginLeft:'20%',
	marginRight:'20%',
	borderRadius: 10,
	backgroundColor:'#0491ac',
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
});