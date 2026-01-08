import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { GetNewsDetails } from '../../services/NewsFeed/NewsFeed.Service';
import RenderHtml from 'react-native-render-html';
import WebView from 'react-native-webview';
import DynamicShimmerPlaceholder from '../../utils/dynamicShimmerPlaceholder';
import NoDataFound from '../../components/NoDataFound';
import { useTranslation } from 'react-i18next';
import HeaderCurve from '../../components/HeaderCurve';
import { Colors, Fonts } from '../../themes';

interface NewsDetailsAPIResponse {
    nm_id: number;
    nm_title: string;
    nm_content: string;
    nm_media_url: string;
    nm_post_type: string;
    created_user: string;
    created_date: string;
}

interface GetNewsDetailsResponse {
    data: NewsDetailsAPIResponse;
}

const NewsFeedDetails = ({ route, navigation }: any) => {
    const { t } = useTranslation();
    const { nm_id } = route.params;
    const [newsDetails, setNewsDetails] = useState<NewsDetailsAPIResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchNewsDetails = async () => {
            setLoading(true);
            try {
                const response = await GetNewsDetails<{ newsId: number }, GetNewsDetailsResponse>({ newsId: nm_id });
                setNewsDetails(response.data);
            }finally {
                setLoading(false);
            }
        };

        fetchNewsDetails();
    }, [nm_id]);

    const renderVideo = (url: string) => {
        const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
        if (isYouTube) {
            const videoId = url.split('v=')[1]?.split('&')[0];
            const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
            return <WebView source={{ uri: youtubeEmbedUrl }} style={{ height: 250, width: '100%' }} />;
        } else {
            return <WebView source={{ uri: url }} style={{ height: 250, width: '100%' }} />;
        }
    };

    return (
        <>
            <HeaderCurve
                topGaap={119}
                headerBackground={'#36686D'}
                headerBackgroundTwo={'#84A2A5'}
                pageBackground={'#F2F2F2'}
            />
            {loading ? (
                <DynamicShimmerPlaceholder borderRadius={3} height={100} width={'100%'} count={5} />
            ) : !newsDetails ? (
                <NoDataFound content={t('No data found')} />
            ) : (
                <ScrollView style={styles.container}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>{newsDetails.nm_title}</Text>
                        {newsDetails.nm_post_type === 'VIDEO' ? (
                            renderVideo(newsDetails.nm_media_url)
                        ) : (
                            <Image source={{ uri: newsDetails.nm_media_url }} style={styles.image} />
                        )}
                        <View style={styles.textContainer}>
                            <RenderHtml contentWidth={300} source={{ html: newsDetails.nm_content }} />
                        </View>
                    </View>
                </ScrollView>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#F2F2F2',
    },
    contentContainer: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        color: Colors.ui_dark_bg,
        fontFamily: Fonts.poppins500Medium,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 8,
        marginVertical: 10,
    },
    textContainer: {
        marginVertical: 5,
        marginHorizontal: 5,
    },
});

export default NewsFeedDetails;
