import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import moment from 'moment';
import 'moment/locale/id';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {Loading} from '../../components';
import {getData} from '../../helpers/CRUD';
import {colors} from '../../utils';
//redux toolkit
import {showMessage} from 'react-native-flash-message';
import {connect, useSelector} from 'react-redux';

function GetStarted() {
  const tabBarHeight = useBottomTabBarHeight();
  // const [results, setResult] = useState([]);
  const [articles, setArticles] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshingEvents, setRefreshingEvents] = React.useState(false);
  const [refreshingArticles, setRefreshingArticles] = React.useState(false);

  const languages = useSelector(state => state.languages);
  const ApiURL = useSelector(state => state.url);

  useEffect(() => {
    setLoading(true);
    getArticles();
    getEvents();
    setLoading(false);
  }, []);

  // const fetchRequest = async () => {
  //   const data = await fetch(
  //     `https://api.unsplash.com/search/photos?page=1&query=museum&client_id=FFXaGqhfuZToC9Ou3mrdOxHUQvNkol58lxAyQQmh4lo&per_page=5`,
  //   );
  //   const dataJ = await data.json();
  //   const imageData = dataJ.results;
  //   setResult(imageData);
  // };

  const getArticles = async () => {
    try {
      const resultArticles = await getData(`${ApiURL}/api/getArtikel`);
      setArticles(resultArticles.data.data);
    } catch (error) {
      // console.log(error);
      handleErrorMessage('Something Error!');
    }
  };

  const getEvents = async () => {
    try {
      const resultEvents = await getData(`${ApiURL}/api/getKegiatan`);
      setEvents(resultEvents.data.data);
    } catch (error) {
      // console.log(error);
      handleErrorMessage('Something Error!');
    }
  };

  const onRefreshEvents = React.useCallback(() => {
    setRefreshingEvents(true);
    getEvents();
    setRefreshingEvents(false);
  }, []);

  const onRefreshArticles = React.useCallback(() => {
    setRefreshingArticles(true);
    getArticles();
    setRefreshingArticles(false);
  }, []);

  const handleErrorMessage = message => {
    showMessage({
      message: message,
      type: 'danger',
    });
  };

  return (
    <>
      {!loading && (
        <View style={styles.content}>
          {/* Start Events Section */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {languages.homePage.cardTitle.events}
            </Text>
          </View>
          <View style={styles.listCardSatu}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshingEvents}
                  onRefresh={onRefreshEvents}
                />
              }>
              {events.map((val, i) => (
                <TouchableHighlight
                  key={i}
                  onPress={() => {
                    Linking.openURL(`${ApiURL}/event/${val.kegiatan_id}`);
                  }}>
                  <View style={styles.cardItem}>
                    <View style={styles.cardImage}>
                      <Image
                        style={styles.image}
                        // source={{
                        //   uri: val.urls.small,
                        // }}
                        source={{
                          uri: ApiURL + val.gambar + '?' + new Date(),
                        }}
                      />
                    </View>
                    <View style={styles.cardDetail}>
                      <Text style={styles.titleShadow}>
                        {moment(val.created_at)
                          .locale(languages.locale)
                          .format('DD MMM YYYY HH:mm')}
                      </Text>
                      <Text style={styles.titleCardEvents}>
                        {val.nama_kegiatan}
                      </Text>
                      <Text style={styles.titleShadow}>{val.keterangan}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              ))}
            </ScrollView>
          </View>
          {/* End Events Section */}

          {/* Start Berita section */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {languages.homePage.cardTitle.articles}
            </Text>
          </View>
          <View style={styles.listCardDua(tabBarHeight)}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshingArticles}
                  onRefresh={onRefreshArticles}
                />
              }>
              {articles.map((val, i) => (
                <TouchableHighlight
                  key={i}
                  onPress={() => {
                    Linking.openURL(`${ApiURL}/artikel/${val.artikel_id}`);
                  }}>
                  <View style={styles.cardNews}>
                    <Text style={styles.newsTitle}>{val.judul}</Text>
                    <Text style={styles.newsPublishTime}>
                      {languages.published_at}
                      {moment(val.created_at)
                        .locale(languages.locale)
                        .format('ddd, DD MMM YYYY HH:mm')}
                    </Text>
                  </View>
                </TouchableHighlight>
              ))}
            </ScrollView>
          </View>
          {/* End Berita section */}
        </View>
      )}
      {loading && <Loading />}
    </>
  );
}
export default connect()(GetStarted);

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.dark,
    flex: 1,
  },
  titleContainer: {
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text.default,
    marginVertical: 10,
    letterSpacing: 5,
  },
  listCardSatu: {
    backgroundColor: colors.dark,
    flex: 5,
    marginHorizontal: 12,
  },
  listCardDua: tabBarHeight => ({
    backgroundColor: colors.dark,
    flex: 5,
    marginHorizontal: 12,
    maxHeight: 700,
    marginBottom: tabBarHeight + 15,
  }),
  cardNews: {
    marginHorizontal: 2,
    marginVertical: 3,
    padding: 15,
    backgroundColor: colors.middleLight,
    borderRadius: 2,
    borderWidth: 0,
    borderColor: colors.light,
  },
  cardItem: {
    flex: 3,
    flexDirection: 'row',
    marginHorizontal: 2,
    marginVertical: 3,
    maxHeight: 800,
    padding: 5,
    backgroundColor: colors.middleLight,
    borderRadius: 2,
    borderWidth: 0,
    borderColor: colors.light,
  },
  cardImage: {
    flex: 2,
    maxHeight: 120,
    flexDirection: 'column',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 2,
    resizeMode: 'cover',
  },
  cardDetail: {
    flex: 3,
    height: '100%',
    flexDirection: 'column',
    paddingLeft: 10,
  },
  titleCardEvents: {
    fontSize: 20,
    fontWeight: '600',
    maxWidth: 200,
    color: colors.text.default,
    marginVertical: 10,
  },
  titleShadow: {
    fontSize: 13,
    fontWeight: '500',
    maxWidth: 200,
    color: colors.midDark,
  },
  newsTitle: {
    fontSize: 17,
    fontWeight: '700',
    maxWidth: 900,
    color: colors.text.default,
    marginVertical: 8,
  },
  newsPublishTime: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.midDark,
  },
});
