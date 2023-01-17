import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddReceipts from '../screens/AddReceipts';
import SignatureScreen from '../screens/SignatureScreen';

const Stack = createNativeStackNavigator();

const AddNavigator = () =>{

  return (
    <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name="Create new Receipt" component={AddReceipts} />
          <Stack.Screen name="Sign New Receipt" component={SignatureScreen} options={{ title: 'Sign Receipt' }}/> 
        </Stack.Group> 
    </Stack.Navigator> 
  );
}
export default AddNavigator;