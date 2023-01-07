import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Button,
  Dropdown,
  DropdownWithSearch,
  Gap,
  Header,
  Input,
  Loading,
  Textarea,
} from '../../components';
import {getData, postData} from '../../helpers/CRUD';
import {colors, useForm} from '../../utils';
//redux toolkit
import {connect, useSelector} from 'react-redux';

function RegisterScreen() {
  useEffect(() => {
    getCountries();
    getGenderAndJobsOptionLanguage();
  }, []);

  const tabBarHeight = useBottomTabBarHeight();
  const ApiURL = useSelector(state => state.url);
  const languages = useSelector(state => state.languages);
  const [countryCode, setCountryCode] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [gender, setGender] = useState([]);
  const [students, setStudents] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useForm({
    nama_pengunjung: '',
    jk: '',
    asal_negara: '',
    propinsi: '',
    kab_kota: '',
    pekerjaan_id: '',
    sekolah: '',
    alamat: '',
    no_hp: '',
  });

  const getGenderAndJobsOptionLanguage = async () => {
    let condition = languages.language;
    if (condition === 'english') {
      setGender([
        {label: 'Male', value: 'Male'},
        {label: 'Female', value: 'Female'},
      ]);
    } else {
      setGender([
        {label: 'Laki-laki', value: 'Laki-laki'},
        {label: 'Perempuan', value: 'Perempuan'},
      ]);
    }
    try {
      const result = await getData(`${ApiURL}/api/getPekerjaan/${condition}`);
      setJobs(result.data.data);
    } catch (error) {
      // console.log(error);
      handleErrorMessage('Something Error!');
    }
  };

  const getCountries = async () => {
    setLoading(true);
    try {
      const result = await getData(`${ApiURL}/api/getCountries`);
      setCountries(result.data);
    } catch (error) {
      // console.log(error);
      handleErrorMessage('Something Error!');
    }
    setLoading(false);
  };

  const handleErrorMessage = message => {
    showMessage({
      message: message,
      type: 'danger',
    });
  };

  const getStates = async value => {
    setLoading(true);
    try {
      const result = await getData(`${ApiURL}/api/getStates/${value}`);
      setStates(result.data);
      setCities([]);
    } catch (error) {
      // console.log(error);
      handleErrorMessage('Something Error!');
    }
    setLoading(false);
  };

  const getCities = async value => {
    setLoading(true);
    try {
      const result = await getData(
        `${ApiURL}/api/getCities/${countryCode}/${value}`,
      );
      setCities(result.data);
    } catch (error) {
      // console.log(error);
      handleErrorMessage('Something Error!');
    }
    setLoading(false);
  };

  const onSave = async () => {
    setLoading(true);
    try {
      const result = await postData(`${ApiURL}/api/kunjungan`, form);
      const {message, success} = result.data;
      if (success) {
        setForm('reset');
        showMessage({
          message: message,
          type: 'success',
        });
        getCountries();
        setStates([]);
        setCities([]);
      }
    } catch (error) {
      // console.log(error.response);
      const data = error.response.data.errors;
      if (data) {
        handleEachErrorMessage(data);
      } else {
        handleErrorMessage('Something Error!');
      }
    }
    setLoading(false);
  };

  const handleEachErrorMessage = data => {
    if (data.nama_pengunjung) {
      showMessage({
        message: data.nama_pengunjung[0],
        type: 'danger',
      });
    }

    setTimeout(() => {
      if (data.jk) {
        showMessage({
          message: data.jk[0],
          type: 'danger',
        });
      }
    }, 3000);

    setTimeout(() => {
      if (data.asal_negara) {
        showMessage({
          message: data.asal_negara[0],
          type: 'danger',
        });
      }
    }, 6000);

    setTimeout(() => {
      if (data.propinsi) {
        showMessage({
          message: data.propinsi[0],
          type: 'danger',
        });
      }
    }, 9000);

    setTimeout(() => {
      if (data.kab_kota) {
        showMessage({
          message: data.kab_kota[0],
          type: 'danger',
        });
      }
    }, 12000);

    setTimeout(() => {
      if (data.pekerjaan_id) {
        showMessage({
          message: data.pekerjaan_id[0],
          type: 'danger',
        });
      }
    }, 15000);

    setTimeout(() => {
      if (data.alamat) {
        showMessage({
          message: data.alamat[0],
          type: 'danger',
        });
      }
    }, 18000);

    setTimeout(() => {
      if (data.no_hp) {
        showMessage({
          message: data.no_hp[0],
          type: 'danger',
        });
      }
    }, 21000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.page(tabBarHeight)}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header title={languages.formVisitors.titleHeaderPage} />
          <Input
            label={languages.formVisitors.name}
            value={form.nama_pengunjung}
            onChangeText={value => setForm('nama_pengunjung', value)}
            numKeyboardPad={false}
          />
          <Gap height={5} />
          <DropdownWithSearch
            label={languages.formVisitors.nationality}
            data={countries}
            onValueChange={(label, value) => {
              setForm('asal_negara', label);
              getStates(value);
              setCountryCode(value);
            }}
          />
          <Gap height={5} />
          <DropdownWithSearch
            label={languages.formVisitors.states_provinces}
            data={states}
            onValueChange={(label, value) => {
              setForm('propinsi', label);
              if (value) {
                getCities(value);
              }
            }}
          />
          <Gap height={5} />
          <DropdownWithSearch
            label={languages.formVisitors.cities_regions}
            data={cities}
            onValueChange={(label, value) => {
              setForm('kab_kota', label);
            }}
          />
          <Textarea
            label={languages.formVisitors.address}
            numberOfLines={5}
            value={form.alamat}
            onChangeText={value => setForm('alamat', value)}
          />
          <Gap height={5} />
          <Dropdown
            label={languages.formVisitors.gender}
            data={gender}
            onValueChange={value => setForm('jk', value)}
          />
          <Gap height={5} />
          <DropdownWithSearch
            label={languages.formVisitors.jobs}
            data={jobs}
            onValueChange={(label, value) => {
              if (label === 'Students' || label === 'Pelajar/Mahasiswa') {
                setStudents(true);
              } else {
                setStudents(false);
              }
              setForm('pekerjaan_id', value);
            }}
          />
          {students && (
            <Input
              label={languages.formVisitors.school_college}
              value={form.sekolah}
              onChangeText={value => setForm('sekolah', value)}
              numKeyboardPad={false}
            />
          )}
          <Input
            label={languages.formVisitors.phone_number}
            value={form.no_hp}
            onChangeText={value => setForm('no_hp', value)}
            numKeyboardPad={true}
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

export default connect()(RegisterScreen);

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
