import React, { Component} from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeModules } from "react-native";
import { Text, StyleSheet, TouchableOpacity, View, Share } from 'react-native';
import { IconButton } from 'react-native-paper';
import { getFirestore, doc, setDoc  } from 'firebase/firestore/lite';
import appDB from '../database/firebase';
import Receipt from './Receipt';
import { endAt } from 'firebase/firestore';


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
        };

        shareItem = async () => {
            await Share.share({
                message:
                  `Hy dear, ${props.item.customerName}, your amount is ${props.item.invoiceAmount}`
              });
        };

        editInvoce = () => {
            navigation.navigate('Edit Receipt', props.item);
           // console.log(navigation)
          // navigation.push('SignatureScreen')
         // navigation.navigate('Add Receipt', { signature: true });
           // navigation.navigate( 'Add Receipt',  { screen:  'SignatureScreen'});
           // this.props.navigation.navigate('SignatureScreen')
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
                <View style={styles.itemContainer}>
                    <View style={styles.itemBox}>
                        <View style={styles.itemRow}> 
                            <Text style={styles.itemText}>
                                {props.item.customerName}
                            </Text>
                            {props.item.hasSignature 
                            ? (<IconButton
                                    icon="share-variant-outline"
                                    size={20}
                                    onPress={this.shareItem}
                                />)
                                :
                                (<IconButton
                                    icon="draw-pen"
                                    size={20}
                                    onPress={this.editInvoce}
                                />)
                            }
                        </View> 
                        {this.state.isShow && <Receipt item={props.item} />}
                        <TouchableOpacity onPress={this.showOrHideDitals}>
                            <Text style={styles.button}>
                                {this.state.isShow ? "hide ditals" : "ditals"}
                            </Text>
                        </TouchableOpacity> 
                     </View>                
                </View>
            )
        }
        
    }

    const styles = StyleSheet.create({
        itemContainer: {
            flex: 2,
            flexDirection: 'row',
            backgroundColor: '#fff',
            borderRadius: 8,
            borderWidth: 0.5,
            borderColor: '#000',
            padding: 10,
            marginLeft: 10,
            marginRight: 12,
            marginBottom: 5,
        },
        itemRow: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        itemBox: {
            flex: 1,
            flexDirection: 'column',
        },
        itemText: {
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