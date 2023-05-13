import React, { useState } from "react";
import { View, Text, TextInput, Image, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const Welcome = () => {
    const router = useRouter();

    const [activeJobType, setActiveJobType] = useState("All");
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.userName}>Hello, Ibrahim</Text>
                <Text style={styles.welcomeMessage}>Find your next job</Text>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value=""
                        placeholder="What are you loking for?"
                        onChange={() => {}}
                    />
                </View>
                <TouchableOpacity style={styles.searchBtn}>
                    <Image
                        source={icons.search}
                        style={styles.searchBtnImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.tabsContainer}>
                <FlatList
                    data={["All", "Full Time", "Part Time", "Internship", "Freelance"]}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.tab(activeJobType, item)}
                            onPress={() => {
                                setActiveJobType(item);
                                router.push("/search/" + item);
                            }}
                        >
                            <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ columnGap: SIZES.small }}
                />
            </View>
        </View>
    );
};

export default Welcome;
