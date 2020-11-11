import React, {Component} from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {Container, Header, Content,Fab, Button, List, ListItem, Thumbnail, Text, Left, Body, Right, ListView  } from 'native-base';
import Autocomplete from 'native-base-autocomplete';
import Icon from 'react-native-vector-icons/Ionicons';
import deviceStorage from '../Services/deviceStorage'; 
import axios from 'axios';

export default class Peserta extends Component {
	constructor(props){
		super(props);
		this.state={
			data:'',
			id_peserta:'',
			items:[],
			id_delete:'',
			id_agenda: this.props.route.params.id,
			jwt:this.props.route.params.jwt,
			peserta:this.props.route.name,
			peserta_api:this.props.route.name.toLowerCase(),
		};
	}
	
	componentDidMount=()=>{
		console.log("=========== MOUNT ===========");
		console.log(this.props.route.name)
		this.getPeserta();
	}
	
	getPeserta=()=>{
		console.log("=========== GET PESERTA ===========");
		console.log('http://barista.kurniateknologi.co.id/barista/API/'+this.state.peserta.toLowerCase()+'?id_agenda='+this.state.id_agenda);
		var config = {
		  method: 'get',
		  //url: 'http://barista.kurniateknologi.co.id/API/id_agenda?'+this.state.id_agenda,
		  url: 'http://barista.kurniateknologi.co.id/API/'+this.state.peserta.toLowerCase()+'?id_agenda='+this.state.id_agenda,
		  headers: { 
			'X-API-KEY': 'BARISTA-KEY', 
			'Authorization': this.state.jwt
		  },
		};
		axios(config)
		.then((response) => {
			console.log("=========== GET PESERTA [SUCCESS]===========");
			//console.log(response.data.data);
			const container = [];
			if(this.state.peserta == 'Direksi'){
				response.data.data.map(data =>{
					console.log(data);
					var dataObjt = {
						key: data.nama_direksi,
						phone: data.kontak,
						id:data.id_direksi_agenda,
					}
					container.push(dataObjt)
				})
			}else{
				response.data.data.map(data =>{
					var dataObjt = {
						key: data.nama_protokol,
						phone: data.kontak,
						id:data.id_protokol_agenda,
					}
					container.push(dataObjt)
				})
			}
			console.log(container)
			this.setState({
				items:container
			});
		})
		.catch((error) => {
			console.log("=========== GET PESERTA [ERROR]===========");
			console.log(error);

		});
    }
	
	buttonHapus = (id)=>{
		console.log("=========== BUTTON HAPUS ===========");
		console.log(id);
		this.setState({
			id_delete: id,
		});
		console.log(this.state);
		this.handler('delete');
	}
	
	handler =(action)=>{
		console.log("=========== HANDLER ===========");
		console.log(this.props.route.params);
		const { id_peserta } = this.state;
		if(id_peserta == '' && action == 'insert'){
			this.onValidation('Nama '+this.state.peserta);
			return;
		}
		this.setState({
		  error: '',
		});
		
		var formdata=new FormData();
		formdata.append("proc",action);
		if(action == 'insert'){
			if(this.state.peserta == 'Direksi'){
				formdata.append("id_direksi",id_peserta);
				formdata.append("id_agenda",this.props.route.params.id);
			}else{
				formdata.append("id_protokol",id_peserta);
				formdata.append("id_agenda",this.props.route.params.id);
			}
		}else{
			formdata.append("id",this.state.id_delete);
		}
		console.log(formdata);
		var config = {
		  method: 'post',
		  //url: 'http://192.168.43.110:8080/barista/API/agenda_'+this.state.peserta_api,
		  url: 'http://barista.kurniateknologi.co.id/API/agenda_'+this.state.peserta_api,
		  headers: { 
			'X-API-KEY': 'BARISTA-KEY', 
			'Content-Type': 'application/x-www-form-urlencoded', 
			'Authorization': this.state.jwt
		  },
			  data : formdata
		};
		 
		// NOTE Post to HTTPS only in production
		axios(config)
		.then((response) => {
			console.log("=========== SAVE SUCCESS ===========");
			console.log(response.data);
			this.getPeserta();
		})
		.catch((error) => {
			console.log("=========== SAVE ERROR ===========");
			console.log(error)
		});
	}
	
	onValidation(params) {
		this.setState({
		  error: params+' Tidak Bisa Kosong',
		});
	}
	
	onFilterChange=(key)=> {
		console.log("=========== ON Filter Change ===========");
		console.log(this.state);
		var config = {
		  method: 'get',
		  //url: 'http://192.168.43.110:8080/barista/API/'+this.state.peserta_api+'?id_agenda=&nama='+key,
		  url: 'http://barista.kurniateknologi.co.id/API/'+this.state.peserta_api+'?id_agenda=&nama='+key,
		  headers: { 
			'X-API-KEY': 'BARISTA-KEY', 
			'Authorization': this.state.jwt
		  },
		};
	 
	 // NOTE Post to HTTPS only in production
		axios(config)
		.then((response) => {
			console.log("=========== ON Filter Change [SUCCESS]===========");
			var container = [];
			console.log(response);
			response.data.data.map(data =>{
				console.log(data);
				var inner = [];
				if(this.state.peserta == 'Direksi'){
					inner.push(data.id_direksi)
					inner.push(data.nama_direksi)
				}else{
					inner.push(data.id_protokol)
					inner.push(data.nama_protokol)
				}
				container.push(inner);
			})
			this.setState({
				pesertaFilter : container
			});
			console.log(this.state.pesertaFilter)
		})
		.catch((error) => {
			console.log("=========== ON Filter Change [ERROR]===========");
			console.log(error);

		});
	}
	render() {
      //console.log(this.props.route.params.data)
	  //console.log("=========== PESERTA ===========");
	  //console.log(this.state.jwt)
	  const { container, formInput, gridColumn, AutocompleteStyle, buttonStyle,buttonRow,errorTextStyle  } = styles;
	  return (
		<View style={gridColumn}>
		  <Container>
			  <View style={formInput}>
			    <Text>Pilih {this.state.peserta}</Text>
				<Autocomplete
					data={this.state.pesertaFilter}
					onChangeText={
						(param)=> {
							this.onFilterChange(param)
						}
					}
					defaultValue={this.state.nama_peserta}
					style={AutocompleteStyle}
					renderItem={peserta => (
						<TouchableOpacity
							style={{
								height:44,
								flex:1,
								justifyContent:'center',
								...styles.label,
								paddingLeft:10,
								borderRadius:8,
								margin:10,
							}}
							onPress={() => {
								console.log(peserta)
								this.setState({
									id_peserta:peserta[0],
									nama_peserta:peserta[1],
									pesertaFilter:[],
								})
							}}
						>
						<Text numberOfLines
						={1}>{peserta[1]}</Text>
						</TouchableOpacity>
					)}
				/>
				<Text style={errorTextStyle}>
					{this.state.error}
				  </Text>
			  </View>
			  <View style={buttonRow}>
				<Button iconLefteft style={buttonStyle} onPress={()=>this.handler('insert')} transparent >
				  <Icon name='person-add-outline' style={{fontSize:40, color:'#0491ac'}}/>
				</Button>
			  </View>
			  <View style={{ flex: 1}}>
				<List dataArray={this.state.items}
					 renderItem={({item}) =>
						<ListItem thumbnail>
						  <Left>
							<Thumbnail square source={require('../../src/images/no-image.png')} />
						  </Left>
						  <Body>
							<Text>{item.key}</Text>
							<Text note numberOfLines={1}>{item.phone}</Text>
						  </Body>
						  <Right>
							<Button style={{backgroundColor:'#0491ac'}} onPress={()=>this.buttonHapus(item.id)}>
							  <Text>Hapus</Text>
							</Button>
						  </Right>
						</ListItem>
					 }
				>    
                </List>
			  </View>
		  </Container>
		</View>
	  );
	}
	
}
const styles = StyleSheet.create({	
  filterDireksi: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  },
  container:{
	flex:1,
	margin:10,
  },
  formInput:{
	height:'20%', 
	justifyContent: 'center', 
	
	//backgroundColor:'blue',
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  },
  gridColumn:{
	flex:1,
	flexDirection: "column",
  },
  AutocompleteStyle:{
	//height:44,
	borderRadius:8,
	backgroundColor:'#FFFFFF',
	alignSelf:'stretch',
	//paddingLeft:10,
	margin:10,
	borderWidth:1,
	position:'relative',
  },
  buttonRow:{
	justifyContent: 'center', 
	flexDirection: "row",
	height:'10%', 
	//backgroundColor:'red',
  },
  buttonStyle:{
	//backgroundColor:'#FFFFFF',   
	borderRadius: 10, 
	borderColor:'#0491ac',
  },
});


 /*<ListItem thumbnail>
					  <Left>
						<Thumbnail square source={require('../../src/images/no-image.png')} />
					  </Left>
					  <Body>
						<Text>Sankhadeep</Text>
						<Text note numberOfLines={1}>Its time to build a difference . .</Text>
					  </Body>
					  <Right>
						<Button transparent>
						  <Text>View</Text>
						</Button>
					  </Right>
                    </ListItem>*/