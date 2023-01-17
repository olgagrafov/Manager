import React, { Component } from 'react';
import { StyleSheet, Text ,Image, View} from 'react-native';
import { Timestamp } from 'firebase/firestore';


class Receipt extends Component {
  state = {
    invoiceDate: "",
};
 
  componentDidMount(){
    const fbDate =  Timestamp.fromMillis(this.props.item.invoiceDate).toDate();
    let date =fbDate.getDate();
    date = date < 10 ? "0" + date : date;
    let month = fbDate.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    const year = fbDate.getFullYear();
    const fullDate = date + "/" + month + "/" + year;
   
    this.setState({
      invoiceDate : fullDate,
    })   
  }


  render() {
    return(
      <>
        <Text style={styles.ditalstext}> invoice date: {this.state.invoiceDate} </Text>
        <Text style={styles.ditalstext}> details: {this.props.item.details} </Text> 
        {this.props.item.hasSignature &&
          <View style={styles.container}>
            <Image
                  resizeMode={"contain"}
                  style={styles.image}
                  source={{ uri: decodeURI(this.props.item.signature) }}
              /> 
          </View>
        }
      </>
    )
  }
}

const styles = StyleSheet.create({
  ditalstext: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
},
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default Receipt;