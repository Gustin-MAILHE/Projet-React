import { StyleSheet } from 'react-native';
import { Colors, Text } from "@/assets/js/var";

export const styles = StyleSheet.create({
    body: {
        margin: 0,
        padding: 0,
        paddingBottom: '6em',

        height: '100vh',

        zIndex: 0,

        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Colors.background,
    },  text: Text.all,

    bandeau: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        padding: 0,
        margin: 0,

        height: '30vh',

        backgroundColor: Colors.primary,

        color: Colors.textContrast,
        fontSize: 40,
    },

    listJeux: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',

        gap: '2em',

        padding: '1em',
    },
    carteJeu: {
        width: '10em',
        height: '10em',
        overflow: 'hidden',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        backgroundColor: Colors.secondary,
        borderColor:Colors.accent,
        borderWidth: 5,
        borderStyle: 'solid',
        borderRadius: 15,

        ...Text.all,

    },
    titreCarte: {
        ...Text.all,
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.textContrast,

        marginTop: '0.2em',
        marginLeft: '0.2em',
    }
});