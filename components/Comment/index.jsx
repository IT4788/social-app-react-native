import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { getUserAvatar } from '../../utils/image';
import AppText from '../AppText';
import ScaledImage from '../ScaledImage';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

const Comment = ({ comment }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: getUserAvatar(comment.userId) }}
      ></Image>
      <View style={styles.centerContainer}>
        <View style={styles.contentContainer}>
          <TouchableOpacity>
            <AppText style={styles.name}>{comment.userId?.username}</AppText>
          </TouchableOpacity>
          <AppText style={styles.content}>{comment.describe}</AppText>
        </View>
        {comment.images?.length ? (
          <View style={{ marginTop: 10 }}>
            <ScaledImage
              width={screenWidth * 0.7}
              style={styles.image}
              source={comment.images[0]}
            />
          </View>
        ) : null}
        <View style={styles.toolContainer}>
          <AppText style={styles.createAt}>
            {dayjs(comment?.createdAt).fromNow()}
          </AppText>
          {/* <TouchableOpacity style={styles.likeBtn}>
            <Text>Like</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.replyBtn}>
            <Text>Reply</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default Comment;

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  centerContainer: {
    width: screenWidth * 0.7,
  },
  contentContainer: {
    // marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    backgroundColor: '#e9ebee',
    borderRadius: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  content: {},
  image: {
    borderRadius: 10,
  },
  toolContainer: {
    marginTop: 5,
    flexDirection: 'row',
    width: 0.6 * screenWidth,
  },
  createAt: {
    flex: 1,
    fontSize: 12,
  },
  likeBtn: {
    textAlign: 'center',
    flex: 1,
  },
  replyBtn: {
    textAlign: 'center',
    flex: 1,
  },
});
