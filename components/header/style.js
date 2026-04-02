import { Colors, Text } from "@/assets/js/var";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    main: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: '#0000',

        position: 'absolute',

        zIndex: 1,

        padding: '1em',
    },

    text: {
        ...Text.all,
        color: Colors.textContrast,
    },

})