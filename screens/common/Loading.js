import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loading = ({ size }) => {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color="#0000ff"/>
    </View>
  );
};

const styles = {
  spinnerContainer: {
    //flex: 1,
    marginTop: 12,
    marginBottom: 12,
	justifyContent: "center"
  }
};

export { Loading };