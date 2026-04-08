import {View, Text, Image} from "react-native";
import { styles } from "./style";
import React from "react";

export const Header = () => {

    return (
        <View style={ styles.main }>
            <Image
                style={{ width: 80, height: 80, marginLeft: 32 }}
                source={require("@/assets/images/logo.png")}
            />
            <Text style={styles.text}>le logo</Text>
        </View>
    )
}