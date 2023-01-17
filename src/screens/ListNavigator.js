import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListOfReceipts from '../screens/ListOfReceipts';


const Stack = createNativeStackNavigator();

const EditNavigator = () =>{

  return (
    <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name="List Of Signed Receipts" component={ListOfReceipts} initialParams={{ signature: true }}/>
        </Stack.Group> 
    </Stack.Navigator> 
  );
}
export default EditNavigator;