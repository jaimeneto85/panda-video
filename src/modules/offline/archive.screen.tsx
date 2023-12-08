import * as React from "react";
import { FlatList, Dimensions, Text, View } from "react-native";
import { Container, TitleScreen } from "./archive.screen.style";

import { VideoItem } from "../video/Video.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function ArchiveScreen() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  const fetch = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await AsyncStorage.getItem("@videos");
      const data = JSON.parse(res || "[]");
      setData(data);
    } catch (error) {
      console.log("error storage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetch();
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    AsyncStorage.getItem("@videos").then((res) => {
      const data = JSON.parse(res || "[]");
      setData(data);
    });
    // fetch data
  }, []);

  const limit = 10;

  const Header = () => (
    <Container>
      <TitleScreen>Archive</TitleScreen>
    </Container>
  );

  const EmptList = () => (
    <Container>
      <Text>Você não baixou nenhum video para assistir offline ainda!</Text>
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
    <FlatList
      data={data}
      onRefresh={fetch}
      refreshing={loading}
      renderItem={renderItem}
      columnWrapperStyle={{ flex: 1, justifyContent: "space-between" }}
      numColumns={2}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={Header}
      ListEmptyComponent={EmptList}
      onEndReachedThreshold={0.1}
    />
  );
}
