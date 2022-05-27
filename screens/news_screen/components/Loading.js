import React from "react";
import {View, ActivityIndicator, Text} from "react-native";
import { styles } from "../../login_screen/LoginStyles";
import { Colors } from "react-native-paper";

const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" style={styles.loader} />
      <Text
        style={{
          color: Colors.amber900,
          padding: 5,
          backgroundColor: Colors.black,
        }}
      >
        Loading...
      </Text>
    </View>
  );
};

export default Loading;
