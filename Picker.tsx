import {View, requireNativeComponent} from 'react-native';

const settings = {
  name: 'Picker',
  propTypes: {
    ...View.propTypes,
  },
};

export default requireNativeComponent('BridgeAndroid', settings);
