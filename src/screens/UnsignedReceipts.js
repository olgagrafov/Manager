import React, { Component } from 'react';
import { StyleSheet,  View, ActivityIndicator, ScrollView, Text } from 'react-native';
import ItemComponent from '../components/ItemComponent/';
import { getFirestore, collection, getDocs, doc, setDoc  } from 'firebase/firestore/lite';
import appDB from '../database/firebase';
class UnsignedReceipts extends Component {
  
  constructor() {
    super();

    // async function setDataFB(){
    //   const db = getFirestore(appDB);
    //    await setDoc(doc(db, 'invoices', 'A3UwOUh1t0ilag82JWR5'), {
    //       details: "ENV",
    //       invoiceAmount: 754,
    //       invoiceDate: null,
    //        hasSignature: false
    //      }); 
    // }
    // setDataFB();

    this.state = {
      isLoading: true,
      invoicesArr: []
    };
    
   
   }

   

   async componentDidMount() {

    const db = getFirestore(appDB);
    const invoicesCol = collection(db, 'invoices');
    const invoicesSnapshot = await getDocs(invoicesCol);
   

    const invoicesArr = [];
    invoicesSnapshot.docs.map(doc => {
      const { details, invoiceAmount, invoiceDate, hasSignature } = doc.data();
      invoicesArr.push({
        key: doc.id,
        details,
        invoiceAmount,
        invoiceDate,
        hasSignature,
      });
    });
    this.setState({
      invoicesArr,
      isLoading: false,
   });

  
  
   // console.log("invoicesArr: " , this.state.invoicesArr);

  }
  
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <ScrollView style={styles.container}>
        {
          this.state.invoicesArr.length > 0
              ? <ItemComponent items={this.state.invoicesArr} />
              : <Text>No items</Text>
        }
        {
          this.state.invoicesArr.length > 0
              ? <ItemComponent items={this.state.invoicesArr} />
              : <Text>No items</Text>
        }
        {
          this.state.invoicesArr.length > 0
              ? <ItemComponent items={this.state.invoicesArr} />
              : <Text>No items</Text>
        }
        {
          this.state.invoicesArr.length > 0
              ? <ItemComponent items={this.state.invoicesArr} />
              : <Text>No items</Text>
        }
        {
          this.state.invoicesArr.length > 0
              ? <ItemComponent items={this.state.invoicesArr} />
              : <Text>No items</Text>
        }
        {
          this.state.invoicesArr.length > 0
              ? <ItemComponent items={this.state.invoicesArr} />
              : <Text>No items</Text>
        }
      </ScrollView>   
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
export default UnsignedReceipts;