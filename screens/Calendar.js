import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import {ExpandableCalendar,CalendarList,Agenda,CalendarProvider} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import deviceStorage from './Services/deviceStorage'; 
import {Fab, Button } from 'native-base';

var { height } = Dimensions.get('window');
var box_count = 2;
var box_height = height / box_count;
export default class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
	  agenda:'',
	  listAgenda: [],
	  marked:undefined,
	  loading: false,
	  action: ''
    };
	this.onClickAgendaDetails = this.onClickAgendaDetails.bind(this)
	this.loadJWT = deviceStorage.loadJWT.bind(this);
	this.deleteJWT = deviceStorage.deleteJWT.bind(this);
	this.loadJWT();
  }
  
	componentDidMount=()=>{
		
		this.props.navigation.addListener(
			'focus',
			() =>{
				console.log("=========== FOCUS ===========");
				var today = new Date();
				var date = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+(("0" + (today.getDate())).slice(-2));
				console.log([{dateString:date}]);
				this.onVisibleMonthsChangeFunc([{dateString:date}]);
			}
		);
	}
  
  onClickAgendaDetails(p){
	  console.log("=========== ON CLICK AGENDA ===========");
	  //console.log(p)
	  var params = p[1]
	  var data={
		  kode_agenda : params.kode_agenda,
		  judul_agenda : params.name,
		  waktu_agenda : params.time,
		  tanggal_agenda : params.tanggal_agenda,
		  lokasi : params.lokasi_detail,
		  id : params.id_agenda,
		  jwt: this.state.jwt,
	  }
	  console.log(data)
	  this.props.navigation.navigate('Agenda',{ data })
  }
  
  onVisibleMonthsChangeFunc(date) {
	console.log("=========== ON VISIBLE MONTH ===========");
	console.log(date[0].dateString);
	console.log(date);
	console.log(typeof(date));
	var dateNow = new Date(date[0].dateString);
	console.log(dateNow);
	var firstDayTime =  new Date(dateNow.getFullYear(), dateNow.getMonth(), 1); 
	var firstDay = firstDayTime.getFullYear()+'-'+(firstDayTime.getMonth()+1)+'-'+firstDayTime.getDate();
    var lastDayTime =  new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0); 
	var lastDay = lastDayTime.getFullYear()+'-'+(lastDayTime.getMonth()+1)+'-'+lastDayTime.getDate();
	//console.log(String(firstDay. getDate()))
	var params ='first_date='+firstDay+'&second_date='+lastDay;
	console.log(params);
	var config = {
	  method: 'get',
	  url: 'http://barista.kurniateknologi.co.id/API/agenda?'+params,
	  //url: 'http://192.168.43.110:8080/barista/API/agenda?'+params,
	  headers: { 
		'X-API-KEY': 'BARISTA-KEY', 
		'Authorization': this.state.jwt
	  },
	};
 
 // NOTE Post to HTTPS only in production
    axios(config)
    .then((response) => {
		console.log("=========== ON VISIBLE MONTH [SUCCESS]===========");
		console.log(response.status);
		const container = {}
		response.data.agenda.map(date =>{
			var tanggal = new Date(date.waktu_agenda.split(' ')[0]);
			tanggal = tanggal.getFullYear()+'-'+(("0" + (tanggal.getMonth() + 1)).slice(-2))+'-'+(("0" + (tanggal.getDate())).slice(-2));
			tanggal = tanggal.toString("YYYY-mm-dd");
			var inner = {marked: true};
			container[tanggal]=inner;
		})
		this.setState({
			items:container
		});
    })
    .catch((error) => {
		console.log("=========== ON VISIBLE MONTH [ERROR]===========");
		if(error.response.status == 401 && error.response.data.message == 'Expired token'){
			this.deleteJWT();
		}
    });
  }

  render() {
	if(this.state.agenda){
		console.log(this.state.agenda);
	}else{
		console.log(this.state.agenda)
	}
    return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<View style={styles.container}>
				<View style={[styles.box1]}>
				<CalendarList
					items={this.state.items}
					horizontal
					pagingEnabled
					onMonthChange={(month) => {console.log('month changed', month)}}
					markedDates={this.state.items}
					current={(month) => {console.log('month changed', month)}}
					onVisibleMonthsChange={this.onVisibleMonthsChangeFunc.bind(this)}
					onDayPress={
						this.loadDayAgenda.bind(this)
					}
					//loadItemsForMonth={this.loadItems.bind(this)}
					//selected={Date.now()}
					//renderItem={this.renderItem.bind(this)}
					//renderEmptyDate={this.renderEmptyDate.bind(this)}
					//rowHasChanged={this.rowHasChanged.bind(this)}
					
				  />
				</View>
				<View style={[styles.box2]}>
				{this.state.agenda ?
						Object.entries(this.state.agenda).map((v,index)=>{
							console.log(v);
							return <TouchableOpacity key={v[0]}><View style={styles.notes}  onStartShouldSetResponder={() => this.onClickAgendaDetails(v)}><View style={styles.notes_notes}><Text style={styles.notes_text}>{v[1].name}.</Text></View><View style={[styles.notes_selected_date]}><Text style={styles.small_text}>{v[1].time}</Text></View></View></TouchableOpacity>
						})
						 :
							<View style={styles.notes}>
								<View style={styles.notes_notes}>
									<Text style={styles.emptyAgenda}>Tidak Ada Agenda</Text>
								</View>
							</View>
						
					  }
				</View>
				<Fab
					active={this.state.active}
					direction="up"
					containerStyle={{ }}
					style={{ backgroundColor: '#0491ac' }}
					position="bottomRight"
					onPress={() => this.formTrigger('Agenda')}>
					<Icon name="plus" />
				  </Fab>
			</View>
		</View>
    );
  }
	formTrigger(Nav){
		console.log(Nav)
		var data={
			action:'Add'
	    }
	    console.log(data)
	    this.props.navigation.navigate(Nav,{ data })
		//this.props.navigation.navigate(action,{ action })
		
	}
	
	loadDayAgenda(day){
		console.log("=========== Load Day Agenda ===========");
		console.log(day);
		console.log(this.state)
		var firstDay = day.dateString;
		var params ='first_date='+firstDay;
		var config = {
		  method: 'get',
		  url: 'http://barista.kurniateknologi.co.id/API/agenda?'+params,
		  //url: 'http://192.168.43.110:8080/barista/API/agenda?'+params,
		  headers: { 
			'X-API-KEY': 'BARISTA-KEY', 
			'Authorization': this.state.jwt
		  },
		};
	 
	 // NOTE Post to HTTPS only in production
		axios(config)
		.then((response) => {
			var container = {}
			response.data.agenda.map((data,index) =>{
				var date = new Date(data.waktu_agenda.split(' ')[0]);
				var time = data.waktu_agenda.split(' ')[1];
				date = date.getFullYear()+'-'+(("0" + (date.getMonth() + 1)).slice(-2))+'-'+(("0" + (date.getDate())).slice(-2));
				date = date.toString("YYYY-mm-dd");
				var inner = {name: data.judul_agenda, time:time, id_agenda: data.id_agenda,kode_agenda : data.kode_agenda,lokasi_detail:data.lokasi_detail, tanggal_agenda : date}
				container[index] = inner;
			})
			if(response.data.agenda.length > 0){
				this.setState({
					agenda:container
				});
			}else{
				this.setState({
					agenda:''
				});
			}
			
		})
		.catch((error) => {
			console.log(error);
			if(error.response.status == 401){
				this.deleteJWT();
			}
		});
	}
}

const styles = StyleSheet.create({
  conainer:{
    flex: 1,
    flexDirection: "column",
  },
  box: {
	flex:1,
	marginTop:0,  
    height: box_height
  },
  box1: {
    //flex:2,
	marginTop:0,  
    height: '55%'
  },
  box2: {
    flex:1,
	marginTop:0,  
    //height: '40%'
  },
  
  item: {
    //backgroundColor: 'white',
    //flex: 1,
    //borderRadius: 5,
    //padding: 10,
    //marginRight: 10,
    //marginTop: 17
  },
  emptyDate: {
    height: 15,
    //flex:1,
    paddingTop: 30
  },
  notes: {
    margin: 20,
	borderRadius: 10,
    padding: 20,
    borderColor: '#F5F5F5',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#FAFAFA'
},
	notes_notes: {
		flex: 3
	},
	notes_text: {
		fontSize: 18
	},
	notes_selected_date: {
		flex: 1,
		alignItems: 'flex-end',
		flexDirection: 'column'
	},
	small_text: {
		fontSize: 15
	},
	big_text: {
		fontSize: 50,
		fontWeight: 'bold'
	},
	inline: {
	   flexDirection: 'row'
	},
	emptyAgenda:{
		fontSize: 18,
		alignSelf: "center",
	}
});