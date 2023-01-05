import React, { Component } from 'react';
import { View, StyleSheet, } from 'react-native';
import Item from './Item';

class ItemsContainer extends Component {

  render() {
    return (  
      <>
      {/* //  <View style={styles.itemsList}> */}
          {this.props.items.map((item, index) => {
              return (
                <Item key={index} item={item} index={index} />   
              )
          })}
        {/* </View>   */} 
        </>
    );
  }
}

const styles = StyleSheet.create({
    itemsList: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
});
export default  ItemsContainer;