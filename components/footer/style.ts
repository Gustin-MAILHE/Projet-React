import { StyleSheet } from 'react-native';
import { Colors, Text } from "@/assets/ts/var";

export const styles = StyleSheet.create({
    main: {
        height: 70,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: Colors.primary,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: 40,
    },
    text: {
        ...Text.all,
        color: Colors.textContrast,
    },
});