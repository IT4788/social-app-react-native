import React, { useLayoutEffect, useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  // TouchableWithoutFeedback,
  // KeyboardAvoidingView,
} from 'react-native';
import * as navigation from '../../../navigation/helpers';
import { AntDesign } from '@expo/vector-icons';

import { FontAwesome } from '@expo/vector-icons';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Comment from '../../../components/Comment';
import { useRoute } from '@react-navigation/native';
import { createPostComment, getPostComments } from '../../../services/comment';
import AppText from '../../../components/AppText';
import useUpload from '../../../hooks/useUpload';

const ITEMS_PER_PAGE = 10;

const CommentsScreen = () => {
  const route = useRoute();
  const id = route.params.id;

  const [postComments, setPostComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const { handleUploadFile, handleOpenImageLib } = useUpload();

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

  const handleSendComment = () => {
    if (!image && !text.trim()) {
      return;
    }

    const data = { postId: id };
    if (text.trim()) {
      data.describe = text.trim();
    }

    if (image) {
      data.images = [image];
    }

    createPostComment(data)
      .then((commentData) => {
        setPostComments((prev) => [commentData.data.data.comment, ...prev]);
        setImage(null);
        setText('');
      })
      .catch(console.log);
  };

  async function handleSelectAImage() {
    const result = await handleOpenImageLib();

    if (result?.base64) {
      let base64Img = `data:image/jpg;base64,${result.base64}`;
      const uploadRes = await handleUploadFile(base64Img);

      uploadRes && setImage(uploadRes);
    }
  }

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
        <TouchableOpacity
          onPress={handleSelectAImage}
          style={styles.cameraIconWrapper}
        >
          <FontAwesome5Icon name="camera" size={20}></FontAwesome5Icon>
        </TouchableOpacity>
        <View style={styles.textInputWrapper}>
          <TextInput
            value={text}
            onChangeText={(text) => setText(text)}
            autoFocus={true}
            style={styles.textInput}
          ></TextInput>
        </View>
        <View style={styles.iconWrapper}>
          <TouchableOpacity style={styles.iconItem} onPress={handleSendComment}>
            <FontAwesome name="send" size={20}></FontAwesome>
          </TouchableOpacity>
        </View>
      </View>
      {image ? (
        <View>
          <Image
            style={{
              width: 50,
              height: 50,
              position: 'absolute',
              bottom: 60,
              borderRadius: 6,
              left: 10,
            }}
            source={{
              uri: image,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setImage(null);
            }}
          >
            <AntDesign
              style={{
                position: 'absolute',
                bottom: 100,
                left: 60,
              }}
              name="close"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
      ) : null}
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
    flex: 1,
  },
  textInput: {
    width: '100%',
    height: 40,
    flex: 1,
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
