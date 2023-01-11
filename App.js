import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListOfReceipts from './src/screens/ListOfReceipts';
import AddReceipts from './src/screens/AddReceipts';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const Tab = createBottomTabNavigator();

export default function App() {
  
  
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Signed Receipts">
        <Tab.Screen name="Signed Receipts" component={ListOfReceipts} initialParams={{ signature: true }} 
          options={{
            tabBarIcon: ({color, size, focused}) => {
              return (
                <MaterialIcon
                  color= {!focused ? '#234655' : '#3F52CD'}
                  name="check"
                  size={20}
                />
              );
            },
          }}
        />
        <Tab.Screen name="Unsigned Receipts" component={ListOfReceipts} initialParams={{ signature: false }}
          options={{
            tabBarIcon: ({color, size, focused}) => {
              return (
                <MaterialIcon
                  color= {!focused ? '#234655' : '#3F52CD'}
                  name="edit"
                  size={20}
                />
              );
            },
          }}
        />
        <Tab.Screen name="Add Receipts" component={AddReceipts}
          options={{
            tabBarIcon: ({color, size, focused}) => {
              return (
                <MaterialIcon
                  color= {!focused ? '#234655' : '#3F52CD'}
                  name="add"
                  size={20}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}