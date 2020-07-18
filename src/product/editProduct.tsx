import React from 'react';
import { View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';


function EditScreen() {
    const navigation = useNavigation;
    return (
        <View>
            <Text>... forms with current values are coming</Text>
        </View>
    )
}

export default EditScreen;