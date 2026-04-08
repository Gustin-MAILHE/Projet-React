import { StyleSheet } from 'react-native';
import { Colors, Text } from "@/assets/ts/var";

export const styles = StyleSheet.create({
    body: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.background,
        paddingBottom: 80,
    },

    text: Text.all,

    bandeau: {
        display: 'flex',
        fontFamily: 'Serial',
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
        width: 150,
        height: 140,
        display: 'flex',
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

    accueil: {
        display: 'flex',
        fontFamily: 'Serial',
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        color: Colors.textContrast,
        fontSize: 35,
        textAlign: 'center',
    },

    accueil1: {
        fontFamily: 'Serial',
        color: Colors.textContrast,
        fontSize: 22,
        textAlign: 'center',
    }
});