import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Theme } from './theme';

const imgPicker = (theme: Theme) => StyleSheet.create({
    avatar: {
        width: 150,
        height: 150,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 100,
        backgroundColor: theme.colors.primaryContrast,
    },
    avatarCentered: {
        display: "flex",
        alignSelf: "center"
    }
});

export function useImgPicker(){
    const theme = useTheme() as Theme;
    return imgPicker(theme);
}