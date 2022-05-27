// import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "../login_screen/LoginStyles";
import { Colors } from "react-native-paper";
import Loading from "./components/Loading";

import { useDispatch, useSelector } from "react-redux";
import { getListOfNewsIds } from "../../app_store/listOfNewsIdsSlice";
// import NewsItem from "./components/NewsItem";
import {
  getNewsItem,
  getNewsObjectFromListOfIds,
} from "../../app_store/newsSlice";

//lazy loading component
const LazyNewsItem = React.lazy(() => import("./components/NewsItem"));

const NewsScreen = () => {
  const dispatch = useDispatch();
  const { listOfNewsIds } = useSelector((state) => state.listOfNewsIds);
  const { news, newsLoading } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getListOfNewsIds());
    loadMoreNews();
    console.log("STATE NEWS OBJECT", news);
  }, []);

  const loadMoreNews = async () => {
    await listOfNewsIds.forEach((id) => {
      dispatch(getNewsItem(id));
    });
    console.log("BATCHED NEWD OBJECTS", news);
  ;
  
  // if (newsLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" style={styles.loader} />
  //     </View>
  //   );
  // }

  const itemToRender = ({ item, index }) => (
    <View>
      <Suspense fallback={<Loading />}>
        <LazyNewsItem item={item} index={index} />
      </Suspense>
    </View>
  );

  const handleEmpty = () => {
    return (
      <Text style={styles.message}>
        No access to data! Please, make sure your internet is active.
      </Text>
    );
  };

  const header = () => (
    <View>
      <Text style={styles.title}> Updated News</Text>
    </View>
  );

  return (
    <ImageBackground
      style={{ flex: 1, marginTop: 45 }}
      source={require("../../assets/images/news_bg_gradient.png")}
    >
      <StatusBar backgroundColor="#f4511e" />
      <View style={{ ...styles.row, ...styles.textInputCont }}>
        <Image
          style={styles.icon}
          source={require("../../assets/images/brainstem_logo_black_white.png")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Search news Item"
          placeholderTextColor={Colors.amber900}
          value=""
        />
      </View>
      <View>
        <FlatList
          data={news}
          renderItem={itemToRender}
          // keyExtractor={(item) => item.key}
          // extraData={news}
          // onEndReached={loadMoreNews}
          ListHeaderComponent={header}
          ListEmptyComponent={handleEmpty}
          // maxToRenderPerBatch={10}
          // onScroll={loadMoreNews}
        />
      </View>
    </ImageBackground>
  );
};

export default NewsScreen;
