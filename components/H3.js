/**
 * @file H3.js
 * @author xliska20
 */
import React from 'react';
import {Text,StyleSheet} from 'react-native';

export default class H3 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={[styles.defaultStyle, this.props.style, {color: this.props.color, fontSize: parseInt(this.props.size,10)}]}>
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    padding: 2,
    fontSize: 40,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    fontFamily: 'adventpro_light',
  },
});