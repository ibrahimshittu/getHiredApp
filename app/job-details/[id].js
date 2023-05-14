import React from "react";
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
    Company,
    JobAbout,
    jobFooter,
    JobTabs,
    ScreenHeaderBtn,
    Specifics,
} from "../../components";
import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hook/useFetch";

const JobDetails = () => {
    const params = useSearchParams();
    const router = useRouter();

    const { data, loading, error, refetch } = useFetch("job-details", {
        job_id: params.id,
    });

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {};

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => {
                                router.back();
                            }}
                        />
                    ),
                    headerRight: () => <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />,
                    headerTitle: "",
                    headerBackTitleVisible: false,
                }}
            />
            <>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {loading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : error ? (
                        <Text>{error.message}</Text>
                    ) : data.length === 0 ? (
                        <Text>No data found</Text>
                    ) : (
                        <View
                            style={{
                                padding: SIZES.medium,
                                paddingBottom: 100,
                            }}
                        >
                            <Company
                                companyLogo={data[0].employer_logo}
                                jobTitle={data[0].job_title}
                                companyName={data[0].employer_name}
                                location={data[0].employer_country}
                            />
                            <JobAbout job={data.job} />
                            <JobTabs />
                            <Specifics specifics={data.specifics} />
                            {/* <jobFooter /> */}
                        </View>
                    )}
                </ScrollView>
            </>
        </SafeAreaView>
    );
};

export default JobDetails;
