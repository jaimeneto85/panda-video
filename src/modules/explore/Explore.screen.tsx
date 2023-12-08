import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";

import { Container, TitleScreen } from "./Explore.screen.style";
import { VideoItem } from "../video/Video.component";

import { getVideos, useRequestProcessor } from "./Explore.service";

const VIDEO_LIST = [
  {
    id: "0",
    source: { uri: "https://www.youtube.com/watch?v=0uGETVnkujA" },
    title: "Video 1",
    description: "Description 1",
  },
  {
    id: "1",
    source: { uri: "https://www.youtube.com/watch?v=0uGETVnkujA" },
    title: "Video 2",
    description: "Description 2",
  },
  {
    id: "2",
    source: { uri: "https://www.youtube.com/watch?v=0uGETVnkujA" },
    title: "Video 3",
    description: "Description 3",
  },
  {
    id: "3",
    source: { uri: "https://www.youtube.com/watch?v=0uGETVnkujA" },
    title: "Video 4",
    description: "Description 4",
  },
  {
    id: "4",
    source: { uri: "https://www.youtube.com/watch?v=0uGETVnkujA" },
    title: "Video 5",
    description: "Description 5",
  },
];

function ExploreScreen() {
  const [page, setPage] = React.useState(1);
  const limit = 10;
  const { query } = useRequestProcessor();

  const { data, isLoading, isError, refetch } = query(
    ["videos", page],
    () => getVideos(page, limit).then((res) => res),
    {
      enabled: true,
    }
  );
  const Header = () => (
    <Container>
      <TitleScreen>Explore</TitleScreen>
    </Container>
  );

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          height: 300,
          minHeight: 300,
          width: Dimensions.get("screen").width / 2 - 5,
          padding: 10,
        }}
      >
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <VideoItem video={item} shouldPlay={false} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        onRefresh={refetch}
        refreshing={isLoading}
        data={data?.videos}
        ListHeaderComponent={Header}
        columnWrapperStyle={{ flex: 1, justifyContent: "space-between" }}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ flex: 1, paddingHorizontal: 5 }}
      />
    </SafeAreaView>
  );
}

export default ExploreScreen;
