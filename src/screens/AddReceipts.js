import React, { Component } from 'react';
import { NativeModules } from "react-native";
import { HStack  } from "@react-native-material/core";
import { Wrap } from 'react-native-flex-layout';
import { TextInput, Text, Button } from 'react-native-paper';
import { Calendar  } from 'react-native-calendars';
import { StyleSheet,  View, TouchableHighlight } from 'react-native';
import { endAt } from 'firebase/firestore/lite';


let _date = new Date(Date.now()); 
let _month = _date.getMonth() + 1;
_month = _month < 10 ? `0${_month}`: _month;
let _day = _date.getDate() < 10 ? `0${ _date.getDate()}` : _date.getDate();
let minDate =`${_date.getFullYear()}-${_month}-${_day}`;

class AddReceipts extends Component {
    
    state  = {
        customerName: '',
        details: '',
        invoiceAmount: '',
        invoiceDate: '',
        markedDates: '',
        minDate: minDate
    }; 

//     componentDidMount(){
//         let dat = new Date(Date.now()); 
//   // console.log(dat.getDate(), dat.getMonth() + 1, dat.getFullYear()); {'2023-01-01'}
//         let minDate = dat.getFullYear() + '-' + dat.getMonth() + 1 + '-08' //+ dat.getDate();
//         console.log(minDate)
//             this.setState  = {
//                 invoiceDate: '',
//                 markedDates: '',
//                 minDate: '2023-01-01'//minDate
//             }; 
//     }

    handleChange = (e, stateName) => {
        this.setState({
            [stateName]: e.nativeEvent.text
        });
      }
    
    handleSubmit = () => {
        console.log(this.state.customerName, this.state.details, this.state.invoiceAmount)
       NativeModules.DevSettings.reload();
      }  

    selectDates = (day) => {
       this.setState({
            invoiceDate : day.timestamp,
            markedDates: day.dateString
        })         
    }

render() {
    return (
        <View style={styles.container}>
            {/* <></> */}
            <TextInput style={styles.input}
                label = "Customer Name" maxLength = {20} 
                value = {this.state.customerName}
                onChange = { e => this.handleChange(e , 'customerName')} /> 
    
            <TextInput style={styles.input}
                label = "Invoice Amount" 
                keyboardType = "numeric" 
                maxLength = {5}
                onChange = { e => this.handleChange(e , 'invoiceAmount')} />
            <Wrap m={3} items="center" spacing={5}>
                <Text variant="bodyLarge">{this.state.minDate}</Text>
                <Button mode="text" textColor="blue" onPress={() => console.log('Pressed')}>
                    change the date
                </Button>    
            </Wrap>
             {/* <Calendar
                minDate = {this.state.minDate}
                onDayPress = {day => this.selectDates(day)}
                markedDates ={{[this.state.markedDates] : styles.selectedDate}}
                style={styles.calendarStyle}
                theme={styles.theme}
            /> */}
            <TextInput style={styles.input}
                label = "Details" 
                value = {this.state.details}
                multiline = {true} 
                numberOfLines = {2}
                maxLength = {100} 
                onChange = { e => this.handleChange(e , 'details')} />

            
                
           
            <TouchableHighlight
                    style = {styles.button}
                    underlayColor= "white"
                    onPress = {this.handleSubmit}
                >
                <Text
                    style={styles.buttonText}>
                    Save
                </Text>
            </TouchableHighlight>
        </View>
    );}

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#2a8ab7'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
      },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor:'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
      },
      calendarStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
        height: 350
      },
      theme: {
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        textSectionTitleDisabledColor: '#d9e1e8',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: 'blue',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e1e8',
        dotColor: '#00adf5',
        selectedDotColor: '#ffffff',
        arrowColor: 'blue',
        disabledArrowColor: '#d9e1e8',
        monthTextColor: 'blue',
        indicatorColor: 'blue',
        textDayFontFamily: 'monospace',
        textMonthFontFamily: 'monospace',
        textDayHeaderFontFamily: 'monospace',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16
      },
      selectedDate: {
        selected: true, 
        marked: true, 
        selectedColor: 'blue'
    },
    input: {
        marginBottom: 10,
    }
})
export default AddReceipts;