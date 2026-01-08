/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState, memo } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { Image } from 'react-native-compressor';
import { UploadDocument } from '../services/CommonAPI/commonapi.services';
import { useDispatch } from 'react-redux';
import { setbottomSheetHandler } from '../store/features/bottomSheetHandler/bottomSheetHandler';
import { setuploadImageHandler } from '../store/features/fileUpload/uploadImageUrlSlice';
import { setApiCallLoader } from '../store/features/apiCallLoader/apiCallLoader';
import { setuploadProgress } from '../store/features/fileUpload/uploadProgress';
import { bytesToHumanReadable } from '../utils/bytesConverter';
import i18n from '../i18n';
import { CommonToastModel } from '../utils/ToastMessageModel';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../helper/EndPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_STORAGE_KEY } from '../utils/localStorageKeys';

export interface I_ImageCrop {
  isPhoto: string;
  children?: never[];
  cropRequired: boolean;
  onImagePath?: Function;
  navigation: any;
  imageOptimize?: any;
  docType: string;
}

const ImageCorpPicker = (props: I_ImageCrop) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [width, setWidth] = useState(350);
  const [height, setHeight] = useState(500);
  const dispatch = useDispatch();

  const handleImagePicker = () => {
    ImagePicker.openPicker({
      path: selectedImage,
      width: 200,
      height: 200,
      cropping: props.cropRequired,
      cropperCircleOverlay: props.cropRequired,
      imgString: props.cropRequired,
      mediaType: 'photo',
    })
      .then(async image => {
        setHeight(height);
        setWidth(width);

        if (image.path && image.size < 2000000) {
          await imageCompress(image.path, image.mime);
        } else {
          CommonToastModel('error', i18n.t('Image2MBAlert'), 5000);
        }
      })
      .catch(err => {
        dispatch(setbottomSheetHandler({}));
        CommonToastModel('error', err?.error?.response?.data?.errorMessage || err?.response?.data?.errorMessage || err?.message || 'Something went wrong! Please try again sometime.', 8000);
      });
  };

  const handleCameraCapture = () => {
    ImagePicker.openCamera({
      path: selectedImage,
      width: 300,
      height: 300,
      cropping: props.cropRequired,
      cropperCircleOverlay: props.cropRequired,
      mediaType: 'photo',
    }).then(async image => {
      setHeight(height);
      setWidth(width);
      await imageCompress(image.path, image.mime);
      // if (image.path && image.size < 2000000) {
      //   console.log("2MB CHECK")
      //   await imageCompress(image.path, image.mime);
      // } else {
      // CommonToastModel('error', 'There is a maximum allowed file size of up to 2MB', 5000);
      // }
    }).catch(err => {
      dispatch(setbottomSheetHandler({}));
      CommonToastModel('error', err?.error?.response?.data?.errorMessage || err?.response?.data?.errorMessage || err?.message || 'Something went wrong! Please try again sometime.', 8000);
    });
  };

  // const handleCropImage = () => {
  //   if (props.cropRequired && selectedImage) {
  //     ImagePicker.openCropper({
  //       path: selectedImage,
  //       width: 300,
  //       height: 300,
  //       cropping: props.cropRequired,
  //       cropperCircleOverlay: props.cropRequired,
  //       mediaType: 'photo',
  //     })
  //       .then(image => {
  //         if (image.path) {
  //           imageCompress(image.path);
  //         }
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }
  // };


  // Image Compress
  const imageCompress = async (val: string, mimeType: string) => {
    const result = await Image.compress(val, {
      quality: props.imageOptimize ? props.imageOptimize : 8,
      // quality: 10,
    });

    const path = val;
    const parts = path.split('/');
    const fileNameWithExtension = parts[parts.length - 1]; // FILE NAME WITH EXTENSION
    const lastDotIndex = fileNameWithExtension.lastIndexOf('.');
    const fileName = fileNameWithExtension.substring(0, lastDotIndex); // FILE NAME
    const extension = fileNameWithExtension.substring(lastDotIndex + 1); // ONLY EXTENSION

    const phofileto = {
      uri: result,
      // type: mimeType,
      // name: fileNameWithExtension,
      fileName: fileName,
      type: 'image/png',
      name: 'photo.png',
    };
    dispatch(setuploadImageHandler(''));
    uploadImage(phofileto);
  };

  // FILE UPLOAD PROGRESS CALCULATE
  // const onUploadProgress = (progressEvent: any) => {
  //   const { loaded, total } = progressEvent;
  //   let percent = Math.floor((loaded * 100) / total);
  //   let percentDeci = Math.floor(loaded / total);
  //   dispatch(
  //     setuploadProgress({
  //       uploadpercent: percent,
  //       totalSize: bytesToHumanReadable(total),
  //       uploadSize: bytesToHumanReadable(loaded),
  //       percentDeci: percentDeci,
  //     }),
  //   );
  // };

  // IMAGE UPLOAD API CALL
  const uploadImage = async (path: any) => {
    const uploadData = new FormData();
    // uploadData.append(
    //   'doc_type',
    //   props.docType ? props.docType : 'commonImages',
    // );
    uploadData.append('doc', path);
    dispatch(setuploadImageHandler(''));
    dispatch(setApiCallLoader(true));
    // UploadDocument(uploadData, onUploadProgress).then(async (response: any) => {
    //   console.log("responseXXXXX", response);
    //   const userToken = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);
    //   console.log("userToken", userToken);
    //   dispatch(setApiCallLoader(false));
    //   dispatch(setuploadImageHandler(response.full_url));
    //   dispatch(setbottomSheetHandler({}));
    //   dispatch(
    //     setuploadProgress({
    //       uploadpercent: 0,
    //       totalSize: '',
    //       uploadSize: '',
    //       percentDeci: 0,
    //     }),
    //   );
    // })
    //   .catch((err: any) => {
    //     console.log("errorXXXXXXXXXX", err);
    //     dispatch(setApiCallLoader(false));
    //     CommonToastModel('error', err?.error?.response?.data?.errorMessage || err?.response?.data?.errorMessage || err?.message || 'Something went wrong! Please try again sometime.', 8000);
    //   });   

    uploadWithProgress(uploadData, (percent: any) => {
      console.log('Upload %:', percent);
      dispatch(
        setuploadProgress({
          uploadpercent: percent.uploadpercent,
          totalSize: percent.totalSize,
          uploadSize: percent.uploadSize,
          percentDeci: percent.percentDeci,
        }),
      );
    })
      .then((res: unknown) => {
        dispatch(setApiCallLoader(false));
        const fileUrl =
          typeof res === 'object' && res !== null && 'full_url' in res
            ? (res as { full_url: string }).full_url
            : '';
        dispatch(setuploadImageHandler(fileUrl));
        dispatch(setbottomSheetHandler({}));
        dispatch(
          setuploadProgress({
            uploadpercent: 0,
            totalSize: '',
            uploadSize: '',
            percentDeci: 0,
          }),
        );
      })
      .catch(err => {
        dispatch(setApiCallLoader(false));
        CommonToastModel('error', err || 'Something went wrong! Please try again sometime.', 8000);
      });
  };


  const uploadWithProgress = async (uploadData: any, onProgress: (arg0: any) => void) => {
    const userToken = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);
    const token = userToken?.slice(1, -1);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = uploadData;

      xhr.open(
        'POST',
        `${BASE_URL}${ENDPOINTS.UploadDocument}`
      );

      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);

      xhr.upload.addEventListener('progress', (event) => {
        if (!event.total) return;
  
        const loaded = event.loaded;
        const total = event.total;
  
        const percentDeci = (loaded / total) * 100;
        const percent = Math.floor(percentDeci);
  
        onProgress({
          uploadpercent: percent,
          totalSize: bytesToHumanReadable(total),
          uploadSize: bytesToHumanReadable(loaded),
          percentDeci: Number(percentDeci.toFixed(2)),
        });
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.responseText);
          }
        }
      };

      xhr.onerror = () => reject('Network error');
      xhr.send(formData);
    });
  };

  const captureVIdeo = () => {
    props.navigation.navigate('InAppVideoComponent');
  };

  useEffect(() => {
    if (props.isPhoto === 'camera') {
      handleCameraCapture();
    } else if (props.isPhoto === 'gallery') {
      handleImagePicker();
    } else if (props.isPhoto === 'video') {
      dispatch(setbottomSheetHandler({}));
      captureVIdeo();
    }
  }, [props.isPhoto]);

  return <></>;
};

export default memo(ImageCorpPicker);
