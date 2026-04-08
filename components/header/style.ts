import { Colors, Text } from "@/assets/js/var";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0000',
        position: 'absolute',
        zIndex: 1,
        padding: 16,
        left: 0,
        right: 0,
    },
    text: {
        ...Text.all,
        color: Colors.textContrast,
    },
});