import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { styles as NewsStyles } from ".././NewsStyles";

const NewsItem = ({ item, index, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Details", {url: item.url});
      }}
    >
      <View style={NewsStyles.card}>
        <Text style={NewsStyles.newsTitle}>
          {index + 1} {item}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default NewsItem;
