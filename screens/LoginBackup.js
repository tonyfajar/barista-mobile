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
      username: 'admin',
      password: 'admin12321',
      error: '',
      loading: false
    };
  }  
  render() {
    const { username, password, error, loading } = this.state;
	const { container, button, errorTextStyle } = styles;
	console.log('=========== LOGIN ===========');
	//console.log(this);
	console.log(this.props.navigation);
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