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
const {DatePickerIOS, StyleSheet, Text, View} = require('react-native');

type State = {|
  date: Date,
|};

type Props = {|
  // @rnoh: toLocaleDateString and toLocaleTimeString are currently unimplemented.
  // When this switch is off, dates are displayed, but without necessarily respecting the system locale.
  useLocaleDateFunctions: Boolean,
  children: (State, (Date) => void) => React.Node,
|};

class WithDatePickerData extends React.Component<Props, State> {
  state = {
    date: new Date(),
  };

  onDateChange = (date) => {
    this.setState({date: date});
  };

  dateToString = (date) =>
    this.props.useLocaleDateFunctions
      ? date.toLocaleDateString()
      : date.toDateString();

  timeToString = (date) => {
    const args = [
      [],
      {
        hour: '2-digit',
        minute: '2-digit',
      },
    ];
    return this.props.useLocaleDateFunctions
      ? date.toLocaleTimeString(...args)
      : date.toTimeString(...args);
  };

  render() {
    return (
      <View>
        <WithLabel label="Value:">
          <Text testID="date-indicator">
            {this.dateToString(this.state.date)}
          </Text>
          <Text>&nbsp;</Text>
          <Text testID="time-indicator">
            {this.timeToString(this.state.date)}
          </Text>
        </WithLabel>
        {this.props.children(this.state, this.onDateChange)}
      </View>
    );
  }
}

type LabelProps = {|
  label: string,
  children: React.Node,
|};

class WithLabel extends React.Component<LabelProps> {
  render() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.labelView}>
          <Text style={styles.label}>{this.props.label}</Text>
        </View>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textinput: {
    height: 26,
    width: 50,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    fontSize: 13,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  labelView: {
    marginRight: 10,
    paddingVertical: 2,
  },
  label: {
    fontWeight: '500',
  },
});

exports.title = '<DatePickerIOS>';
exports.description = 'Select dates and times using the native UIDatePicker.';
exports.examples = [
  {
    title: 'Date and time picker',
    render: function (): React.Element<any> {
      return (
        <WithDatePickerData useLocaleDateFunctions={false}>
          {(state, onDateChange) => (
            <DatePickerIOS
              testID="date-and-time"
              date={state.date}
              mode="datetime"
              onDateChange={onDateChange}
            />
          )}
        </WithDatePickerData>
      );
    },
  },
  {
    title: 'Date only picker',
    render: function (): React.Element<any> {
      return (
        <WithDatePickerData useLocaleDateFunctions={false}>
          {(state, onDateChange) => (
            <DatePickerIOS
              testID="date-only"
              date={state.date}
              mode="date"
              onDateChange={onDateChange}
            />
          )}
        </WithDatePickerData>
      );
    },
  },
  {
    title: 'Time only picker, 20-minute interval',
    render: function (): React.Element<any> {
      return (
        <WithDatePickerData useLocaleDateFunctions={false}>
          {(state, onDateChange) => (
            <DatePickerIOS
              testID="time-with-interval"
              date={state.date}
              minuteInterval={20}
              mode="time"
              onDateChange={onDateChange}
            />
          )}
        </WithDatePickerData>
      );
    },
  },
  {
    title:
      '[RNOH][unimplemented] Display date using locale-dependent functions',
    render: function (): React.Element<any> {
      return (
        <WithDatePickerData useLocaleDateFunctions={true}>
          {(state, onDateChange) => (
            <DatePickerIOS
              testID="date-and-time-rnoh-locale"
              date={state.date}
              mode="datetime"
              onDateChange={onDateChange}
            />
          )}
        </WithDatePickerData>
      );
    },
  },
  {
    title: 'Date picker with min/max date limits',
    render: function (): React.Element<any> {
      return (
        <WithDatePickerData useLocaleDateFunctions={false}>
          {(state, onDateChange) => {
            // 设置最小日期为当前日期
            const minDate = new Date();
            // 设置最大日期为当前日期后30天
            const maxDate = new Date();
            maxDate.setDate(maxDate.getDate() + 30);

            return (
              <View>
                {/* <WithLabel label="Select date (limited to next 30 days):"> */}
                  <DatePickerIOS
                    testID="date-with-limits"
                    date={state.date}
                    mode="date"
                    minimumDate={minDate}
                    maximumDate={maxDate}
                    onDateChange={onDateChange}
                  />
                {/* </WithLabel> */}
                <Text style={styles.label}>
                  Min date: {minDate.toDateString()}
                </Text>
                <Text style={styles.label}>
                  Max date: {maxDate.toDateString()}
                </Text>
              </View>
            );
          }}
        </WithDatePickerData>
      );
    },
  },
  {
    title: 'Date picker with different locales',
    render: function (): React.Element<any> {
      return (
        <WithDatePickerData useLocaleDateFunctions={false}>
          {(state, onDateChange) => (
            <View>
              <Text style={styles.label}>Chinese locale (zh-CN):</Text>
              <DatePickerIOS
                testID="date-zh-CN"
                date={state.date}
                mode="date"
                locale="zh-CN"
                onDateChange={onDateChange}
              />

              <Text style={styles.label}>Japanese locale (ja-JP):</Text>
              <DatePickerIOS
                testID="date-ja-JP"
                date={state.date}
                mode="date"
                locale="ja-JP"
                onDateChange={onDateChange}
              />

              <Text style={styles.label}>English locale (en-US):</Text>
              <DatePickerIOS
                testID="date-en-US"
                date={state.date}
                mode="date"
                locale="en-US"
                onDateChange={onDateChange}
              />

              <Text style={styles.label}>Selected date:</Text>
              <Text style={styles.label}>{state.date.toDateString()}</Text>
            </View>
          )}
        </WithDatePickerData>
      );
    },
  },
  {
    title: 'Date picker with timezone offset',
    render: function (): React.Element<any> {
      return (
        <WithDatePickerData useLocaleDateFunctions={false}>
          {(state, onDateChange) => (
            <View>
              <Text style={styles.label}>UTC Time (No Offset):</Text>
              <DatePickerIOS
                testID="date-utc"
                date={state.date}
                mode="datetime"
                timezoneOffsetInMinutes={0}
                onDateChange={onDateChange}
              />

              <Text style={styles.label}>UTC+8 (Beijing/Singapore):</Text>
              <DatePickerIOS
                testID="date-utc-plus-8"
                date={state.date}
                mode="datetime"
                timezoneOffsetInMinutes={-480} // UTC+8 = -480 minutes
                onDateChange={onDateChange}
              />

              <Text style={styles.label}>UTC-5 (New York):</Text>
              <DatePickerIOS
                testID="date-utc-minus-5"
                date={state.date}
                mode="datetime"
                timezoneOffsetInMinutes={300} // UTC-5 = +300 minutes
                onDateChange={onDateChange}
              />

              <Text style={styles.label}>Selected time in different zones:</Text>
              <Text style={styles.label}>
                Local: {state.date.toLocaleString()}
              </Text>
              <Text style={styles.label}>
                UTC: {state.date.toUTCString()}
              </Text>
            </View>
          )}
        </WithDatePickerData>
      );
    },
  },
  {
    title: 'Date picker with initial date',
    render: function (): React.Element<any> {
      // 设置初始日期为 2024 年 1 月 1 日
      const initialDate = new Date(2024, 0, 1);
      
      return (
        <WithDatePickerData useLocaleDateFunctions={false}>
          {(state, onDateChange) => (
            <View>
              <Text style={styles.label}>With initial date (2024-01-01):</Text>
              <DatePickerIOS
                testID="date-with-initial"
                date={state.date}
                initialDate={initialDate}
                mode="date"
                onDateChange={onDateChange}
              />
              
              <Text style={styles.label}>Current selected date:</Text>
              <Text style={styles.label}>{state.date.toDateString()}</Text>
              
              <Text style={styles.label}>Initial date:</Text>
              <Text style={styles.label}>{initialDate.toDateString()}</Text>
            </View>
          )}
        </WithDatePickerData>
      );
    },
  },
];
