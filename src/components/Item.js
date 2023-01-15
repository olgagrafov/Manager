import React, { Component} from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeModules } from "react-native";
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, doc, setDoc  } from 'firebase/firestore/lite';
import appDB from '../database/firebase';
import Receipt from './Receipt';


export default function(props) {
   const navigation = useNavigation();


    class Item extends Component {   

        state = {
            isShow: false,
            signature: null,
        };


        showOrHideDitals = () => {
        
         // if(!props.item.hasSignature) navigation.navigate('Add Receipts')

            this.setState({
                isShow: !this.state.isShow,
            });
        }

    
        // setDataFB = async () => {
        // const db = getFirestore(appDB);
        // await setDoc(doc(db, 'invoices', props.item.key), {
        //     customerName: props.item.customerName,
        //     details: props.item.details,
        //     invoiceAmount: props.item.invoiceAmount,
        //     invoiceDate: props.item.invoiceDate,
        //     hasSignature: true,
        //     signature: encodeURI(this.state.signature)
        //     }); 

            //  await setDoc(doc(db, 'invoices', "A3UwOUh1t0ilag82JWR5"), {
            //     customerName: "RaRa",
            //     details: "dtfrdgrgr dsgewreger",
            //     invoiceAmount: 5545,
            //     invoiceDate: null,
            //     hasSignature: false,
            //    }); 

         //   NativeModules.DevSettings.reload();
   // }

    render() {
            return (
                <>
                    <Text style={styles.itemtext}>
                        {props.item.customerName}
                    </Text>
                    {this.state.isShow && <Receipt item={props.item} />}
                    <TouchableOpacity onPress={this.showOrHideDitals}>
                        <Text style={styles.button}>
                            {this.state.isShow ? "hide ditals" : "ditals"}
                        </Text>
                    </TouchableOpacity>                     
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
    return <Item navigation={navigation} />;
}