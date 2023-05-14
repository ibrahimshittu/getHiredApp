import React from "react";
import { View, Text, Image } from "react-native";
import { icons } from "../../../constants";
import { checkImageURL } from "../../../utils";

import styles from "./company.style";

const Company = ({ companyLogo, jobTIitle, companyName, location }) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoBox}>
                <Image
                    source={{
                        uri: checkImageURL(companyLogo)
                            ? companyLogo
                            : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
                    }}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
                <Text>{companyName}</Text>
            </View>
        </View>
    );
};

export default Company;
