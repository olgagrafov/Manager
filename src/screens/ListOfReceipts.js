import React, { Component } from 'react';
import { StyleSheet,  View, ActivityIndicator, ScrollView, Text } from 'react-native';
import ItemsContainer from '../components/ItemsContainer';
import { getFirestore, collection, getDocs,  } from 'firebase/firestore/lite';
import appDB from '../database/firebase';

class ListOfReceipts extends Component {
  
  constructor({route}, props) {
    super();

    this.state = {
      isLoading: true,
      invoicesArr: [],
      signature: route.params.signature,
    };
   }

   async componentDidMount() {

    const db = getFirestore(appDB);
    const invoicesCol = collection(db, 'invoices');
    const invoicesSnapshot = await getDocs(invoicesCol);

    const invoicesArr = [];
    invoicesSnapshot.docs.map(doc => {
      const { hasSignature, details, invoiceAmount, invoiceDate, customerName, signature } = doc.data();
      if(hasSignature == this.state.signature){
        invoicesArr.push({
          key: doc.id,
          hasSignature,
          details,
          invoiceAmount,
          invoiceDate,
          customerName,
          signature,
        });
      }
    });

    this.setState({
      invoicesArr,
      isLoading: false,
   });

}
  
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      );
    }    
    return (
      <>
      {
          this.state.invoicesArr.length > 0
              ? <ItemsContainer items={this.state.invoicesArr} />
              : <Text>No items</Text>
        }
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default ListOfReceipts;