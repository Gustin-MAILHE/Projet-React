import { View, Text } from "react-native";
import { styles } from "./style";

export const Header = () => {


    return (
        <View style={ styles.main }>
            <Text style={styles.text}>le logo</Text>
            <Text style={styles.text}>Un menu</Text>
        </View>
    )
}