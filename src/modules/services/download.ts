import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { useState } from 'react';

async function downloadVideo(video, setIsLoading, setProgress) {
  
  // const {setIsLoading, setProgress} = useDownload();
  setIsLoading(true);
  const url = `https://download-us01.pandavideo.com:7443/videos/${video.id}/download`;

  async function checkFreeSpace() {
    try {
      const freeDiskStorage = await FileSystem.getFreeDiskStorageAsync();
      console.log(`Espaço livre: ${freeDiskStorage} bytes`);
  
      // Para exibir em megabytes (MB)
      const freeDiskStorageMB = freeDiskStorage / 1024 / 1024;
      return freeDiskStorageMB;
    } catch (error) {
      console.error("Não foi possível obter o espaço livre no disco:", error);
    }
  }
  const freeSpace = await checkFreeSpace();
  
  try {
    const uri = FileSystem.documentDirectory + `${video.id}.mp4`;
    const downloadResumable = FileSystem.createDownloadResumable(
      url,
      uri,
      {
        headers: {
          Authorization: `${process.env.PANDA_API_KEY}`,
        }
      },
      (downloadProgress) => {
        const progress =
          downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite;
        setProgress(progress);
        console.log(`Progresso do download: ${progress*100}%`);
      }
    );

    const { uri: localUri } = await downloadResumable.downloadAsync();
    const videoOffline = { ...video, uri: localUri };
    const videoListRaw = await AsyncStorage.getItem('@videos');
    const videoList = videoListRaw ? JSON.parse(videoListRaw) : [];
    const videoOnStorage = videoList.find((item) => item.id === video.id);
    if(videoOnStorage) {
      const videoIndex = videoList.findIndex((item) => item.id === video.id);
      videoList[videoIndex] = videoOffline;
    } else {
      videoList.push(videoOffline);
    }
    AsyncStorage.setItem('@videos', JSON.stringify(videoList));
    setProgress(0);
    return localUri;
  } catch (e) {
    console.error(e);
  } finally {
    setIsLoading(false);
  }
}

function useDownload() {
  const [isLoading, setIsLoading] = useState(false);
  const [progresss, setProgress] = useState(0);
  const [error, setError] = useState(null);

  return {
    isLoading,
    progresss,
    error,
    setIsLoading,
    setProgress,
    setError,
  }
}


export { downloadVideo, useDownload }