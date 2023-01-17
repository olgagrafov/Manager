import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ListNavigator from './src/screens/ListNavigator';
import EditNavigator from './src/screens/EditNavigator';
import AddNavigator from './src/screens/AddNavigator';

const Tab = createBottomTabNavigator();

export default function App() {
  
  
  return (
    <NavigationContainer>
     <Tab.Navigator initialRouteName="Signed Receipts" screenOptions={{ headerShown: false }}>
        <Tab.Screen 
          name="Signed Receipts" component={ListNavigator}
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
        <Tab.Screen name="Unsigned Receipts" component={EditNavigator}
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
        <Tab.Screen name="Add Receipt" component={AddNavigator}
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