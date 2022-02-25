import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";
import { Svg, Line, Circle } from 'react-native-svg';

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const pts = [{
    x: 40,
    y: 40
  }, {
    x: 40,
    y: 80
  }
  ]

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true, // will we accept the gesture
      onPanResponderGrant: () => { // initialization for gesture
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event( // handling event
        [
          null,
          { dx: pan.x, dy: pan.y }
        ]
      ),
      onPanResponderRelease: () => { // at end of event
        pan.flattenOffset();
      }
    })
  ).current;

  return (
    <View style={styles.container}>

      <Text style={styles.titleText}>Drag this box!</Text>

      <Svg height="200" width="200">
          { pts.map((pt, idx) => {
              console.log(pt.x, pt.y); 
              return (<Circle key="node${idx}" cx={pt.x} cy={pt.y} r="7" stroke="black" strokeWidth="3" fill="grey"/>);
            }) 
            }
            
          <Circle cx="0" cy="0" r="5" stroke="blue" strokeWidth="10" fill="blue" />
          <Circle cx="200" cy="200" r="5" stroke="blue" strokeWidth="10" fill="blue" />
      </Svg>
      
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >
        <View style={styles.box} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5
  }
});

export default App;

/*

      

*/