import React from 'react';
import {Button, SafeAreaView, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Bridge from './Picker';

const App: React.FC = ({}) => {
  const height = useSharedValue<number>(300);
  const offset = useSharedValue<number>(100);
  const pressed = useSharedValue<boolean>(false);
  const x = useSharedValue<number>(0);
  const y = useSharedValue<number>(0);
  const animatedSBlue = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });
  const animatedSRed = useAnimatedStyle(() => {
    return {
      height: 100,
      width: 40,
      backgroundColor: 'red',
      left: offset.value,
    };
  });
  const eventHandler = useAnimatedGestureHandler({
    onStart: (_event, _ctx) => {
      pressed.value = true;
    },
    onActive: (event, _ctx) => {
      x.value = 100 + event.translationX;
      y.value = 100 + event.translationY;
    },
    onEnd: (_event, _ctx) => {
      pressed.value = false;
      x.value = withSpring(100);
      y.value = withSpring(100);
    },
  });
  const uas = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? '#FEEF86' : '#001972',
      transform: [{translateX: x.value}, {translateY: y.value}],
    };
  });

  return (
    <SafeAreaView style={{}}>
      <View style={{height: 300}}>
        <Animated.View
          onTouchEnd={() => {
            height.value = withRepeat(
              withTiming(0, {duration: 600}),
              100,
              true,
            );
          }}
          style={[{backgroundColor: 'blue'}, animatedSBlue]}
        />
      </View>
      <Animated.View style={animatedSRed} />
      <Button
        onPress={() => {
          offset.value = withSpring(Math.random() * 300, {}, _finished => {});
        }}
        title="Move"
      />
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View
          style={[{height: 50, width: 50, borderRadius: 50}, uas]}
        />
      </PanGestureHandler>
      <Bridge
        data={['test1', 'test2', 'test3', 'test4', 'test5']}
        style={{
          width: '100%',
          height: 200,
        }}
      />
    </SafeAreaView>
  );
};

export default App;
