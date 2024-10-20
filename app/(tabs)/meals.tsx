import { View, Text, StyleSheet, FlatList } from "react-native";
import { RangeSlider } from "@react-native-assets/slider";
import { useState } from "react";
import { useSystem } from "@/powersync/PowerSync";
import { RECIPES_TABLE } from "@/powersync/AppSchema";

const CustomThumb = ({ value }: any) => {
  return <Text>{value}</Text>;
};

const Screen = async () => {
  const { db } = useSystem();

  const meals = await db.selectFrom(RECIPES_TABLE).selectAll().execute();
  const [range, setRange] = useState<[number, number]>([0, 0]);

  return (
    <View style={{ flex: 1 }}>
      <RangeSlider
        onValueChange={setRange}
        minimumValue={0}
        maximumValue={10}
        range={range}
        thumbSize={24}
        trackHeight={8}
        thumbStyle={{ flex: 1 }}
        step={1}
        CustomThumb={CustomThumb}
        outboundColor="blue"
        inboundColor="red"
      />
      <Text>Meals Screen</Text>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{`${item.name}`}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Screen;
