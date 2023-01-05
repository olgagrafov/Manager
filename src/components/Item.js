import React, { Component} from 'react';
import {  View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { getFirestore, doc, setDoc  } from 'firebase/firestore/lite';
import appDB from '../database/firebase';
import Receipt from './Receipt';

class Item extends Component {
    state = {
        isShow: false,
        signature: null,
    };

    handleSaveReceipt = (signature) => {
      this.setState({
        isShow: false,
        signature: signature,
     });
     this.setDataFB();
  }

    showOrHideDitals = () => {
        this.setState({
            isShow: !this.state.isShow,
        });
    }

 
    setDataFB = async () => {
      const db = getFirestore(appDB);
       await setDoc(doc(db, 'invoices', this.props.item.key), {
          customerName: this.props.item.customerName,
          details: this.props.item.details,
          invoiceAmount:  this.props.item.invoiceAmount,
          invoiceDate: this.props.item.invoiceDate,
          hasSignature: true,
          signature: encodeURI(this.state.signature)
         }); 

        //  await setDoc(doc(db, 'invoices', "A3UwOUh1t0ilag82JWR5"), {
        //     customerName: "RaRa",
        //     details: "dtfrdgrgr dsgewreger",
        //     invoiceAmount: 5545,
        //     invoiceDate: null,
        //     hasSignature: false,
        //    }); 
}

  render() {
            return (
                <>
                {/* // <View key={this.props.index}> */}
                    <Text style={styles.itemtext}>
                        {this.props.item.customerName}
                    </Text>
                    {this.state.isShow && <Receipt item={this.props.item}  handleSave={this.handleSaveReceipt}/>}
                     <TouchableOpacity
                        onPress={this.showOrHideDitals}>
                        <Text style={styles.button}>
                            {this.state.isShow ? "hide ditals" : "ditals"}
                        </Text>
                      </TouchableOpacity>                     
                {/* // </View> */}
                </>
            )
   }
      
}

const styles = StyleSheet.create({
    itemtext: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#3F52CD'
       },
});
export default Item;