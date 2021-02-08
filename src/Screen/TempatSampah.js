import React, {Component, useCallback} from 'react';
import {Text, TouchableOpacity, View, Linking, StyleSheet} from 'react-native';

const Tirtohargo = 'https://g.page/pondok-programmer-bantul?share';
const Timbulharjo = 'https://goo.gl/maps/AJDPv2BDLnjh8wzz6';
const Patehan = 'https://goo.gl/maps/MDcY23zC3VaFKS6YA';
const CondongCatur = 'https://goo.gl/maps/26DMzpURzmWG7JbE8';

const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);
  return (
    <TouchableOpacity onPress={handlePress} style={Styles.jemput}>
      <Text style={{fontSize: 20}}>{children}</Text>
    </TouchableOpacity>
  );
};

export class TempatSampah extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#047af1f2',
            padding: 10,
            elevation: 1,
            marginBottom: 5,
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>
            Kirim Sampah Ke Alamat Dibawah ini:
          </Text>
        </View>

        <OpenURLButton url={Tirtohargo}>Tirtohargo</OpenURLButton>
        <OpenURLButton url={Timbulharjo}>
          Timbulharjo, Kec. Sewon, Bantul
        </OpenURLButton>
        <OpenURLButton url={Patehan}>
          Jl. Ngadisuryan, Patehan, Kecamatan Kraton, Kota Yogyakarta
        </OpenURLButton>
        <OpenURLButton url={CondongCatur}>
          Jl. Pondok Raya, Pondok, Condongcatur, Kec. Depok, Kabupaten Sleman
        </OpenURLButton>
      </View>
    );
  }
}

export default TempatSampah;

const Styles = StyleSheet.create({
  jemput: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 7,
    justifyContent: 'center',
    elevation: 2,
    marginBottom: 10,
    paddingStart: 15,
  },
});
