import { Colors, Text } from "@/assets/ts/var";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0000',
        zIndex: 1,
        padding: 16
    },
    text: {
        ...Text.all,
        color: Colors.textContrast,
    },
});