import React, {useState, useEffect} from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Colors from 'ClarinVideos/src/res/colors';
import Moment from 'moment';

import CachedImage from 'react-native-image-cache-wrapper';

import {useSelector, useDispatch} from 'react-redux';
import {
  addFavorite,
  removeFavorite,
} from 'ClarinVideos/src/libs/redux/actions/favorites';

const isPortrait = () => {
  const dim = Dimensions.get('window');
  return dim.height >= dim.width;
};

const VideoItem = ({item, onPress}) => {
  Moment.locale('es');
  const dimensions = Dimensions.get('window');

  const favorites = useSelector((state) => state.favorites);

  const dispatch = useDispatch();

  const [orientation, setOrientation] = useState(
    isPortrait() ? 'portrait' : 'landscape',
  );

  const [imageWidth, setImageWidth] = useState(
    dimensions.width > dimensions.height ? dimensions.width : dimensions.height,
  );

  const [imageHeight, setImageHeight] = useState(
    Math.round(
      ((dimensions.width > dimensions.height
        ? dimensions.height
        : dimensions.width) *
        9) /
        12,
    ),
  );

  Dimensions.addEventListener('change', () => {
    setOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  const toogleFavorite = () => {
    if (!favorites.find((v) => v.id.toString() === item.id.toString())) {
      dispatch(addFavorite(item));
    } else {
      dispatch(removeFavorite(item));
    }
  };

  return (
    <Pressable
      style={[
        styles.container,
        {
          marginHorizontal: orientation === 'landscape' ? 6 : 0,
        },
      ]}
      key={item.id}
      onPress={onPress}>
      <View style={styles.container}>
        {item.related &&
        item.related.relatedImages &&
        item.related.relatedImages.length > 0 ? (
          <CachedImage
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
            source={{
              uri: item.related.relatedImages[0].url.replace(
                '/thumbs_vodgc_net/',
                'http://thumbs.vodgc.net/',
              ),
            }}
          />
        ) : null}

        <Image
          style={styles.playIcon}
          source={require('ClarinVideos/src/assets/play.png')}
        />

        <View style={styles.containerTopInfo}>
          <Text style={styles.title}>{item.title}</Text>

          <Text style={styles.publishedDate}>
            {Moment(new Date(item.publishedDate * 1000)).format('DD MMM H:mm')}
          </Text>
        </View>
        <View style={styles.containerBottomInfo}>
          <View style={styles.containerBottomLeftInfo}>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <Text style={styles.summary}>
              {item.summary.replace(/<p>/g, '').replace(/<\/p>/g, '').trim()}
            </Text>
          </View>
          <Pressable onPress={toogleFavorite} style={styles.btnFavorite}>
            <Image
              style={styles.imgIcon}
              source={
                favorites.find((v) => v.id.toString() === item.id.toString())
                  ? require('ClarinVideos/src/assets/full_star.png')
                  : require('ClarinVideos/src/assets/empty_star.png')
              }
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1,
    marginVertical: 6,
  },
  containerTopInfo: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    padding: 10,
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.8)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerBottomInfo: {
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    paddingLeft: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: 100,
    paddingBottom: 8,
  },
  containerBottomLeftInfo: {
    flex: 1,
  },
  btnFavorite: {
    flex: 0.1,
    marginRight: 14,
    display: 'flex',
    alignItems: 'center',
    width: 32,
  },
  publishedDate: {
    top: 0,
    right: 0,
    color: Colors.white,
    fontSize: 13,
    flex: 0.4,
    textAlign: 'right',
  },
  title: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  subtitle: {
    color: Colors.cian,
    fontWeight: 'bold',
    fontSize: 16,
  },
  summary: {
    color: Colors.white,
    fontSize: 14,
    flex: 1,
  },
  imgIcon: {
    width: 32,
    height: 32,
    borderRadius: 50,
  },
  playIcon: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50,
  },
});

export default VideoItem;
