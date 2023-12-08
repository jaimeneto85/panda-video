import * as React from "react";
import { PandaVideo, VideoProps } from "./video.type";
import { Video, ResizeMode } from "expo-av";
import { WebView } from "react-native-webview";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { ButtonVideo } from "./video.component.style";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import { downloadVideo, useDownload } from "../services/download";

interface VideoItemProps {
  video: PandaVideo;
  shouldPlay?: boolean;
  type?: "archive" | "explore" | "view";
}
export const VideoItem = ({
  video,
  shouldPlay,
  type,
}: VideoItemProps): JSX.Element => {
  const [videoOffline, setVideoOffline] = React.useState(null);
  const navigation = useNavigation();
  const videoRef = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [connectionType, setConnectionType] = React.useState("");

  const { isLoading, progresss, setIsLoading, setProgress } = useDownload();
  const videoStorage = React.useMemo(async () => {
    try {
      const videoListRaw = await AsyncStorage.getItem("@videos");
      const videoList = JSON.parse(videoListRaw || "[]");
      const videoRaw = videoList.find(
        (item: PandaVideo) => item.id === video.id
      );
      return videoRaw;
    } catch (error) {
      console.log("error storage", error);
    }
  }, [video.id]);

  React.useEffect(() => {
    videoStorage.then((res) => {
      setVideoOffline(res);
    });
  }, [videoStorage]);

  NetInfo.fetch().then((state) => {
    setConnectionType(state.type);
  });
  const handleDownload = React.useCallback(() => {
    if (!isLoading && connectionType === "wifi") {
      downloadVideo(video, setIsLoading, setProgress);
    } else if (connectionType !== "wifi") {
      Alert.alert(
        "Você não está conectado a uma rede wifi",
        "Deseja baixar mesmo assim?",
        [
          {
            text: "Não",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Sim",
            onPress: () => downloadVideo(video, setIsLoading, setProgress),
          },
        ],
        { cancelable: true }
      );
    }
  }, [video, isLoading]);
  //verificar se o video esta em cachenp
  if (videoOffline && videoOffline?.uri) {
    return (
      <View style={{ flex: 1 }}>
        <Video
          ref={videoRef}
          source={{
            uri: videoOffline.uri,
          }}
          style={[StyleSheet.absoluteFill, { flex: 1 }]}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={shouldPlay}
          isMuted
          isLooping
          posterStyle={{
            resizeMode: "cover",
          }}
        />
        {type !== "view" && (
          <ButtonVideo
            onPress={() => navigation.navigate("VideoView", { video })}
          >
            <MaterialIcons name="ondemand-video" size={24} color="white" />
          </ButtonVideo>
        )}
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1 }}
          javaScriptEnabled={true}
          source={{
            uri: video.video_player,
          }}
        />
        {type !== "view" && !videoOffline?.uri && (
          <ButtonVideo
            onPress={handleDownload}
            style={{ flexDirection: "row" }}
          >
            {progresss == 0 && !isLoading && (
              <Feather name="download-cloud" size={24} color="white" />
            )}
            {progresss == 0 && isLoading && (
              <Text style={{ color: "white" }}>Baixando...</Text>
            )}
            {progresss > 0 && isLoading && (
              <Text style={{ color: "white" }}>
                {Math.round(progresss * 1000) / 10}%
              </Text>
            )}
          </ButtonVideo>
        )}
        {type !== "view" && (
          <ButtonVideo
            onPress={() => navigation.navigate("VideoView", { video })}
          >
            <MaterialIcons name="ondemand-video" size={24} color="white" />
          </ButtonVideo>
        )}
      </View>
    );
  }
};
