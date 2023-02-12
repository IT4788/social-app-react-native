import React, { useLayoutEffect, useState } from 'react';
import { StatusBar, View, FlatList } from 'react-native';
import styled from 'styled-components';
import AppBar from './components/AppBar';
import ToolBar from './components/ToolBar';
import Users from './components/Users';
import Story from './components/Story';
// import Feed from './components/Feed';
import { getNewFeeds } from '../../../services/post';
import { useAuthContext } from '../../../context/AuthContext';
import Post from '../../../components/Post';

const ITEMS_PER_PAGE = 5;

const Container = styled.SafeAreaView`
  flex: 1;
`;

const HomeScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user } = useAuthContext();
  const id = user?._id;

  useLayoutEffect(() => {
    if (!id) return;

    getNewFeeds({ perPage: ITEMS_PER_PAGE, numberPage: 1 }).then((data) => {
      const newPosts = data.data?.data?.posts || [];
      setHasMore(newPosts.length > 0);
      setUserPosts(newPosts);
    });
  }, [id]);

  async function handleLoadMorePost() {
    if (!hasMore) return;

    getNewFeeds({
      perPage: ITEMS_PER_PAGE,
      numberPage: currentPage + 1,
    }).then((data) => {
      const newPosts = data.data?.data?.posts || [];
      setHasMore(newPosts.length > 0);
      setUserPosts((prev) => prev.concat(newPosts));
      setCurrentPage(Number(data.data?.data?.pagination?.page));
    });
  }

  async function handleRefresh() {
    setIsRefreshing(true);
    getNewFeeds({ perPage: ITEMS_PER_PAGE, numberPage: 1 })
      .then((data) => {
        const newPosts = data.data?.data?.posts || [];
        setHasMore(newPosts.length > 0);
        setUserPosts(newPosts);
        setCurrentPage(1);
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  }

  console.log({ userPosts, currentPage, hasMore });

  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Container>
        <View>
          <FlatList
            ListHeaderComponent={() => (
              <View style={{ flex: 1 }}>
                <AppBar />
                <ToolBar navigation={navigation} />
                <Users />
                <Story />
              </View>
            )}
            data={userPosts}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <Post post={item} />}
            ListFooterComponent={null}
            onEndReached={handleLoadMorePost}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
          {/* <Feed /> */}
        </View>
      </Container>
    </>
  );
};

export default HomeScreen;
