import { createStackNavigator } from "@react-navigation/stack";

import UserScreen from "../screens/UserScreen";

const Stack = createStackNavigator();

export function UserNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='User Detail'
                component={UserScreen}
                options={{
                    headerShown:false,
                }}
            />
        </Stack.Navigator>
    );
}