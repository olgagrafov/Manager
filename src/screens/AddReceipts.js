import React, { Component } from 'react';
import { NativeModules } from "react-native";
import { ScrollView, Image } from "react-native";
import { Wrap } from 'react-native-flex-layout';
import { TextInput, Text, Button, IconButton } from 'react-native-paper';
import { Calendar  } from 'react-native-calendars';
import { StyleSheet,  View } from 'react-native';
import { Timestamp } from 'firebase/firestore';
import { getFirestore, doc, setDoc,collection  } from 'firebase/firestore/lite';
import appDB from '../database/firebase';


let _date = new Date(Date.now()); 
let _month = _date.getMonth() + 1;
_month = _month < 10 ? `0${_month}`: _month;
let _day = _date.getDate() < 10 ? `0${ _date.getDate()}` : _date.getDate();
let minDate =`${_date.getFullYear()}-${_month}-${_day}`;
let showDate = `${_day}/${_month}/${_date.getFullYear()}`;


class AddReceipts extends Component {
    
    state  = {
        customerName: '',
        details: '',
        invoiceAmount: '',
        invoiceDate: Date.now(),
        markedDates: '',
        minDate: minDate,
        showCalendar: false,
        showDate: showDate,
        isEdit: false
    }; 

    componentDidMount() {
        if(typeof this.props.route.params !== "undefined"){
            if(this.props.route.params.invoiceDate!== "undefined"){
                _date = Timestamp.fromMillis(this.props.route.params.invoiceDate).toDate();
                _month = _date.getMonth() + 1;
                _month = _month < 10 ? `0${_month}`: _month;
                _day = _date.getDate() < 10 ? `0${ _date.getDate()}` : _date.getDate();
                showDate = `${_day}/${_month}/${_date.getFullYear()}`;
            }
            this.setState({
                customerName : this.props.route.params.customerName ? this.props.route.params.customerName : '',
                details: this.props.route.params.details ? this.props.route.params.details : '',
                invoiceAmount: this.props.route.params.invoiceAmount ? this.props.route.params.invoiceAmount : '',
                showDate: showDate,
                key: this.props.route.params.key ? this.props.route.params.key : '',
                isEdit: true
            })
        }  
    }

    openSignature = () =>{
        if(this.state.isEdit)
            this.props.navigation.navigate('Sign Receipt')
        else 
            this.props.navigation.navigate('Sign New Receipt') 
    }
    
    selectDates = (day) => {
        let _day = day.day < 10 ? `0${ day.day}` : day.day;
        let _month = day.month < 10 ? `0${day.month}`: day.month;   
        let showDate = `${_day}/${_month}/${day.year}`;
        this.setState({
            invoiceDate : day.timestamp,
            markedDates: day.dateString,
            showDate: showDate,
        });     
    }

    handleChange = (e, stateName) => {
        this.setState({
            [stateName]: e.nativeEvent.text
        });
      };
   

    handleSubmit = () => {
        if(this.state.customerName === '')
            alert("Customer Name is empty");
        else if(this.state.invoiceAmount === '')
            alert("Invoice Amount is empty");
        else {
            this.setDataFB();
        }
    };

   setDataFB = async () => {
        
        const db = getFirestore(appDB);
        const docRef = (doc(collection(db, "invoices")));
        const isSignature = (typeof this.props.route.params !== "undefined" && this.props.route.params.sig ? true : false);
        const signature =  isSignature ?  encodeURI(this.props.route.params.sig) : "";
     
        if(this.state.isEdit){
            await setDoc(doc(db, 'invoices', this.state.key), {
                customerName: this.state.customerName,
                details: this.state.details,
                invoiceAmount:  this.state.invoiceAmount,
                invoiceDate: this.state.invoiceDate,
                hasSignature: isSignature,
                signature: signature
            }).then(() => {
                alert("Document has been edit successfully");
            })
            .catch((error) => {
                alert(error);
        });
        } else {
            await setDoc(docRef, {  
                    customerName: this.state.customerName,
                    details: this.state.details,
                    invoiceAmount:  this.state.invoiceAmount,
                    invoiceDate: this.state.invoiceDate,
                    hasSignature: isSignature,
                    signature: signature }, 
                { merge: true })
                .then(() => {
                    alert("Document has been added successfully");
                })
                .catch((error) => {
                    alert(error);
            });
        }
        NativeModules.DevSettings.reload();
    }
    
render() {
    return (
        <View style={styles.container}>
            <ScrollView>
                <TextInput style={styles.input}
                    label = "Customer Name" maxLength = {20} 
                    value = {this.state.customerName}
                    onChange = { e => this.handleChange(e , 'customerName')} /> 
        
                <TextInput style={styles.input}
                    label = "Invoice Amount"
                    value = {this.state.invoiceAmount}
                    keyboardType = "numeric" 
                    maxLength = {5}
                    onChange = { e => this.handleChange(e , 'invoiceAmount')} />

                <Wrap m={5} items="center" spacing={1}>
                    <Text variant="bodyMedium">{this.state.showDate}</Text>
                    <Button mode="text" textColor="blue" onPress={() => this.setState({ showCalendar: true})}>
                        change the date
                    </Button>   
                    { this.state.showCalendar &&                   
                        <IconButton
                            icon="close"
                            size={26}
                            onPress={() => this.setState({ showCalendar: false})}
                        />   
                    }
                </Wrap>

                { this.state.showCalendar && 
                    <Calendar
                        minDate = {this.state.minDate}
                        onDayPress = {day => this.selectDates(day)}
                        markedDates ={{[this.state.markedDates] : styles.selectedDate}}
                        style={styles.calendarStyle}
                        theme={styles.theme}
                /> }

                <TextInput style={styles.input}
                    label = "Details" 
                    value = {this.state.details}
                    multiline = {true} 
                    numberOfLines = {3}
                    maxLength = {100} 
                    onChange = { e => this.handleChange(e , 'details')} />

                <Button mode="text" textColor="blue" onPress = {this.openSignature}>
                        Sign this receipt
                </Button> 

                { this.props.route.params && <Image
                    resizeMode={"contain"}
                    style={styles.image}
                    source={{ uri: decodeURI(this.props.route.params.sig) }}
                 />}    
            </ScrollView>
            <Button icon="content-save-edit" mode="contained" onPress = {this.handleSubmit}>
                Save this receipt
            </Button>
        </View>
    );}

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    calendarStyle: {
        borderWidth: 1,
        borderRadius: 9,
        borderColor: 'gray',
        height: 350,
        marginBottom: 10,
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
    },
    image: {
        width: 400,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default AddReceipts;