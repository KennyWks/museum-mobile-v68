import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Gap, Header, Input, Loading, Textarea} from '../../components';
import {postData} from '../../helpers/CRUD';
import {colors, useForm} from '../../utils';
//redux toolkit
import {connect, useSelector} from 'react-redux';

function SaranScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const ApiURL = useSelector(state => state.url);
  const languages = useSelector(state => state.languages);
  const [form, setForm] = useForm({
    nama: '',
    email: '',
    no_hp: '',
    saran: '',
  });
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    setLoading(true);
    try {
      const result = await postData(`${ApiURL}/api/saran`, form);
      const {message, success} = result.data;
      if (success) {
        setForm('reset');
        showMessage({
          message: message,
          type: 'success',
        });
      }
    } catch (error) {
      // console.log(error.response);
      const data = error.response.data.errors;
      if (data) {
        handleEachErrorMessage(data);
      } else {
        showMessage({
          message: 'Something Error',
          type: 'danger',
        });
      }
    }
    setLoading(false);
  };

  const handleEachErrorMessage = data => {
    if (data.nama) {
      showMessage({
        message: data.nama[0],
        type: 'danger',
      });
    }

    setTimeout(() => {
      if (data.email) {
        showMessage({
          message: data.email[0],
          type: 'danger',
        });
      }
    }, 3000);

    setTimeout(() => {
      if (data.saran) {
        showMessage({
          message: data.saran[0],
          type: 'danger',
        });
      }
    }, 6000);

    setTimeout(() => {
      if (data.no_hp) {
        showMessage({
          message: data.no_hp[0],
          type: 'danger',
        });
      }
    }, 9000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.page(tabBarHeight)}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header title={languages.formRecommendations.titleHeaderPage} />
          <Input
            label={languages.formRecommendations.name}
            value={form.nama}
            onChangeText={value => setForm('nama', value)}
            numKeyboardPad={false}
          />
          <Input
            label={languages.formRecommendations.email}
            value={form.email}
            onChangeText={value => setForm('email', value)}
            numKeyboardPad={false}
          />
          <Input
            label={languages.formRecommendations.phone}
            value={form.no_hp}
            onChangeText={value => setForm('no_hp', value)}
            numKeyboardPad={true}
          />
          <Textarea
            label={languages.formRecommendations.recommendations}
            numberOfLines={10}
            value={form.saran}
            onChangeText={value => setForm('saran', value)}
          />
          <Gap height={10} />
          <Button
            onPress={onSave}
            title={languages.button.buttonSave.label}
            type="dark"
          />
        </ScrollView>
      </View>
      {loading && <Loading />}
    </View>
  );
}

export default connect()(SaranScreen);

const styles = StyleSheet.create({
  container: {backgroundColor: colors.dark, flex: 1},
  page: tabBarHeight => ({
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 3,
    backgroundColor: colors.dark,
    marginBottom: tabBarHeight + 15,
  }),
});
