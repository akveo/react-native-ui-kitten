import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Datepicker, Text } from "@ui-kitten/components";

const LeftArrow = (arrowProps: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      style={styles.arrow}
      onPress={arrowProps.onPress}
    >
      <Text>PREV</Text>
    </TouchableOpacity>
  );
};

export const DatepickerAccessoriesShowcase = () => {
  const [date, setDate] = React.useState(new Date());

  return (
    <Datepicker
      label="Label"
      caption="Caption"
      placeholder="Pick Date"
      date={date}
      onSelect={(nextDate) => setDate(nextDate)}
      renderArrowLeft={LeftArrow}
      renderArrowRight={(arrowProps) => {
        return (
          <TouchableOpacity
            style={styles.arrow}
            onPress={arrowProps.onPress}
          >
            <Text>NEXT</Text>
          </TouchableOpacity>
        )
      }}
    />
  );
};

const styles = StyleSheet.create({
  arrow: {
    justifyContent: "center",
    alignItems: "center",
  },
});
