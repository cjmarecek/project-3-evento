import React, { useState } from "react";
import { View, Button, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateTimePickerComponent = props => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    props.handleDateTime(currentDate);
    setShow(Platform.OS === "ios" ? true : false);
  };

  const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40
    }
  });

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" ? (
        <DateTimePicker
          timeZoneOffsetInMinutes={60}
          value={date}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      ) : (
        <View>
          <Button
            title="Show Date Picker"
            onPress={() => {
              setShow(true);
            }}
            color='#70AB33'

          />
          {show && (
            <View
              style={{
                flex: 1,
                flexDirection: "row"
              }}
            >
              <DateTimePicker
                timeZoneOffsetInMinutes={60}
                value={date}
                mode="date"
                is24Hour={true}
                onChange={onChange}
                display="spinner"
              />
              <DateTimePicker
                timeZoneOffsetInMinutes={60}
                value={date}
                mode="time"
                is24Hour={true}
                onChange={onChange}
                display="spinner"
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default DateTimePickerComponent;
