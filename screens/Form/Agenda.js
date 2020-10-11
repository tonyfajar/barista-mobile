import React, { Component, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, List, ListItem, InputGroup, Text, Textarea, Button } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker'
import axios from 'axios';
import deviceStorage from '../Services/deviceStorage'; 

import Icon from 'react-native-vector-icons/Ionicons';



export default class Agenda extends Component {
	constructor(props){
		super(props);
		var data = (this.props.action == 'Add') ? '' : this.props.route.params;
		console.log(data);
		this.state={
			showDate:false,
			showTime:false,
			id_agenda:this.props.action == 'Add' ? '' : data.id,
			judul_agenda: this.props.action == 'Add' ? '' : data.judul_agenda,
			kode_agenda:this.props.action == 'Add' ? '' : data.kode_agenda,
			lokasi:this.props.action == 'Add' ? '' : data.lokasi,
			tanggal_agenda:this.props.action == 'Add' ? '' : data.tanggal_agenda,
			waktu_agenda:this.props.action == 'Add' ? '' : data.waktu_agenda,
			action : '',
			error: '',
		}
		//this.handler = this.handler.bind(this);
		this.loadJWT = deviceStorage.loadJWT.bind(this);
		this.onValidation = this.onValidation.bind(this);
		this.loadJWT();

	};
	
	
	handler =(action)=>{
		console.log(this.props.screenProps);
		const { kode_agenda, judul_agenda,tanggal_agenda, waktu_agenda, lokasi, id_agenda } = this.state;
		if(kode_agenda == ''){
			this.onValidation('Kode');
			return;
		}
		if(judul_agenda == ''){
			this.onValidation('Judul');
			return;
		}
		if(tanggal_agenda == ''){
			this.onValidation('Tanggal');
			return;
		}
		if(waktu_agenda == ''){
			this.onValidation('Waktu');
			return;
		}
		if(lokasi == ''){
			this.onValidation('Lokasi');
			return;
		}
		if(action !== ''){
			var formdata=new FormData();
			console.log(tanggal_agenda);
			formdata.append("proc",action);
			formdata.append("kode_agenda",kode_agenda);
			formdata.append("judul_agenda",judul_agenda);
			formdata.append("waktu_agenda",tanggal_agenda+' '+waktu_agenda);
			formdata.append("lokasi_detail",lokasi);
			formdata.append("foto",'');
			formdata.append("id",id_agenda);
			console.log(formdata);
			var config = {
			  method: 'post',
			  //url: 'http://192.168.43.110:8080/barista/API/agenda',
			  url: 'http://barista.kurniateknologi.co.id/API/agenda',
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
				if(this.props.route.params.id != ''){
					
				}else{
					this.props.backToCalendar();
				}
			})
			.catch((error) => {
				console.log("=========== SAVE ERROR ===========");
				console.log(error)
			});
		}
	};
	
	onValidation(params) {
		this.setState({
		  error: params+' Tidak Bisa Kosong',
		});
	}
	
	
	render() {
		const { judul_agenda, kode_agenda, error, loading, tanggal_agenda, waktu_agenda, timeUnique, lokasi } = this.state;
		const { container, button, errorTextStyle,formInput, buttonRow1,buttonRow2, buttonRow, buttonStly } = styles;
	  //if(typeof(data) !== 'undefined'){
		//this.setState({
		//	t_judul_agenda : data.judul_agenda
		//})
	  //}
	  console.log("=========== Agenda ===========");
	  console.log(this.props.screenProps)
	  return (	
		<View style={container}>
		  <Container >
		    <Content >
			  <View style={formInput}>
				 <Form>
					<Item rounded style={{marginTop:20, marginRight:20,marginLeft:20}}>
					  <Input placeholder="Nama Agenda" value={judul_agenda} onChangeText={(judul_agenda) => this.setState({judul_agenda})} />
					</Item>
					<Item inlineLabel style={{marginTop:20, marginRight:20,marginLeft:20}}>
					  <Label>Kode Agenda</Label>
					  <Input placeholder="A-001" value={kode_agenda} onChangeText={(kode_agenda) => this.setState({kode_agenda})} />
					</Item>
					<Item onPress={(showDate) => this.setState({showDate: true})} inlineLabel style={{marginTop:20, marginRight:20,marginLeft:20}}>
					  <Icon name="calendar" style={{color:'#0491ac', fontSize:30, paddingRight:10}} />
					  <Input value={tanggal_agenda} disabled/>
					  {this.state.showDate && <DateTimePicker value={tanggal_agenda == '' ? Date.now() : new Date(Date.parse(tanggal_agenda))} mode={'date'} onChange={(event, value) => this.setState({tanggal_agenda: new Date(value).getFullYear()+'-'+(("0" + (new Date(value).getMonth() + 1)).slice(-2))+'-'+(("0" + (new Date(value).getDate())).slice(-2)), showDate:false }) }/>}
					</Item>
					<Item onPress={(showTime) => this.setState({showTime: true})} inlineLabel style={{marginTop:20, marginRight:20,marginLeft:20}}>
					  <Icon name="alarm" style={{color:'#0491ac', fontSize:30, paddingRight:10}} />
					  <Input value={waktu_agenda} disabled/>
					  {this.state.showTime && <DateTimePicker value={waktu_agenda == '' ? Date.now() : new Date().setTime(timeUnique)} mode={'time'} onChange={(event, value) => this.setState({waktu_agenda: new Date(value).getHours()+':'+(new Date(value).getMinutes() < 10 ? '0': '')+new Date(value).getMinutes()+':00', showTime:false, timeUnique:value }) }/>}
					</Item>
					<Item inlineLabel style={{marginTop:20, marginRight:20,marginLeft:20}}>
					  <Icon name="location" style={{color:'#0491ac', fontSize:30, paddingRight:10}} />
					  <Textarea placeholder="Lokasi" value={lokasi} onChangeText={(lokasi) => this.setState({lokasi})} />
					</Item>
				  </Form>
				  <Text style={errorTextStyle}>
					{error}
				  </Text>
			  </View>

			  {this.props.action == 'Add' ? 
			  <View style={buttonRow2}>
				<Button iconLefteft style={buttonStly} onPress={()=>this.handler('insert')} transparent >
				  <Icon name='checkmark-outline' style={{fontSize:40, color:'#0491ac'}}/>
				</Button>
			  </View>
			  :
			  <View style={buttonRow2}>
				<Button iconLefteft bordered style={buttonStly} onPress={()=>this.handler('update')} transparent >
					<Icon name='create-outline' style={{fontSize:40, color:'#0491ac'}}/>
				</Button>
				<Button iconLefteft bordered style={buttonStly} onPress={()=>this.handler('delete')} transparent >
					<Icon name='trash' style={{fontSize:40, color:'#0491ac'}}/>
				  </Button>
			  </View>
			  }
			  
			</Content>
		  </Container>
		</View>
		
	  );
	}
	formTrigger(action){
		this.props.navigation.navigate(action,{ id_agenda: this.state.id_agenda })
		
	}
}

const styles = StyleSheet.create({	
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  },
  container:{
	 
	flex:1,
  },
  formInput:{
	flex: 1, 
	justifyContent: 'center', 
  },
  buttonRow:{
	marginTop:'40%',
	flexDirection: "column",
	alignSelf: 'center',
  },
  buttonRow1:{
	justifyContent: 'center', 
	flexDirection: "row"
  },
  buttonRow2:{
	justifyContent: 'center', 
	flexDirection: "row"
  },
  buttonStly:{
	//backgroundColor:'#FFFFFF',   
	borderRadius: 10, 
	margin:5,
	borderColor:'#0491ac',
  }
});