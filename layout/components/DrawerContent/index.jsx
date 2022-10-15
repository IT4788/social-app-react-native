import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawerContent = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{
                    backgroundColor: '#8200d6',
                    paddingTop: 0,
                    broderWidth: 0,
                }}
            >
                <ImageBackground
                    source={require('../../../assets/images/menu-bg.jpeg')}
                    style={styles.userInfoSection}
                >
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <View>
                            <Avatar.Image
                                size={50}
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e',
                                }}
                                style={styles.avatar}
                            />
                        </View>
                        <View>
                            <Title style={[styles.caption, styles.title]}>
                                Dao Van Luong
                            </Title>
                            <Caption style={styles.caption}>
                                daovanluong@gmail.com
                            </Caption>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.section}>
                            <Title style={[styles.caption, styles.followTitle]}>
                                80{' '}
                            </Title>
                            <Caption style={styles.caption}>following</Caption>
                        </View>
                        <View style={styles.section}>
                            <Title style={[styles.caption, styles.followTitle]}>
                                80{' '}
                            </Title>
                            <Caption style={styles.caption}>followers</Caption>
                        </View>
                    </View>
                </ImageBackground>
                <View style={{ backgroundColor: '#fff' }}>
                    <DrawerItem
                        label="Home"
                        icon={({ size }) => (
                            <Icon
                                name="home-outline"
                                color={'#333'}
                                size={size}
                            />
                        )}
                        labelStyle={{
                            fontSize: 15,
                            marginLeft: -20,
                            color: '#333',
                        }}
                        onPress={() => {}}
                    />
                    <DrawerItem
                        label="Home"
                        icon={({ size }) => (
                            <Icon
                                name="home-outline"
                                color={'#333'}
                                size={size}
                            />
                        )}
                        labelStyle={{
                            fontSize: 15,
                            marginLeft: -20,
                            color: '#333',
                        }}
                        onPress={() => {}}
                    />
                    <DrawerItem
                        label="Home"
                        icon={({ size }) => (
                            <Icon
                                name="home-outline"
                                color={'#333'}
                                size={size}
                            />
                        )}
                        labelStyle={{
                            fontSize: 15,
                            marginLeft: -20,
                            color: '#333',
                        }}
                        onPress={() => {}}
                    />
                    <DrawerItem
                        label="Home"
                        icon={({ size }) => (
                            <Icon
                                name="home-outline"
                                color={'#333'}
                                size={size}
                            />
                        )}
                        labelStyle={{
                            fontSize: 15,
                            marginLeft: -20,
                            color: '#333',
                        }}
                        onPress={() => {}}
                    />
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}></Drawer.Section>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        padding: 20,
    },
    avatar: { marginRight: 10 },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: '#fff',
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    followTitle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

export default DrawerContent;
