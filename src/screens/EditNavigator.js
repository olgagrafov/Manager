import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListOfReceipts from '../screens/ListOfReceipts';
import AddReceipts from '../screens/AddReceipts';
import SignatureScreen from '../screens/SignatureScreen';

const Stack = createNativeStackNavigator();

const EditNavigator = () =>{

  return (
    <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name="List Of Unsigned Receipts" component={ListOfReceipts} initialParams={{ signature: false }}/>
          <Stack.Screen name="Edit Receipt"  component={AddReceipts} />
          <Stack.Screen name="Sign Receipt" component={SignatureScreen} /> 
        </Stack.Group> 
    </Stack.Navigator> 
  );
}
export default EditNavigator;