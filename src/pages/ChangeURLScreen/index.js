import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Button, Gap, Input, Loading} from '../../components';
import {colors} from '../../utils';
//redux toolkit
import {connect, useDispatch, useSelector} from 'react-redux';
import ActionType from '../../redux/reducer/globalActionType';

function ChangeURLScreen() {
  const languages = useSelector(state => state.languages);
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const onSave = () => {
    setLoading(true);
    dispatch({type: ActionType.CHANGE_SERVER, option: url});
    setLoading(false);
    handleErrorMessage(languages.success);
  };

  const handleErrorMessage = message => {
    showMessage({
      message: message,
      type: 'success',
    });
  };

  return (
    <View style={styles.container}>
      {!loading && (
        <View style={styles.container}>
          <View style={styles.page}>
            <Input
              label={languages.example}
              value={url}
              onChangeText={value => setUrl(value)}
              numKeyboardPad={false}
            />
            <Gap height={5} />
            <Button
              onPress={onSave}
              title={languages.button.buttonSave.label}
              type="dark"
            />
          </View>
        </View>
      )}
      {loading && <Loading />}
    </View>
  );
}

export default connect()(ChangeURLScreen);

const styles = StyleSheet.create({
  container: {backgroundColor: colors.dark, flex: 1},
  page: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 3,
    backgroundColor: colors.dark,
  },
});
