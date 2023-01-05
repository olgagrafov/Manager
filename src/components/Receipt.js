import React, { Component } from 'react';
import { StyleSheet, Text ,Image, View} from 'react-native';
import Signature from "react-native-signature-canvas";

class Receipt extends Component {
  state = {
    invoiceDate: "",
};
 
  componentDidMount(){
   // console.log(this.props.item)
    const date = this.props.item.invoiceDate.toDate().getDate();
    let month = this.props.item.invoiceDate.toDate().getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    const year = this.props.item.invoiceDate.toDate().getFullYear();
    const fullDate = date + "/" + month + "/" + year;
    this.setState({
      invoiceDate : fullDate,
    })   
  }

 handleEmpty = () => {
    alert("didn't sign");
};

 style = `.m-signature-pad--footer
.button {
  background-color: red;
  color: #FFF;
}`;
  
  render() {
    return(
      <>
        <Text  style={styles.ditalstext}> invoice date: {this.state.invoiceDate} </Text>
        <Text style={styles.ditalstext}> details: {this.props.item.details} </Text> 
        {this.props.item.hasSignature == true ?
          <View style={styles.container}>
            <Image
              resizeMode={"contain"}
              style={styles.image}
              source={{ uri: decodeURI(this.props.item.signature) }}
            />
          </View>
        :
          <Signature
            onOK={this.props.handleSave}
            onEmpty={this.handleEmpty}
            descriptionText="Sign"
            clearText="Clear"
            confirmText="Save"
            autoClear={true}
          />
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