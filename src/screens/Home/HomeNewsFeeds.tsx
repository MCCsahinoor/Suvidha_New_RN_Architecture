import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import styles from './styles'; 
import { Colors, Fonts } from '../../themes'; 
import NoDataFound from '../../components/NoDataFound';
import { useTranslation } from 'react-i18next';
import HeaderCurve from '../../components/HeaderCurve';
import { GetNewsList } from '../../services/NewsFeed/NewsFeed.Service';
import DynamicShimmerPlaceholder from '../../utils/dynamicShimmerPlaceholder';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Pressable } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ModalComponent from '../../components/Modal'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Card from '../../components/Card';
interface NewsResponse {
  data: NewsItem[];
}

interface NewsItem {
  nm_id: number;
  nm_title: string;
  nm_content: string;
  nm_media_url: string;
  nm_post_type: string;
  created_user: string;
  created_date: string;
}

const HomeNewsFeeds = ({ navigation, ReachEndFlag }: any) => {
  const { t } = useTranslation();
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [ytVideoId, setytVideoId] = useState('');
  const [rowOffset, setRowOffset] = useState(1);
  const [fetchrows, setFetchrows] = useState(10);
  const [showLoader, setShowLoader] = useState(false);
  const [FlatListShowLoader, setFlatListShowLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = async (Offset: number, fetchrows: number) => {
    setLoading(true);
    try {
      const response = await GetNewsList({
        pageNumber: Offset,
        pagLength: fetchrows
      });
      const typedResponse = response as NewsResponse;
      if (Offset === 1) {
        setNewsData(typedResponse.data);
      } else {
        setNewsData(prevData => [...prevData, ...typedResponse.data]);
      }
    } catch (error) {
      // Error is already handled by the interceptor with toast message
      // Just prevent unhandled promise rejection
      console.log('Error fetching news:', error);
    } finally {
      setLoading(false);
      setShowLoader(false);
      setFlatListShowLoader(false);
    }
  };

  useEffect(() => {
    setShowLoader(true);
    setFlatListShowLoader(true);
    fetchNews(rowOffset, fetchrows);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setRowOffset(1);
    try {
      await fetchNews(1, fetchrows);
    } catch (error) {
      // Error is already handled by fetchNews
      console.log('Error refreshing news:', error);
    } finally {
      setRefreshing(false);
    }
  }, [fetchrows]);

  const GetReachEnd = async (ReachEnd: boolean) => {
    if (ReachEnd) {
      setFlatListShowLoader(true);
      const Offset = rowOffset + fetchrows;
      setRowOffset(Offset);
      try {
        await fetchNews(Offset, fetchrows);
      } catch (error) {
        // Error is already handled by fetchNews
        console.log('Error loading more news:', error);
      }
    } else {
      setFlatListShowLoader(false);
    }
  };

  const extractVideoId = (url: string) => {
    const match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const handleVideoClick = (url: string) => {
    const videoId = extractVideoId(url);
    if (videoId) {
      openVideo(videoId);
    } else {
        console.log("Invalid YouTube URL:", url);
    }
  };

  const openVideo = (id: string) => {
    setytVideoId(id);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <HeaderCurve
        topGaap={119}
        headerBackground={'#36686D'}
        headerBackgroundTwo={'#84A2A5'}
        pageBackground={'#F2F2F2'}
      />
      {!FlatListShowLoader && newsData.length === 0 && (
        <View style={{ marginTop: 50 }}>
          <NoDataFound content={t("No data found")} />
        </View>

      )}
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={newsData}
        numColumns={1}
        onEndReached={ReachEndFlag}
        onEndReachedThreshold={0.5}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListFooterComponent={
          FlatListShowLoader ? (
            <DynamicShimmerPlaceholder borderRadius={3} height={100} width={'100%'} count={3} />
          ) : null
        }
        renderItem={({ item }: any) => (
          <View style={{ ...styles.container }}>
            <View style={{ padding: 10, paddingTop: 0 }}>

              <View key={item.nm_id} style={{ marginBottom: 10 }}>
                <Pressable
                  onPress={() => navigation.navigate('NewsFeedDetails', { nm_id: item.nm_id })}
                >
                  <Card>
                    <View style={{ padding: 10, ...styles.newsFeeds }}>
                      <View>
                        <View
                          style={{
                            height: 72,
                            width: 72,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 8,
                            backgroundColor: '#ddd',
                            marginBottom: 5,
                            marginTop: 5
                          }}
                        >
                          {item.nm_post_type === 'VIDEO' ? (
                            <TouchableOpacity onPress={() => handleVideoClick(item.nm_media_url)}>
                              <Icon name="play-circle" size={50} color="#000" />
                            </TouchableOpacity>
                          ) : (

                            <Image
                              source={{ uri: item.nm_media_url }}
                              style={{
                                height: 72,
                                width: 72,
                                borderRadius: 8,
                                resizeMode: 'cover',
                              }}
                            />
                          )}
                        </View>
                      </View>
                      <View style={{ ...styles.newsFeedsContent }}>
                        <Text style={{ ...styles.newsFeedsHeading }}>
                          {item.nm_title}
                        </Text>
                        <Text
                          style={{ ...styles.newsFeedsText }}
                          numberOfLines={4}
                        >
                          {item.nm_content}
                        </Text>
                        <View style={{ ...styles.newsFeedsReadMore }}>
                          <Text
                            style={{
                              color: '#2F6EFF',
                              fontFamily: Fonts.OpenSans500Medium,
                            }}
                          >
                            Read more...
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Card>
                </Pressable>
              </View>

            </View>
          </View>
        )}
      />

      {openModal && (
        <ModalComponent>
          <View style={{ ...styles.centeredView }}>
            <View style={styles.modalView}>
              <View >
                <YoutubePlayer height={180} videoId={ytVideoId} />
              </View>
            </View>
            <Pressable onPress={() => closeModal()} style={{ marginTop: 30 }}>
              <FontAwesome name="times-circle" size={30} color={Colors.color_white} />
            </Pressable>
          </View>
        </ModalComponent>
      )}
    </>
  );
};
// const styles = StyleSheet.create({



// });

export default HomeNewsFeeds;
