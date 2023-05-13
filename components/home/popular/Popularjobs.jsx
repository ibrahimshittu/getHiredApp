import React, { useState } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";

import styles from "./popularjobs.style";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";

const Popularjobs = () => {
    const router = useRouter();

    const { data, isLoading, error } = useFetch("search", {
        query: "React developer",
        page: "1",
        num_pages: "1",
        remote_jobs_only: "true",
    });

    const [selectedJob, setSelectedJob] = useState();

    const handleCardPress = (item) => {
        router.push(`/job-details/${item.job_id}`);
        setSelectedJob(item.job_id);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Popular Jobs</Text>
                <TouchableOpacity onPress={() => router.push("/search")}>
                    <Text style={styles.headerBtn}>Show All</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : error ? (
                    <Text>{error.message}</Text>
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.job_id}
                        renderItem={({ item }) => (
                            <PopularJobCard
                                item={item}
                                selectedJob={selectedJob}
                                handleCardPress={handleCardPress}
                            />
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ columnGap: SIZES.medium }}
                    />
                )}
            </View>
        </View>
    );
};

export default Popularjobs;
