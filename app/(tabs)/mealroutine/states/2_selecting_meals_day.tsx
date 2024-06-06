import MealRoutineStateManager from "@/managers/MealRoutineStateManager";
import { MealRoutineState } from "@/models/enums/MealRoutineState";
import {
  DailyMeal_Meals,
  MealRoutine_DailyMeals,
  Meals,
} from "@/models/schemas/Schemas";
import { SettingsContext } from "@/store/SettingsContext";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { StyleSheet, View, SectionList, Image } from "react-native";
import { useQuery, useRealm } from "@realm/react";
import {
  CheckCircle,
  Heart,
  ListMagnifyingGlass,
  PlusCircle,
  Star,
  StarHalf,
} from "phosphor-react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import Loading from "@/components/Loading";
import {
  Text_CardHeader,
  Text_ListText,
  Text_TabIconText,
  Text_Text,
  Text_TextBold,
} from "@/components/TextStyles";
import { MealState } from "@/models/enums/MealState";
import SwipeableRow from "@/components/SwipeableRow";

const Screen = () => {
  const { colours } = useContext(SettingsContext);
  const navigation = useNavigation();
  const realm = useRealm();
  const [currentDayRoutine, setCurrentDayRoutine] =
    useState<MealRoutine_DailyMeals | null>(null);

  const activeMealRoutine = MealRoutineStateManager({
    ignoreCurrentMealRoutineState: [MealRoutineState.SELECTING_MEALS],
  });

  const headerRight = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.replace("mealroutine/states/2_selecting_meals_quick_access")
        }
      >
        <ListMagnifyingGlass
          size={48}
          weight="regular"
          color={colours.accentButton}
        />
      </TouchableOpacity>
    );
  };

  // Determine what day of the meal routine we are rendering here, this will inform the flatlist and header components
  const { dayIndex } = useLocalSearchParams();
  useEffect(() => {
    if (dayIndex) {
      setCurrentDayRoutine(
        activeMealRoutine!.dailyMeals[parseInt(dayIndex as string)]
      );
      return;
    }

    setCurrentDayRoutine(activeMealRoutine!.dailyMeals[0]);
  }, [dayIndex]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: currentDayRoutine
        ? `${currentDayRoutine!.day}, ${moment(currentDayRoutine!.date).format(
            "Do"
          )}`
        : "...",
      headerRight: headerRight,
    });
  }, [navigation, currentDayRoutine]);

  const groupMealsByType = (meals: DailyMeal_Meals[]) => {
    const mealOrder = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];

    const groupedMeals: { [key: string]: DailyMeal_Meals[] } = meals.reduce(
      (acc: { [key: string]: DailyMeal_Meals[] }, meal) => {
        const { mealType } = meal;
        if (!acc[mealType]) {
          acc[mealType] = [];
        }
        acc[mealType].push(meal);
        return acc;
      },
      {}
    );

    return mealOrder.map((mealType) => ({
      title: mealType,
      data: groupedMeals[mealType] || [],
    }));
  };
  if (!currentDayRoutine) return <Loading />;

  const renderSectionHeader = ({
    section: { title, data },
  }: {
    section: {
      title: string;
      data: DailyMeal_Meals[];
    };
  }) => {
    const numberOfCompleteMeals = data.filter(
      (i) => i.mealState === MealState.PENDING_REVIEW
    );

    return (
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          backgroundColor: colours.light,
          paddingHorizontal: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text_CardHeader>{title}</Text_CardHeader>
            {numberOfCompleteMeals && numberOfCompleteMeals.length >= 1 && (
              <CheckCircle size={28} weight="fill" color={colours.primary} />
            )}
          </View>
        </View>
        <View
          style={{
            height: 2,
            backgroundColor: colours.secondary,
            marginTop: 6,
          }}
        ></View>
      </View>
    );
  };

  const RenderRating = ({ rating }: { rating: number }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        // Full star
        stars.push(
          <Star
            style={{ flex: 1 }}
            size={24}
            weight="fill"
            color={colours.accentButton}
          />
        );
      } else if (rating >= i - 0.5) {
        // Half star
        stars.push(
          <StarHalf
            style={{ flex: 1 }}
            size={24}
            weight="fill"
            color={colours.accentButton}
          />
        );
      } else {
        // Empty star
        stars.push(
          <Star
            style={{ flex: 1 }}
            size={24}
            weight="regular"
            color={colours.text}
          />
        );
      }
    }

    return stars;
  };

  const RenderSingleMealItem = ({
    item,
    mealsOfSameType,
  }: {
    item: DailyMeal_Meals;
    mealsOfSameType: DailyMeal_Meals[];
  }) => {
    const heartFilled = true;
    const hasTasteRating = true;

    return (
      <SwipeableRow
        colours={colours}
        handleView={() => {
          console.log("GO TO SPECIFIC MEAL BY ID...");
        }}
        handleDelete={() => {
          removeMealSelection(item, mealsOfSameType);
        }}
      >
        <View
          style={{
            flex: 1,
            marginVertical: 6,
            flexDirection: "row",
            backgroundColor: colours.background,
            borderRadius: 8,
            padding: 8,
            gap: 16,
          }}
        >
          <View style={{ flex: 3 }}>
            <View style={{ flex: 1, flexDirection: "row", gap: 4 }}>
              <Text_ListText style={{ flex: 3 }}>
                {item.mealId!.name}
              </Text_ListText>
              <Heart
                style={{ flex: 1 }}
                size={24}
                weight={heartFilled ? "fill" : "regular"}
                color={heartFilled ? colours.accentButton : colours.text}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
                marginLeft: 6,
              }}
            >
              <Text_TabIconText>Taste:</Text_TabIconText>
              {hasTasteRating ? (
                <RenderRating rating={4.5} />
              ) : (
                <Text_TabIconText style={{ color: colours.accent }}>
                  No rating
                </Text_TabIconText>
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
                marginLeft: 6,
              }}
            >
              <Text_TabIconText>Effort: </Text_TabIconText>
              {hasTasteRating ? (
                <RenderRating rating={3} />
              ) : (
                <Text_TabIconText style={{ color: colours.accent }}>
                  No rating
                </Text_TabIconText>
              )}
            </View>
          </View>

          <Image
            style={{
              flex: 1,
            }}
            resizeMode="contain"
            source={{ uri: item.mealId!.imageURI }}
          />
        </View>
      </SwipeableRow>
    );
  };

  const removeMealSelection = (
    item: DailyMeal_Meals,
    mealsOfSameType: DailyMeal_Meals[]
  ) => {
    realm.write(() => {
      const occurrences = mealsOfSameType.filter(
        (meal) => meal.mealType === item.mealType
      ).length;

      // If only one occurrence for this type was found then we can't remove from daily meals, just change state
      if (occurrences === 1) {
        item.mealId = undefined;
        item.mealState = MealState.PENDING_MEAL_SELECTION;
        return;
      }

      // Completely remove
      realm.delete(item);
    });
  };

  const renderDayRoutine = ({
    item,
    index,
    section,
  }: {
    item: DailyMeal_Meals;
    index: number;
    section: {
      title: string;
      data: DailyMeal_Meals[];
    };
  }) => {
    // If all meals in this section e.g. mealType are in pending_meal_selection mode then we ignore
    const noCompletedMealsForThisMealType = section.data.filter(
      (i) => i.mealState === MealState.PENDING_MEAL_SELECTION
    );

    return (
      <View
        style={[
          {
            flex: 1,
            backgroundColor: colours.light,
            paddingHorizontal: 12,
          },
          index === section.data.length - 1 && {
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          },
        ]}
      >
        {noCompletedMealsForThisMealType &&
        noCompletedMealsForThisMealType.length !== section.data.length ? (
          <RenderSingleMealItem item={item} mealsOfSameType={section.data} />
        ) : (
          <Text_Text>Nothing to show</Text_Text>
        )}
      </View>
    );
  };

  const renderSectionFooter = () => (
    <View
      style={{
        height: 20,
      }}
    />
  );

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 12,
            gap: 4,
            marginTop: 12,
            marginBottom: 24,
          }}
        >
          {activeMealRoutine!.dailyMeals.map((item) => (
            <TouchableOpacity
              key={item.date.toDateString()}
              onPress={() => {
                setCurrentDayRoutine(item);
              }}
              style={{
                padding: 6,
                backgroundColor:
                  item.date.toDateString() !==
                  currentDayRoutine!.date.toDateString()
                    ? "lightgray"
                    : colours.accentButton,
                borderRadius: 58,
              }}
            >
              <Text_TextBold
                style={[
                  item === currentDayRoutine && {
                    color: colours.light,
                  },
                ]}
              >
                {moment(item.date).format("Do")}
              </Text_TextBold>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <SectionList
          showsVerticalScrollIndicator={false}
          sections={groupMealsByType(currentDayRoutine!.meals)}
          renderItem={renderDayRoutine}
          renderSectionHeader={renderSectionHeader}
          extraData={currentDayRoutine!.meals}
          renderSectionFooter={renderSectionFooter}
          contentContainerStyle={{
            paddingHorizontal: 12,
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <PlusCircle size={72} weight="fill" color={colours.accentButton} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Screen;
