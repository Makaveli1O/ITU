/**
 * @file SmallText.js
 * @author xliska20
 */
import React from 'react';
import {Text,StyleSheet} from 'react-native';

export default class SmallText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={[styles.defaultStyle, this.props.style, {color: this.props.color}]}>
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    padding: 2,
    fontSize: 23,
    paddingTop: 3,
    paddingLeft: 10,
    fontFamily: 'adventpro_extralight',
  },
});