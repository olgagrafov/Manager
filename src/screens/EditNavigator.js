import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddReceipts from '../screens/AddReceipts';
import SignatureScreen from '../screens/SignatureScreen';

const Stack = createNativeStackNavigator();

const EditNavigator = () =>{

  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Edit Receipt" key={'AddReceipt'} component={AddReceipts} />
        <Stack.Screen name="SignatureScreen" key={'SignatureScreen'} component={SignatureScreen} />
    </Stack.Navigator> 
  );
}
export default EditNavigator;