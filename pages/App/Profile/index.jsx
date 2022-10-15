import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const ProfileScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Profile Screen</Text>
            <Button
                onPress={() => {
                    navigation.navigate('Explore');
                }}
            >
                Go to explore page
            </Button>
        </View>
    );
};

export default ProfileScreen;
