import { StyleSheet } from 'react-native';
import { Colors, Text } from "@/assets/js/var";

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.background,
        paddingBottom: 80,
    },

    text: Text.all,

    bandeau: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
        backgroundColor: Colors.primary,
        color: Colors.textContrast,
        fontSize: 40,
    },

    listJeux: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 24,
        padding: 16,
    },

    carteJeu: {
        width: 140,
        height: 140,
        overflow: 'hidden',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
        borderColor: Colors.accent,
        borderWidth: 5,
        borderRadius: 15,
        ...Text.all,
    },

    titreCarte: {
        ...Text.all,
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.textContrast,
        marginTop: 4,
        marginLeft: 4,
    },
});