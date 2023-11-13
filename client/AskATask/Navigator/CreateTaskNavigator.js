import { createStackNavigator } from "@react-navigation/stack";

import CreateTaskScreen from "../screens/CreateTaskScreen";

const Stack = createStackNavigator();

export function CreateTaskNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='CreateScreen'
                component={CreateTaskScreen}
                options={{
                    headerShown:false,
                }}
            />
        </Stack.Navigator>
    );
}