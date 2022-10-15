import React from 'react';
import ExploreScreen from '../pages/App/Explore';
import { TabNavigator } from './TabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <RootStack.Navigator initialRouteName="Home">
            <RootStack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <RootStack.Screen name="Explore" component={ExploreScreen} />
        </RootStack.Navigator>
    );
};

export default AppStack;
