import { createStackNavigator } from "@react-navigation/stack";

import UserScreen from "../screens/UserScreen";
import UpdateTask from "../screens/UpdateTask";
import TaskDetailScreen from "../screens/TaskDetailScreen";

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
            <Stack.Screen
                name='Update Screen'
                component={UpdateTask}
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen
                name='TaskDetail Screen'
                component={TaskDetailScreen}
                options={{
                    headerShown:false,
                }}
            />
        </Stack.Navigator>
    );
}