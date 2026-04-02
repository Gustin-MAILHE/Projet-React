import { StyleSheet } from 'react-native';
import { Colors, Text } from "@/assets/js/var";

export const styles = StyleSheet.create({
    main: {
        width: '90vw',
        height: '10vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',

        backgroundColor: Colors.primary,

        position: 'fixed',
        bottom: 0,

        zIndex: 1,

        marginLeft: '5vw',
        marginRight: '5vw',
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '15px',
    },

    text: {
        ...Text.all,
        color: Colors.textContrast,
    }
});