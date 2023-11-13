import { createStackNavigator } from "@react-navigation/stack";

import TaskListScreen from "../screens/TaskListScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";

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
            <Stack.Screen
                name='Details'
                component={TaskDetailScreen}
                options={{
                    headerShown:false,
                }}
            />
        </Stack.Navigator>
    );
}