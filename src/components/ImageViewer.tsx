import React, { useEffect, useState, memo } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Share from 'react-native-share';
import { Colors } from '../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getFileExtension } from '../utils/uriToFileName';
import Video from 'react-native-video';
import * as utils from '../utils/index';
import VideoPlayer from 'react-native-video-player';

export interface I_ImageView {
  imagesList: { url: string; title: string }[];
  singleImage: { url: string; title: string };
  sendDataToParent: any;
}

const PhotoViewer = (props: I_ImageView) => {
  const [selectedImageList, setSelectedImageList] = useState<{ url: string; title: string }[]>([]);
  const [selectedImg, setSelectedImg] = useState({ url: '', title: '' });

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    let imagesList: any[] = [];
    if (props.singleImage.url) {
      console.log(props.singleImage.url)
      imagesList.push(props.singleImage);
      setSelectedImg(props.singleImage);
    } else if (props.imagesList.length > 0) {
      imagesList = props.imagesList;
    }
    setSelectedImageList(imagesList);
  }, [props]);

  useEffect(() => {
    if (selectedImageList.length > 0) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [selectedImageList]);

  const handleMove = (index: any) => {
    setSelectedImg(selectedImageList[index]);
  };

  const options = {
    url: selectedImg.url,
  };

  const onShare = async (myOptions = options) => {
    try {
      await Share.open(myOptions);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Modal visible={modalVisible} transparent={true} onRequestClose={() => { setModalVisible(!modalVisible); props.sendDataToParent(!modalVisible); }}>
        {getFileExtension(props.singleImage.url) != 'mp4' ? (
          <ImageViewer imageUrls={selectedImageList} onChange={handleMove} />
        ) : (
          <View style={{ backgroundColor: 'black', height: utils.Scale.screenHeight, width: utils.Scale.screenWidth }}>
            {props.singleImage.url && (

              <VideoPlayer
                //video={{ uri: props.singleImage.url }}
                showDuration={true}
                videoWidth={utils.Scale.screenWidth}
                videoHeight={utils.Scale.screenHeight} 
                source={{
                  uri: props.singleImage.url,
                }}
              />
              // <Video
              //   source={{ uri: props.singleImage.url }}
              //   style={{ height: utils.Scale.screenHeight, width: utils.Scale.screenWidth }}
              //   resizeMode="cover"
              //   controls={true}
              //   onBuffer={() => console.log('Buffering...')}
              //   onError={(error) => console.log('Error:', error)}
              // />
            )}
          </View>
        )}
        <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'black', padding: 10 }}>
          <View style={{ paddingHorizontal: 33 }}>
            <Text numberOfLines={2} style={{ fontSize: 14, color: 'white', textAlign: 'center' }}>{selectedImg.title} </Text>
          </View>
        </View>
        <Pressable style={{ position: 'absolute', right: 10, bottom: 10 }} onPress={async () => { await onShare(); }}>
          <Ionicons name="share-social-sharp" size={20} style={{ color: Colors.color_white }} />
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    alignSelf: 'center',
    margin: 20,
  },
});
export default memo(PhotoViewer);
