import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { VideoItem } from "./Video.component";
import { ButtonVideo } from "./video.component.style";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { deleteVideo } from "../services/download";
import NetInfo from "@react-native-community/netinfo";

import { downloadVideo, useDownload } from "../services/download";

export function VideoScreen({ route: { params } }) {
  const navigation = useNavigation();
  const [connectionType, setConnectionType] = React.useState("");
  const { isLoading, progresss, setIsLoading, setProgress } = useDownload();
  navigation.setOptions({ title: params.video.id });
  const [video, setVideo] = React.useState(params.video);
  const VideoComponent = React.useMemo(
    () => <VideoItem video={video} shouldPlay={true} type="view" />,
    [video]
  );

  NetInfo.fetch().then((state) => {
    setConnectionType(state.type);
  });

  const handleDownload = React.useCallback(async () => {
    if (!isLoading && connectionType === "wifi") {
      const videoDownloaded = await downloadVideo(
        video,
        setIsLoading,
        setProgress
      );
      setVideo(videoDownloaded);
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
            onPress: async () => {
              const videoDownloaded = await downloadVideo(
                video,
                setIsLoading,
                setProgress
              );
              setVideo(videoDownloaded);
            },
          },
        ],
        { cancelable: true }
      );
    }
  }, [video, isLoading]);

  return (
    <View style={[{ flex: 1, height: "100%" }, StyleSheet.absoluteFill]}>
      {VideoComponent}
      {video?.uri?.includes("file:") && (
        <ButtonVideo
          style={{ backgroundColor: "red" }}
          onPress={() => deleteVideo(video, () => navigation.goBack())}
        >
          <Feather name="trash" size={24} color="white" />
        </ButtonVideo>
      )}
      {!!video?.video_player && !video?.uri?.includes("file:") && (
        <ButtonVideo onPress={handleDownload}>
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
    </View>
  );
}
