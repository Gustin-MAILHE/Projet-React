import { StyleSheet } from 'react-native';
import { Colors, Text } from "@/assets/js/var";

export const styles = StyleSheet.create({
    main: {
        height: 70,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: Colors.primary,
        position: 'absolute',
        bottom: 0,
        left: '5%',
        right: '5%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        zIndex: 1,
    },
    text: {
        ...Text.all,
        color: Colors.textContrast,
    },
});