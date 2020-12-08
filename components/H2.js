/**
 * @file H2.js
 * @author xliska20
 */
import React from 'react';
import {Text,StyleSheet} from 'react-native';

export default class H2 extends React.Component {
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
    fontSize: 50,
    paddingBottom:5,
    paddingLeft: 25,
    fontFamily: 'adventpro_medium'
  },
});