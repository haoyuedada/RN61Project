/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

const React = require('react');
const {AsyncStorage, PickerIOS, Text, View, StyleSheet} = require('react-native');
const PickerItemIOS = PickerIOS.Item;

const STORAGE_KEY = '@AsyncStorageExample:key';
const COLORS = ['red', 'orange', 'yellow', 'green', 'blue'];

class MergeItemExample extends React.Component<{}, $FlowFixMeState> {
  state = {
    mergedItem: {},
    messages: [],
  };

  STORAGE_MERGE_KEY = '@AsyncStorageExample:mergeKey';

  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    try {
      const value = await AsyncStorage.getItem(this.STORAGE_MERGE_KEY);
      if (value !== null) {
        this.setState({mergedItem: JSON.parse(value)});
        this._appendMessage('Current value: ' + value);
      }
    } catch (error) {
      this._appendMessage('Load Error: ' + error.message);
    }
  };

  _mergeItem = async () => {
    const currentTime = new Date().toLocaleString();
    const newData = {
      lastUpdate: currentTime,
      counter: (this.state.mergedItem.counter || 0) + 1,
    };

    try {
      console.log('Merging data: ', newData);
      await AsyncStorage.mergeItem(
        this.STORAGE_MERGE_KEY,
        JSON.stringify(newData),
      );
      
      // 读取合并后的数据
      const value = await AsyncStorage.getItem(this.STORAGE_MERGE_KEY);
      this.setState({mergedItem: JSON.parse(value)});
      this._appendMessage('Merged: ' + value);
    } catch (error) {
      this._appendMessage('Merge Error: ' + error.message);
    }
  };

  _clearStorage = async () => {
    try {
      await AsyncStorage.removeItem(this.STORAGE_MERGE_KEY);
      this.setState({mergedItem: {}});
      this._appendMessage('Storage cleared.');
    } catch (error) {
      this._appendMessage('Clear Error: ' + error.message);
    }
  };

  _appendMessage = message => {
    this.setState({messages: this.state.messages.concat(message)});
  };

  render() {
    return (
      <View>
        <Text style={styles.text}>
          Current merged data:
          {'\n'}
          {JSON.stringify(this.state.mergedItem, null, 2)}
        </Text>
        <Text style={styles.button} onPress={this._mergeItem}>
          Tap to merge new data
        </Text>
        <Text style={styles.button} onPress={this._clearStorage}>
          Tap to clear storage
        </Text>
        <Text style={styles.text}>Messages:</Text>
        {this.state.messages.map((m, i) => (
          <Text key={i}>{m}</Text>
        ))}
      </View>
    );
  }
}

// Add to existing styles
const styles = StyleSheet.create({
  // ...existing code...
  text: {
    margin: 10,
  },
  button: {
    margin: 10,
    color: 'blue',
  },
});

// Add to examples array
exports.examples = [
  // ...existing code...
  {
    title: 'mergeItem - Merge existing value',
    render(): React.Element<any> {
      return <MergeItemExample />;
    },
  },
];
