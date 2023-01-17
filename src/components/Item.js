import React, { Component} from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeModules } from "react-native";
import { Text, StyleSheet, TouchableOpacity, View, Share } from 'react-native';
import { IconButton } from 'react-native-paper';
import { getFirestore, doc, deleteDoc  } from 'firebase/firestore/lite';
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
        }

    
        deleteItem = async () => {
            const db = getFirestore(appDB);
            await deleteDoc(doc(db, 'invoices', props.item.key))
            .then(() => {
                alert("Document has been deleted successfully");
            })
            .catch((error) => {
                alert(error);
            });
            NativeModules.DevSettings.reload();
        }

    render() {
            return (
                <View style={styles.itemContainer}>
                    <View style={styles.itemBox}>
                        <View style={styles.itemRow}> 
                            <Text style={styles.itemText}>
                                {props.item.customerName}
                            </Text>
                            {props.item.hasSignature 
                            ?  (<>
                                    <IconButton
                                            icon="share-variant-outline"
                                            size={20}
                                            onPress={this.shareItem}
                                        />
                                    <IconButton
                                            icon="trash-can-outline"
                                            size={20}
                                            onPress={this.deleteItem}
                                    />
                                </>
                                )
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