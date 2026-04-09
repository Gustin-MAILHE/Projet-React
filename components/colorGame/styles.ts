import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#1a1a2e'
    },
    
    header: {
        backgroundColor: 'transparent',
        paddingHorizontal: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    
    mainContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    footer: {
        height: 70,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginHorizontal: '5%'
    },
    
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    
    buttonFalse: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    buttonTrue: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    startScreenContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    
    startScreenTitle: {
        color: 'white',
        fontFamily: 'Serial',
        fontSize: 40,
        marginBottom: 20,
        textAlign: 'center'
    },
    
    startScreenDescription: {
        color: '#b0b0b0',
        fontFamily: 'Serial',
        fontSize: 19,
        marginBottom: 40,
        textAlign: 'center'
    },
    
    startButton: {
        backgroundColor: '#35724a',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    gameOverContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    
    gameOverTitle: {
        color: 'white',
        fontFamily: 'Serial',
        fontSize: 40,
        marginBottom: 20,
        textAlign: 'center'
    },
    
    gameOverScore: {
        color: '#b0b0b0',
        fontFamily: 'Serial',
        fontSize: 19,
        marginBottom: 20,
        textAlign: 'center'
    },
    
    gameOverMessage: {
        color: '#ff6b6b',
        fontFamily: 'Serial',
        fontSize: 16,
        marginBottom: 40,
        textAlign: 'center'
    },
    
    restartButton: {
        backgroundColor: '#35724a',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    levelText: {
        color: '#b0b0b0',
        fontFamily: 'Serial',
        fontSize: 19,
        marginBottom: 20,
        textAlign: 'center'
    }
})

