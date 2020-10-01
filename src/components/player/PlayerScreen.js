import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

import Colors from 'ClarinVideos/src/res/colors';

// import convertToProxyURL from 'react-native-video-cache';
import Video from 'react-native-video';

const PlayerScreen = (props) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {video} = props.route.params;

  useEffect(() => {
    props.navigation.setOptions({title: video.title});
  }, [video.id]);

  return (
    <View style={styles.container}>
      <Video
        // source={{uri: convertToProxyURL(video.videoFiles.mp4)}}
        source={{uri: video.videoFiles.mp4}}
        fullscreen={true}
        controls={true}
        resizeMode="cover"
        fullscreenAutorotate={false}
        fullscreenOrientation="landscape"
        ref={(ref) => {}}
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoad={() => {
          setLoading(false);
        }}
        onError={() => {
          setError(true);
        }}
        style={styles.backgroundVideo}
      />

      {loading && (
        <ActivityIndicator style={styles.loader} color="#fff" size="large" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
    justifyContent: 'flex-start',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  loader: {
    position: 'absolute',
    marginTop: 140,
    alignSelf: 'center',
  },
});

export default PlayerScreen;
