import Loading from "@/components/Loading";
import MealRoutineStateManager from "@/managers/MealRoutineStateManager";
import { MealRoutineState } from "@/models/enums/MealRoutineState";

const Screen = () => {
  console.log("IN 2 selecting meals in quick access");
  const activeMealRoutine = MealRoutineStateManager({
    ignoreCurrentMealRoutineState: [MealRoutineState.SELECTING_MEALS],
  });

  console.log(activeMealRoutine);

  return <Loading />;
};

export default Screen;

// import {
//   Text_CardHeader,
//   Text_TabIconText,
//   Text_Text,
//   Text_TextBold,
// } from "@/components/TextStyles";
// import Spacings from "@/constants/Spacings";
// import MealRoutineStateManager from "@/managers/MealRoutineStateManager";
// import { ThemeColours } from "@/models/ThemeColours";
// import { MealRoutineState } from "@/models/enums/MealRoutineState";
// import { MealState } from "@/models/enums/MealState";
// import { MealType } from "@/models/enums/MealType";
// import { SettingsContext } from "@/store/SettingsContext";
// import { router, useNavigation } from "expo-router";
// import moment from "moment";
// import { CheckCircle, Lightning, PlusCircle } from "phosphor-react-native";
// import {
//   useCallback,
//   useContext,
//   useEffect,
//   useLayoutEffect,
//   useRef,
//   useState,
// } from "react";
// import {
//   FlatList,
//   TouchableOpacity,
//   View,
//   Image,
//   StyleSheet,
//   ScrollView,
// } from "react-native";
// import BottomSheet, {
//   BottomSheetBackdrop,
//   BottomSheetView,
// } from "@gorhom/bottom-sheet";
// import {
//   Button_BackgroundThin,
//   Button_PrimaryThin,
//   Button_Wide,
// } from "@/components/ButtonStyles";

// const createRoutineCustomHeaderLeft = (
//   colours: ThemeColours,
//   onPress: () => void,
//   finished: boolean
// ) => {
//   if (!finished) return <></>;

//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       delayPressIn={0}
//       style={{
//         flexDirection: "row",
//         gap: Spacings.mainContainerViewPaddingHalved,
//         justifyContent: "flex-end",
//         alignItems: "center",
//       }}
//     >
//       <CheckCircle size={38} weight="fill" color={colours.darkPrimary} />
//     </TouchableOpacity>
//   );
// };

// const createRoutineCustomHeaderRight = (
//   colours: ThemeColours,
//   onPress: () => void
// ) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       delayPressIn={0}
//       style={{
//         flexDirection: "row",
//         gap: Spacings.mainContainerViewPaddingHalved,
//         justifyContent: "flex-end",
//         alignItems: "center",
//       }}
//     >
//       <Lightning size={24} weight="fill" color={colours.accent} />
//     </TouchableOpacity>
//   );
// };

// type MealTypeCount = {
//   [mealType: string]: DailyMeal_Meals[];
// };

// interface RenderImageProps {
//   imageURI?: string;
//   avatarPlaceholderText?: string;
//   disabled?: boolean;
//   readyToBeAdded?: boolean;
//   onPress: () => void;
//   onLongPress: () => void;
// }

// // Determine if meal is disabled or enabled
// const mapping: Record<number, string> = {
//   0: "BREAKFAST",
//   1: "LUNCH",
//   2: "DINNER",
//   3: "SNACK",
// };

// // Create a hacky mapping between indexes and categories
// const mapping2: Record<number, string> = {
//   0: "Breakfast",
//   1: "Lunch",
//   2: "Dinner",
//   3: "Snacks",
// };

// const countMealsInState = (dailyMeals: MealRoutine_DailyMeals[]): number => {
//   let count = 0;

//   dailyMeals.forEach((dailyMeal) => {
//     dailyMeal.meals.forEach((meal) => {
//       if (meal.mealState === MealState.MEAL_READY_TO_BE_ADDED) count++;
//     });
//   });

//   return count;
// };

// enum MealTypeTEST {
//   BREAKFAST = "BREAKFAST",
//   LUNCH = "LUNCH",
//   DINNER = "DINNER",
//   SNACK = "SNACK",
// }

// const sortMealsByMealType = (meals: DailyMeal_Meals[]) => {
//   const mealOrder = {
//     [MealTypeTEST.BREAKFAST]: 1,
//     [MealTypeTEST.LUNCH]: 2,
//     [MealTypeTEST.DINNER]: 3,
//     [MealTypeTEST.SNACK]: 4,
//   };

//   // Modify item.meals to sort them into meal type category
//   return Array.from(meals).sort(
//     (a, b) =>
//       mealOrder[a.mealType as MealTypeTEST] -
//       mealOrder[b.mealType as MealTypeTEST]
//   );
// };

// const finishSnapPoints = ["35%"];

// const Screen = () => {
//   const { colours } = useContext(SettingsContext);
//   const [finished, setFinished] = useState(false);
//   const [quickAccessToggle, setQuickAccessToggle] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [filteredMealsByType, setFilteredMealsByType] = useState<Meals[]>([]);
//   const flatListScrollRef = useRef<FlatList>(null);
//   const navigation = useNavigation();
//   const realm = useRealm();
//   const meals = useQuery<Meals>("Meals");

//   const activeMealRoutine = MealRoutineStateManager({
//     ignoreCurrentMealRoutineState: [MealRoutineState.SELECTING_MEALS],
//   });

//   const quickAccessSelections = countMealsInState(
//     activeMealRoutine!.dailyMeals
//   );

//   const [selectedMeal, setSelectedMeal] = useState<Meals | null>(null);

//   const handlePress = useCallback(
//     (meal: Meals) => {
//       setSelectedMeal(meal === selectedMeal ? null : meal);
//     },
//     [selectedMeal]
//   );

//   // Finish creating meal routine bottomSheet properties
//   const finishBottomSheetRef = useRef<BottomSheet>(null);

//   const renderFinishBackdrop = useCallback(
//     (props: any) => (
//       <BottomSheetBackdrop
//         appearsOnIndex={0}
//         disappearsOnIndex={-1}
//         style={{ backgroundColor: colours.background }}
//         {...props}
//       ></BottomSheetBackdrop>
//     ),
//     [colours]
//   );

//   const handleFinishBottomSheetClose = useCallback(() => {
//     finishBottomSheetRef?.current?.close();
//   }, []);

//   const handleFinishBottomSheetOpen = useCallback(() => {
//     finishBottomSheetRef?.current?.expand();
//   }, []);

//   const renderMeal = useCallback(
//     ({ item }: { item: Meals }) => {
//       return (
//         <TouchableOpacity
//           style={[
//             {
//               borderRadius: 8,
//               backgroundColor: colours.light,
//               width: 130,
//               height: 130,
//             },
//             selectedMeal === item && {
//               borderColor: colours.darkPrimary,
//               borderWidth: 6,
//             },
//           ]}
//           onPressIn={() => handlePress(item)}
//           delayPressIn={0}
//         >
//           <Image
//             style={[
//               {
//                 flex: 1,
//                 borderTopLeftRadius: 8,
//                 borderTopRightRadius: 8,
//               },
//               selectedMeal === item && {
//                 borderTopLeftRadius: 0,
//                 borderTopRightRadius: 0,
//               },
//             ]}
//             source={{ uri: item.imageURI }}
//           />
//           <Text_Text style={{ padding: 4 }}>{item.name}</Text_Text>
//         </TouchableOpacity>
//       );
//     },
//     [colours, selectedMeal]
//   );

//   const RenderImage = useCallback(
//     ({
//       imageURI,
//       avatarPlaceholderText,
//       disabled,
//       onPress,
//       onLongPress,
//       readyToBeAdded,
//     }: RenderImageProps) => {
//       return (
//         <TouchableOpacity
//           onPress={onPress}
//           onLongPress={onLongPress}
//           delayPressIn={0}
//           delayLongPress={100}
//           style={[
//             {
//               borderRadius: 32,
//               flex: 1,
//               justifyContent: "center",
//               alignItems: "center",
//             },
//           ]}
//           disabled={disabled}
//         >
//           <View
//             style={[
//               { borderRadius: 32 },
//               !disabled && {
//                 borderStyle: "dashed",
//                 borderWidth: 4,
//                 borderColor:
//                   selectedMeal === null ? colours.accent : colours.darkPrimary,
//               },
//               readyToBeAdded && {
//                 borderStyle: "solid",
//                 borderWidth: 4,
//                 borderColor: colours.darkPrimary,
//               },
//             ]}
//           >
//             {imageURI ? (
//               <Image
//                 style={[
//                   {
//                     width: 56,
//                     height: 56,
//                     borderRadius: 32,
//                   },
//                   readyToBeAdded && { opacity: 0.5 },
//                 ]}
//                 source={{ uri: imageURI }}
//               />
//             ) : (
//               <View
//                 style={[
//                   {
//                     width: 56,
//                     height: 56,
//                     backgroundColor: "lightgray",
//                     borderRadius: 32,
//                   },
//                 ]}
//               ></View>
//             )}
//           </View>
//           <Text_TextBold>{avatarPlaceholderText}</Text_TextBold>
//         </TouchableOpacity>
//       );
//     },
//     [colours, selectedMeal, quickAccessToggle]
//   );

//   const addMealToPendingSelection = useCallback(
//     (item: DailyMeal_Meals) => {
//       if (selectedMeal === null) return;

//       realm.write(() => {
//         // If meal is being selected for the first time then overwrite
//         item.mealId = selectedMeal;
//         item.mealState = MealState.MEAL_READY_TO_BE_ADDED;
//       });
//     },
//     [realm, selectedMeal]
//   );

//   const removeMealSelection = useCallback(
//     (item: DailyMeal_Meals, dailyMeals: MealRoutine_DailyMeals) => {
//       realm.write(() => {
//         // Get meal type occurrence in this daily meal
//         const occurrences = dailyMeals.meals.filter(
//           (dailyMeal) => dailyMeal.mealType === item.mealType
//         ).length;

//         // If only one occurrence for this type was found then we can't remove from daily meals, just change state
//         if (occurrences === 1) {
//           item.mealId = undefined;
//           item.mealState = MealState.PENDING_MEAL_SELECTION;
//           return;
//         }

//         // Completely remove
//         realm.delete(item);
//       });
//     },
//     [realm]
//   );

//   const renderMealAvatars = useCallback(
//     (
//       { item }: { item: DailyMeal_Meals },
//       dailyMeals: MealRoutine_DailyMeals
//     ) => {
//       let disabled =
//         selectedMeal === null ||
//         mapping[activeIndex] !== item.mealType ||
//         !quickAccessToggle;

//       // If selected meal is null, we are in quick access mode and the meal has been added then we can allow button pressing for deletion
//       if (selectedMeal === null && quickAccessToggle) disabled = false;

//       return (
//         <RenderImage
//           imageURI={
//             MealState[item.mealState as keyof typeof MealState] ===
//               MealState.PENDING_MEAL_SELECTION ||
//             item.mealId === null ||
//             !item.mealId!.imageURI
//               ? undefined
//               : item.mealId!.imageURI
//           }
//           disabled={disabled}
//           avatarPlaceholderText={item.mealType.charAt(0).toUpperCase()}
//           onPress={() => addMealToPendingSelection(item)}
//           onLongPress={() => removeMealSelection(item, dailyMeals)}
//           readyToBeAdded={item.mealState === MealState.MEAL_READY_TO_BE_ADDED}
//         />
//       );
//     },
//     [selectedMeal, quickAccessToggle, activeIndex]
//   );

//   const filterMealByCategoryIndex = useCallback(
//     (index: number) => {
//       // Modify the existing stuff
//       let filteredMeals: Meals[] = [];
//       for (var meal of meals) {
//         if (meal.categories.includes(mapping2[index])) filteredMeals.push(meal);
//       }

//       return filteredMeals;
//     },
//     [meals]
//   );

//   const addNewMealToDailyMeals = useCallback(
//     (dailyMeals: MealRoutine_DailyMeals) => {
//       // We need to add a completely new meal to this dailymeals list
//       if (selectedMeal === null) return;

//       realm.write(() => {
//         // Try and find an occurrence of a meal type that has not been populated
//         const firstValidMealType = dailyMeals.meals.find(
//           (meal) =>
//             meal.mealType === mapping[activeIndex] &&
//             meal.mealState === MealState.PENDING_MEAL_SELECTION
//         );
//         if (firstValidMealType) {
//           (firstValidMealType.mealState = MealState.MEAL_READY_TO_BE_ADDED),
//             (firstValidMealType.mealId = selectedMeal);
//           firstValidMealType.mealType = mapping[activeIndex];
//           return;
//         }

//         dailyMeals.meals.push({
//           mealId: selectedMeal,
//           mealState: MealState.MEAL_READY_TO_BE_ADDED,
//           mealType: mapping[activeIndex],
//         });
//       });
//     },
//     [realm, selectedMeal]
//   );

//   const renderDailyItem = useCallback(
//     (
//       { item, index }: { item: MealRoutine_DailyMeals; index: number },
//       colours: ThemeColours
//     ) => {
//       let dateAsMoment = moment(item.date);

//       // Get unique mealTypes in the current dailyMeal, this will be useful if more snacks are added
//       const mealTypeCounts: MealTypeCount = {};

//       for (var mealType in MealType) {
//         // Get the number in daily meals
//         let occurrences = item.meals.filter(
//           (i) => i.mealType.toUpperCase() === mealType.toUpperCase()
//         );

//         mealTypeCounts[mealType] = occurrences;
//       }

//       // Determine if meal category requires underlining since it has been selected
//       const underlineBreakfast =
//         mealTypeCounts["BREAKFAST"].filter(
//           (meal) => meal.mealState === MealState.PENDING_REVIEW
//         ).length > 0;

//       const underlineLunch =
//         mealTypeCounts["LUNCH"].filter(
//           (meal) => meal.mealState === MealState.PENDING_REVIEW
//         ).length > 0;

//       const underlineDinner =
//         mealTypeCounts["DINNER"].filter(
//           (meal) => meal.mealState === MealState.PENDING_REVIEW
//         ).length > 0;

//       const sortedItemMeals = sortMealsByMealType(item.meals);

//       return (
//         <View
//           style={{
//             padding: 12,
//             paddingRight: 8,
//             borderRadius: 12,
//             borderWidth: 0.5,
//             marginHorizontal: 8,
//             marginVertical: 6,
//             gap: 12,
//             justifyContent: "center",
//             backgroundColor: colours.light,
//           }}
//         >
//           <View
//             style={{
//               flex: 1,
//               flexDirection: "row",
//               justifyContent: "space-between",
//             }}
//           >
//             <TouchableOpacity
//               disabled={quickAccessToggle}
//               activeOpacity={0.7}
//               delayLongPress={300}
//               onLongPress={() =>
//                 router.replace({
//                   pathname: "mealroutine/states/2_selecting_meals_day",
//                   params: { dayIndex: index },
//                 })
//               }
//             >
//               <View style={{ flexDirection: "row", alignItems: "center" }}>
//                 <Text_CardHeader>
//                   {item.day}, {dateAsMoment.format("Do")}
//                 </Text_CardHeader>
//                 {underlineBreakfast && underlineLunch && underlineBreakfast && (
//                   <CheckCircle
//                     size={32}
//                     color={colours.darkPrimary}
//                     weight="fill"
//                   />
//                 )}
//               </View>

//               <View style={{ flexDirection: "row" }}>
//                 <Text_TabIconText
//                   style={[underlineBreakfast && styles.mealCategoryUnderline]}
//                 >
//                   Breakfast
//                 </Text_TabIconText>
//                 <Text_TabIconText>, </Text_TabIconText>
//                 <Text_TabIconText
//                   style={[underlineLunch && styles.mealCategoryUnderline]}
//                 >
//                   Lunch
//                 </Text_TabIconText>
//                 <Text_TabIconText>, </Text_TabIconText>
//                 <Text_TabIconText
//                   style={[underlineDinner && styles.mealCategoryUnderline]}
//                 >
//                   Dinner
//                 </Text_TabIconText>
//                 <Text_TabIconText>, </Text_TabIconText>
//                 <Text_TabIconText>
//                   {mealTypeCounts["SNACK"].length === 0
//                     ? ""
//                     : mealTypeCounts["SNACK"].length === 1
//                     ? "Snack"
//                     : `Snacks (${mealTypeCounts["SNACK"].length})`}
//                 </Text_TabIconText>
//               </View>
//             </TouchableOpacity>
//             {quickAccessToggle && selectedMeal && (
//               <TouchableOpacity
//                 onPress={() => {
//                   addNewMealToDailyMeals(item);
//                 }}
//               >
//                 <PlusCircle size={56} weight="regular" color={colours.accent} />
//               </TouchableOpacity>
//             )}
//           </View>

//           <FlatList
//             contentContainerStyle={{
//               gap: 4,
//             }}
//             horizontal
//             scrollEnabled={true}
//             data={sortedItemMeals}
//             renderItem={(innerItem) => renderMealAvatars(innerItem, item)}
//             extraData={item.meals}
//           />
//         </View>
//       );
//     },
//     [colours, router, quickAccessToggle, selectedMeal]
//   );

//   const handleMealCategoryChange = useCallback(
//     (index: number) => {
//       // Modify the existing stuff
//       setFilteredMealsByType(filterMealByCategoryIndex(index));

//       // Clear all selected indices since we have changed category
//       setSelectedMeal(null);

//       // Set new active index
//       setActiveIndex(index);

//       // Reset scroll between category switching
//       flatListScrollRef.current?.scrollToOffset({ offset: 0 });
//     },
//     [meals]
//   );

//   const handleQuickAccessToggle = useCallback(() => {
//     setActiveIndex(0);
//     setSelectedMeal(null);
//     setQuickAccessToggle((prev) => !prev);

//     if (quickAccessSelections === 0) return;

//     // I need to remove any extra meals that are yet to be added

//     realm.write(() => {
//       activeMealRoutine!.dailyMeals.forEach((dailyMeal) =>
//         dailyMeal.meals.forEach((meal) => {
//           if (meal.mealState === MealState.MEAL_READY_TO_BE_ADDED) {
//             meal.mealState = MealState.PENDING_MEAL_SELECTION;
//           }
//         })
//       );
//     });
//   }, [realm, activeMealRoutine!.dailyMeals]);

//   const handleQuickAccessAdd = useCallback(() => {
//     setActiveIndex(0);
//     setSelectedMeal(null);
//     setQuickAccessToggle((prev) => !prev);

//     realm.write(() => {
//       activeMealRoutine!.dailyMeals.forEach((dailyMeal) =>
//         dailyMeal.meals.forEach((meal) => {
//           if (meal.mealState === MealState.MEAL_READY_TO_BE_ADDED)
//             meal.mealState = MealState.PENDING_REVIEW;
//         })
//       );
//     });
//   }, [realm, activeMealRoutine!.dailyMeals]);

//   const RenderMealCategoryScrollView = useCallback(
//     () => (
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingHorizontal: 12,
//           alignItems: "center",
//           gap: 2,
//         }}
//       >
//         <TouchableOpacity
//           key={0}
//           onPress={() => handleMealCategoryChange(0)}
//           delayPressIn={0}
//           style={
//             activeIndex === 0
//               ? [
//                   styles.segmentButtonActive,
//                   {
//                     backgroundColor: colours.darkPrimary,
//                     borderTopLeftRadius: 8,
//                     borderBottomLeftRadius: 8,
//                   },
//                 ]
//               : [
//                   styles.segmentButton,
//                   {
//                     backgroundColor: colours.secondary,
//                     borderTopLeftRadius: 8,
//                     borderBottomLeftRadius: 8,
//                   },
//                 ]
//           }
//         >
//           {activeIndex === 0 ? (
//             <Text_TextBold style={{ color: colours.buttonText }}>
//               Breakfast
//             </Text_TextBold>
//           ) : (
//             <Text_Text>Breakfast</Text_Text>
//           )}
//         </TouchableOpacity>
//         <TouchableOpacity
//           key={1}
//           onPress={() => handleMealCategoryChange(1)}
//           delayPressIn={0}
//           style={
//             activeIndex === 1
//               ? [
//                   styles.segmentButtonActive,
//                   { backgroundColor: colours.darkPrimary },
//                 ]
//               : [styles.segmentButton, { backgroundColor: colours.secondary }]
//           }
//         >
//           {activeIndex === 1 ? (
//             <Text_TextBold style={{ color: colours.buttonText }}>
//               Lunch
//             </Text_TextBold>
//           ) : (
//             <Text_Text>Lunch</Text_Text>
//           )}
//         </TouchableOpacity>
//         <TouchableOpacity
//           key={2}
//           onPress={() => handleMealCategoryChange(2)}
//           delayPressIn={0}
//           style={
//             activeIndex === 2
//               ? [
//                   styles.segmentButtonActive,
//                   { backgroundColor: colours.darkPrimary },
//                 ]
//               : [styles.segmentButton, { backgroundColor: colours.secondary }]
//           }
//         >
//           {activeIndex === 2 ? (
//             <Text_TextBold style={{ color: colours.buttonText }}>
//               Dinner
//             </Text_TextBold>
//           ) : (
//             <Text_Text>Dinner</Text_Text>
//           )}
//         </TouchableOpacity>
//         <TouchableOpacity
//           key={3}
//           onPress={() => handleMealCategoryChange(3)}
//           delayPressIn={0}
//           style={
//             activeIndex === 3
//               ? [
//                   styles.segmentButtonActive,
//                   {
//                     backgroundColor: colours.darkPrimary,
//                     borderTopRightRadius: 8,
//                     borderBottomRightRadius: 8,
//                   },
//                 ]
//               : [
//                   styles.segmentButton,
//                   {
//                     backgroundColor: colours.secondary,
//                     borderTopRightRadius: 8,
//                     borderBottomRightRadius: 8,
//                   },
//                 ]
//           }
//         >
//           {activeIndex === 3 ? (
//             <Text_TextBold style={{ color: colours.buttonText }}>
//               Snacks
//             </Text_TextBold>
//           ) : (
//             <Text_Text>Snacks</Text_Text>
//           )}
//         </TouchableOpacity>
//       </ScrollView>
//     ),
//     [colours, activeIndex]
//   );

//   // Create a useEffect that monitors the meal state and determines if the final modal should be shown
//   useLayoutEffect(() => {
//     let returnEarly = false;
//     // Loop through all meals for each day, exclude snacks from being required
//     for (var dailyMeal of activeMealRoutine!.dailyMeals) {
//       for (var meals of dailyMeal!.meals) {
//         // Skip if snack type
//         if (
//           MealType[meals.mealType as keyof typeof MealType] === MealType.SNACK
//         )
//           continue;

//         if (meals.mealState !== MealState.PENDING_REVIEW) returnEarly = true;
//       }
//     }

//     setFinished(!returnEarly);

//     // Not ready to render the bottom sheet just yet
//     if (returnEarly) return;

//     // We are ready
//     //    handleFinishBottomSheetOpen();
//   }, [activeMealRoutine!.dailyMeals]);

//   // Custom stack header, based on finished and quick access states
//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerLeft: () =>
//         createRoutineCustomHeaderLeft(
//           colours,
//           handleFinishBottomSheetOpen,
//           finished
//         ),

//       headerRight: () =>
//         createRoutineCustomHeaderRight(
//           colours,
//           quickAccessToggle
//             ? () => setQuickAccessToggle((prev) => !prev)
//             : handleQuickAccessToggle
//         ),
//     });
//   }, [navigation, quickAccessToggle, finished]);

//   // Initial population of the filtered quick access meals
//   useEffect(() => {
//     setFilteredMealsByType(filterMealByCategoryIndex(activeIndex));
//   }, []);

//   const MealCategoryFlatList = useCallback(() => {
//     return (
//       <FlatList
//         horizontal
//         ref={flatListScrollRef}
//         data={filteredMealsByType}
//         extraData={[meals, filteredMealsByType]}
//         initialNumToRender={4}
//         contentContainerStyle={{
//           gap: 12,
//           paddingHorizontal: 12,
//         }}
//         renderItem={renderMeal}
//         keyExtractor={(item) => item._id.toString()}
//       />
//     );
//   }, [meals, filteredMealsByType, selectedMeal]);

//   return (
//     <View style={{ flex: 1 }}>
//       <View
//         style={{
//           flex: quickAccessToggle ? 1 / 2 : 0,
//           display: quickAccessToggle ? "flex" : "none",
//           backgroundColor: colours.background,
//           borderWidth: 0.5,
//           borderColor: "lightgray",
//           justifyContent: "space-around",
//         }}
//       >
//         <View style={{ flex: 1, gap: 8 }}>
//           <RenderMealCategoryScrollView />
//           <MealCategoryFlatList />
//         </View>
//       </View>

//       <FlatList
//         data={activeMealRoutine!.dailyMeals}
//         extraData={activeMealRoutine!.dailyMeals}
//         renderItem={(item) => renderDailyItem(item, colours)}
//         keyExtractor={(item) => item.date.toDateString()}
//         style={{ flex: quickAccessToggle ? 1 / 2 : 0 }}
//       />

//       <View
//         style={{
//           borderWidth: 0.5,
//           borderColor: "lightgray",
//           flex: quickAccessToggle ? 1 / 6 : 0,
//           display: quickAccessToggle ? "flex" : "none",
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: 12,
//           paddingHorizontal: 12,
//         }}
//       >
//         <Button_BackgroundThin
//           style={{
//             flex: 1,
//           }}
//           onPress={handleQuickAccessToggle}
//         >
//           Cancel
//         </Button_BackgroundThin>
//         {quickAccessToggle && quickAccessSelections > 0 && (
//           <Button_PrimaryThin
//             style={{
//               flex: 2,
//               borderWidth: 1,
//               borderColor: colours.darkPrimary,
//             }}
//             onPress={handleQuickAccessAdd}
//           >
//             Quick Add
//           </Button_PrimaryThin>
//         )}
//       </View>
//       {finished && (
//         <BottomSheet
//           ref={finishBottomSheetRef}
//           snapPoints={finishSnapPoints}
//           enablePanDownToClose={true}
//           index={finished ? 0 : -1}
//           handleComponent={() => <></>}
//           backdropComponent={renderFinishBackdrop}
//           handleIndicatorStyle={{ backgroundColor: colours.background }}
//           backgroundStyle={{ backgroundColor: colours.background }}
//         >
//           <BottomSheetView
//             style={[
//               styles.bottomSheetContainer,
//               { backgroundColor: colours.background },
//             ]}
//           >
//             <Button_Wide
//               onPress={() => {
//                 realm.write(() => {
//                   activeMealRoutine!.mealRoutineState =
//                     MealRoutineState.SHOPPING;
//                 });

//                 router.replace("mealroutine/states/3_shopping");
//               }}
//             >
//               Confirm Routine
//             </Button_Wide>
//             <Button_BackgroundThin onPress={handleFinishBottomSheetClose}>
//               Make Amendments
//             </Button_BackgroundThin>
//           </BottomSheetView>
//         </BottomSheet>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mealCategoryUnderline: {
//     textDecorationLine: "line-through",
//     textDecorationStyle: "solid",
//   },

//   bottomSheetContainer: {
//     paddingHorizontal: 48,
//     justifyContent: "space-evenly",
//     flex: 1,
//     borderTopLeftRadius: 32,
//     borderTopRightRadius: 32,
//   },

//   segmentButtonActive: {
//     paddingHorizontal: 14,
//     paddingVertical: 4,
//   },

//   segmentButton: {
//     paddingHorizontal: 14,
//     paddingVertical: 4,
//   },
// });

// export default Screen;
