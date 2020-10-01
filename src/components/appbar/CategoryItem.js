import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

import Colors from 'ClarinVideos/src/res/colors';

const CategoryItem = ({item, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.textName}>{item.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 8,
    borderRadius: 8,
    borderColor: '#cdcdcd',
    borderWidth: 1,
    padding: 5,
    backgroundColor: Colors.blackPearl,
  },
  textName: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default CategoryItem;
