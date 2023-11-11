import { createStackNavigator } from "@react-navigation/stack";

import TaskListScreen from "../screens/TaskListScreen";

const Stack = createStackNavigator();

export function TaskScreenNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Task'
                component={TaskListScreen}
                options={{
                    headerShown:false,
                }}
            />
        </Stack.Navigator>
    );
}