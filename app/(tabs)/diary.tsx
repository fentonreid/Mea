import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSystem } from "@/powersync/PowerSync";
import { GENERAL_INGREDIENTS_TABLE } from "@/powersync/AppSchema";

const Screen = async () => {
  const { db } = useSystem();
  const ingredients = await db
    .selectFrom(GENERAL_INGREDIENTS_TABLE)
    .selectAll()
    .execute();

  return (
    <View>
      <Text>Diary Screen</Text>

      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{`${item.name}`}</Text>}
      />
    </View>
  );
};

export default Screen;
