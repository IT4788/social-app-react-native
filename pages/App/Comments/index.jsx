import React, { useLayoutEffect, useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  // TouchableWithoutFeedback,
  // KeyboardAvoidingView,
} from 'react-native';
import * as navigation from '../../../navigation/helpers';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Comment from '../../../components/Comment';
import { useRoute } from '@react-navigation/native';
import { getPostComments } from '../../../services/comment';
import AppText from '../../../components/AppText';

const ITEMS_PER_PAGE = 10;

const CommentsScreen = () => {
  const route = useRoute();
  const id = route.params.id;

  const [postComments, setPostComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  function onPressBackDropHandler() {
    navigation.goBack();
  }

  useLayoutEffect(() => {
    if (!id) return;

    getPostComments(id, { perPage: ITEMS_PER_PAGE, numberPage: 1 }).then(
      (data) => {
        setTotalPage(
          Math.ceil(data.data?.data.pagination.total / ITEMS_PER_PAGE),
        );
        setPostComments(data.data?.data?.comments || []);
      },
    );
  }, [id]);

  const hasMore = currentPage < totalPage;
  async function handleLoadMoreComments() {
    if (!hasMore) return;

    getPostComments(id, {
      perPage: ITEMS_PER_PAGE,
      numberPage: currentPage + 1,
    }).then((data) => {
      setTotalPage(
        Math.ceil(Number(data.data?.data.pagination.total) / ITEMS_PER_PAGE),
      );
      setPostComments((prev) => prev.concat(data.data?.data?.comments || []));
      setCurrentPage(Number(data.data?.data?.pagination?.page));
    });
  }

  console.log({ postComments });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.navigationStackBar}>
        <TouchableOpacity
          onPress={onPressBackDropHandler}
          style={styles.btnBack}
        >
          <FontAwesome5Icon name="arrow-left" size={24}></FontAwesome5Icon>
        </TouchableOpacity>
        <View style={styles.stackBarTitle}>
          <AppText style={{ fontSize: 16 }}>Comments</AppText>
        </View>
      </View>

      <FlatList
        data={postComments}
        renderItem={({ item }) => <Comment comment={item} />}
        keyExtractor={(item) => item._id}
        ListFooterComponent={null}
        onEndReached={handleLoadMoreComments}
        style={{ marginBottom: 50, padding: 10, backgroundColor: '#fff' }}
      />

      <View style={styles.commentInputWrapper}>
        <TouchableOpacity style={styles.cameraIconWrapper}>
          <FontAwesome5Icon name="camera" size={20}></FontAwesome5Icon>
        </TouchableOpacity>
        <View style={styles.textInputWrapper}>
          <TextInput autoFocus={true} style={styles.textInput}></TextInput>
        </View>
        <View style={styles.iconWrapper}>
          <TouchableOpacity style={styles.iconItem}>
            <FontAwesome5Icon
              name="grip-horizontal"
              size={20}
            ></FontAwesome5Icon>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconItem}>
            <FontAwesome5Icon name="grin-wink" size={20}></FontAwesome5Icon>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommentsScreen;

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#ddd',
    width: '100%',
    height: screenHeight - 92,
  },
  commentInputWrapper: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsWrapper: {
    marginBottom: 50,
    padding: 10,
    backgroundColor: '#fff',
  },
  cameraIconWrapper: {
    backgroundColor: '#ddd',
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputWrapper: {
    height: 40,
    borderTopLeftRadius: 48,
    borderBottomLeftRadius: 48,
    backgroundColor: '#ddd',
    marginLeft: 10,
    width: screenWidth - 40 - 80 - 30 - 10, //camera:40,padding:30,2 icon: 80,margin:10
    borderRightWidth: 0,
  },
  textInput: {
    width: '100%',
    height: 40,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  iconWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderTopRightRadius: 48,
    borderBottomRightRadius: 48,
    height: 40,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 0,
  },
  navigationStackBar: {
    flexDirection: 'row',
    // height: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
    height: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: '#8e8e8e',
  },
  iconItem: {
    width: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBack: {
    zIndex: 99,
  },
  stackBarTitle: {
    position: 'absolute',
    width: screenWidth,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
