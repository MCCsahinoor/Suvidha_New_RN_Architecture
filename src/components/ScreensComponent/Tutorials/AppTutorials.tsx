import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, Text, ImageBackground, Pressable, RefreshControl, ActivityIndicator, Linking, } from 'react-native';
import styles from './styles'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import { YTVideoId, YTVideoToThumbnail } from '../../../utils/YTVideoToThumbnail';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'; 
import ModalComponent from '../../Modal';
import YoutubePlayer from "react-native-youtube-iframe";
import { useDispatch, useSelector } from 'react-redux';
import { setPullToRefresh } from '../../../store/features/menu/pullToRefresh';
import { I_Tutorials } from '../../../Interfaces/tutorials.interface';
import { Colors, Fonts } from '../../../themes';
import { filename } from '../../../utils/uriToFileName';
import RNFS from 'react-native-fs';
import NoDataFound from '../../NoDataFound';
import { useTranslation } from 'react-i18next';
import { CommonToastModel } from '../../../utils/ToastMessageModel';
import Card from '../../Card';

const AppTutorials = ({ navigation }: any) => {

    const { product_tutorial, app_tutorial, status, error } = useSelector((state: any) => state.AllsuvidhaTutorials);
    const [tutorialsList, setTutorialsList] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status == 'succeeded' && (app_tutorial ?? '')) {
            setTutorialsList(app_tutorial);
        }
    }, [app_tutorial]);

    const [openModal, setOpenModal] = useState(false);
    const [ytVideoId, setytVideoId] = useState('');

    const openVideo = (id: any) => {
        setOpenModal(true);
        setytVideoId(id)
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
        dispatch(setPullToRefresh({ pageName: 'HomeScreens', pullAction: true }));
    }, []);

    const [getSelectedDownloadIndex, setSelectedDownloadIndex] = useState<any>(null);
    const [downloadProgrress, setProgress] = useState(0)

    const download = (file: string, index: number) => {
        setSelectedDownloadIndex(index)
        if (file) {
            const url = file;
            const filePath = `${RNFS.DocumentDirectoryPath}/${filename(file)}`;
            console.log(filePath)
            RNFS.downloadFile({
                fromUrl: url,
                toFile: filePath,
                background: true,
                discretionary: true,
                progress: (res: any) => {
                    const percentage = ((100 * res.bytesWritten) / res.contentLength) | 0;
                    // const progress = `${percentage}%`; 
                    setProgress(percentage)
                    // setProgress(`Download ${progress}`)
                },
            }).promise.then((response: any) => {
                if (response.statusCode === 200) {
                    setSelectedDownloadIndex(null)
                    Linking.openURL(file).catch(() => {
                    });
                } else {
                    console.log('Error', 'Failed to download file');
                }
            }).catch((err: any) => {
                setProgress(0)
                setSelectedDownloadIndex(null)
                CommonToastModel('error', err.error.response.data.errorMessage ? err.error.response.data.errorMessage : 'Something went wrong! Please try again sometime.', 8000);
            });
        }
    };


    const { t } = useTranslation();

    return (
        <>
            <ScrollView style={{ backgroundColor: '#F2F2F2' }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={{ ...styles.containerTutorials }}>
                    {tutorialsList.map((item: I_Tutorials, index: number) => (
                        <View style={{ marginTop: 15 }} key={index} >
                            {item.doc_type === 'youtube' && (
                                <Card>
                                    <Pressable style={{ ...styles.playerList }} onPress={() => { openVideo(YTVideoId(item.doc_link)); }}>
                                        <View style={{ width: 150 }}>
                                            <ImageBackground source={{ uri: YTVideoToThumbnail(item.doc_link) }} resizeMode="cover" style={{ ...styles.backgroundContainerCoverThumaNail }} imageStyle={{ borderRadius: 8 }} >
                                                <Ionicons name="play-circle-outline" size={50} color={'white'} />
                                            </ImageBackground>
                                        </View>
                                        <Text style={{ ...styles.videoTitle }} numberOfLines={3}>{item.title}</Text>
                                    </Pressable>
                                </Card>
                            )}
                            {item.doc_type === 'pdf' && (
                                <Card>
                                    <Pressable style={{ ...styles.playerList }} onPress={() => { download(item.doc_link, index); }}>
                                        <View style={{ width: 100 }}>
                                            <ImageBackground source={{ uri: 'https://bpilmobile.bergerindia.com/VIRTUAL_DOCS/SUVIDHA_API/Application/Application_Image/paper.png' }} resizeMode='contain' style={{ ...styles.backgroundContainerCoverThumaNail }} imageStyle={{ borderRadius: 8 }} >
                                                {(getSelectedDownloadIndex != index) ? (
                                                    <>
                                                        <FontAwesome name='download' size={25} style={{ color: Colors.dark_text_color, position: 'absolute', bottom: 0, right: 0 }} />
                                                    </>
                                                ) : (
                                                    <>
                                                        <ActivityIndicator size="large" />
                                                        <Text style={{ fontFamily: Fonts.OpenSans700Bold, fontSize: 16 }}>{downloadProgrress} %</Text>
                                                    </>
                                                )}
                                            </ImageBackground>
                                        </View>

                                        <Text style={{ ...styles.videoTitle }} numberOfLines={3}>
                                            <Text style={{ ...styles.videoTitle }} numberOfLines={3}>{item.title}</Text>
                                        </Text>
                                    </Pressable>
                                </Card>
                            )}
                        </View>
                    ))}
                    <View style={{ marginTop: 30 }}>
                        {tutorialsList.length === 0 && (
                            <NoDataFound content={t('noContactFound')} />
                        )}
                    </View>
                </View>
            </ScrollView>

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
}

export default AppTutorials;