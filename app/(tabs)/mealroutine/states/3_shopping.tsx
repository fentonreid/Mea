import Loading from "@/components/Loading";
import MealRoutineStateManager from "@/managers/MealRoutineStateManager";
import { MealRoutineState } from "@/models/enums/MealRoutineState";

const Screen = () => {
  console.log("IN 3");
  const activeMealRoutine = MealRoutineStateManager({
    ignoreCurrentMealRoutineState: [MealRoutineState.SHOPPING],
  });

  console.log(activeMealRoutine);

  return <Loading />;
};

export default Screen;

// import {
//   Text_CardHeader,
//   Text_ListText,
//   Text_Text,
//   Text_TextBold,
// } from "@/components/TextStyles";
// import MealRoutineStateManager from "@/managers/MealRoutineStateManager";
// import { MealRoutineState } from "@/models/enums/MealRoutineState";
// import {
//   View,
//   Image,
//   ActivityIndicator,
//   StyleSheet,
//   SectionList,
// } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import React, {
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import BottomSheet, {
//   BottomSheetBackdrop,
//   BottomSheetView,
// } from "@gorhom/bottom-sheet";
// import { SettingsContext } from "@/store/SettingsContext";
// import { Button_BackgroundThin, Button_Wide } from "@/components/ButtonStyles";
// import { router } from "expo-router";
// import BouncyCheckbox from "react-native-bouncy-checkbox/build/dist/BouncyCheckbox";
// import { PlusCircle } from "phosphor-react-native";

// const LoadingShoppingList = () => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         gap: 24,
//       }}
//     >
//       <Image
//         source={require("@/assets/images/shopping/frogMixing.png")}
//         style={{
//           resizeMode: "contain",
//           alignSelf: "center",
//           transform: [{ scaleX: -1 }],
//         }}
//       />
//       <View>
//         <Text_TextBold>Froggo is creating your shopping list...</Text_TextBold>
//         <ActivityIndicator size="large" />
//       </View>
//     </View>
//   );
// };

// const finishSnapPoints = ["35%"];

// const Screen = () => {
//   const { colours } = useContext(SettingsContext);
//   const realm = useRealm();
//   const [finished, setFinished] = useState(false);
//   const finishBottomSheetRef = useRef<BottomSheet>(null);
//   const ingredients = useQuery<Ingredients>("Ingredients");
//   const units = useQuery<Units>("Units");
//   const shoppingCategories = useQuery<ShoppingCategories>("ShoppingCategories");

//   const activeMealRoutine = MealRoutineStateManager({
//     ignoreCurrentMealRoutineState: [MealRoutineState.SHOPPING],
//   });

//   // Create a useEffect that monitors the meal state and determines if the final modal should be shown
//   // This useEffect will also determine if the shoppingList state needs updated
//   useEffect(() => {
//     if (
//       !activeMealRoutine!.shoppingList ||
//       activeMealRoutine!.shoppingList.length === 0
//     )
//       return;

//     let shoppingComplete = true;

//     // Loop through all meals for each day, exclude snacks from being required
//     for (var shoppingItem of activeMealRoutine!.shoppingList)
//       if (shoppingItem.isAdded === false) shoppingComplete = false;

//     setFinished(shoppingComplete);
//   }, [activeMealRoutine!.shoppingList]);

//   const createShoppingList = () => {
//     // DEBUG: Onion, count 1
//     const initialShoppingList: MealRoutine_ShoppingList[] = [
//       // {
//       //   ingredient: activeMealRoutine!.dailyMeals[0].meals[0].mealId!.ingredients[0]
//       //   isAdded: true,
//       //   unit: activeMealRoutine!.dailyMeals[0].meals[0].mealId?.ingredients[0].ingredient,
//       //   totalQuantity: 1,
//       // },
//     ];

//     setTimeout(() => {
//       realm.write(() => {
//         activeMealRoutine!.shoppingList = initialShoppingList;
//       });
//     }, 1000);
//   };

//   const deleteShoppingList = () => {
//     realm.write(() => {
//       realm.delete(activeMealRoutine!.shoppingList);
//     });
//   };

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

//   const styles = useMemo(
//     () =>
//       StyleSheet.create({
//         segmentButtonActive: {
//           paddingHorizontal: 14,
//           paddingVertical: 4,
//           backgroundColor: colours.darkPrimary,
//         },

//         segmentButton: {
//           paddingHorizontal: 14,
//           paddingVertical: 4,
//           backgroundColor: colours.secondary,
//         },

//         divider: {
//           marginVertical: 8,
//           height: 2,
//           backgroundColor: colours.secondary,
//         },

//         shoppingItemDivider: {
//           marginVertical: 8,
//           height: 1,
//           backgroundColor: colours.background,
//         },

//         mealCategoryScrollView: {
//           paddingHorizontal: 12,
//           gap: 4,
//           marginBottom: 12,
//         },

//         checkbox: {
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginRight: -16,
//         },

//         filterCard: {
//           paddingHorizontal: 12,
//           paddingVertical: 6,
//           margin: 12,
//           backgroundColor: colours.light,
//           borderRadius: 12,
//           elevation: 0.2,
//         },

//         searchbar: {
//           flexDirection: "row",
//           alignItems: "center",
//           gap: 6,
//           padding: 2,
//           borderRadius: 12,
//           backgroundColor: colours.secondary,
//           flex: 1,
//         },

//         quickAccessBottomButtonContainer: {
//           borderTopWidth: 0.5,
//           borderColor: "lightgray",
//           flex: 1 / 10,
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: 12,
//           paddingHorizontal: 12,
//           paddingVertical: 2,
//         },

//         quickAccessConfirmButton: {
//           flex: 2,
//           borderWidth: 1,
//           borderColor: colours.darkPrimary,
//         },

//         quickAccessFlatListContainer: {
//           flex: 1,
//           backgroundColor: colours.secondary,
//           marginHorizontal: 12,
//           borderRadius: 6,
//           paddingBottom: 6,
//         },

//         searchBarContainer: {
//           flexDirection: "row",
//           paddingHorizontal: 12,
//           justifyContent: "space-between",
//           alignItems: "center",
//         },

//         mealCategoryFlatlistContainer: {
//           flex: 1,
//           flexDirection: "row",
//           backgroundColor: colours.background,
//           borderRadius: 8,
//           padding: 8,
//           gap: 16,
//         },

//         mealCategoryItemSelected: {
//           borderWidth: 6,
//           borderColor: colours.darkPrimary,
//         },

//         mealCategoryContainer: {
//           paddingHorizontal: 12,
//           alignItems: "center",
//           gap: 2,
//         },

//         ratingContainer: {
//           flexDirection: "row",
//           gap: 4,
//           alignItems: "center",
//           marginLeft: 6,
//         },

//         sectionHeaderContainer: {
//           flex: 1,
//           borderTopLeftRadius: 8,
//           borderTopRightRadius: 8,
//           backgroundColor: colours.light,
//           paddingHorizontal: 12,
//         },

//         sectionHeaderInnerContainer: {
//           flexDirection: "row",
//           gap: 4,
//           alignItems: "center",
//         },

//         sectionHeaderDivider: {
//           height: 2,
//           backgroundColor: colours.secondary,
//           marginTop: 2,
//         },

//         bottomSheetBackground: { backgroundColor: colours.background },

//         finishedBottomSheetContainer: {
//           paddingHorizontal: 48,
//           justifyContent: "space-evenly",
//           flex: 1,
//           borderTopLeftRadius: 32,
//           borderTopRightRadius: 32,
//         },

//         bottomSheetContainer: {
//           paddingHorizontal: 48,
//           justifyContent: "space-evenly",
//           flex: 1,
//           borderTopLeftRadius: 32,
//           borderTopRightRadius: 32,
//         },
//       }),
//     [colours]
//   );

//   const RenderShoppingCategoryHeader = ({
//     section: { title },
//   }: {
//     section: {
//       title: string;
//     };
//   }) => {
//     return (
//       <View style={styles.sectionHeaderContainer}>
//         <View style={styles.sectionHeaderInnerContainer}>
//           <Text_CardHeader>{title}</Text_CardHeader>
//         </View>
//       </View>
//     );
//   };

//   const handleShoppingItemPress = (
//     isChecked: Boolean,
//     item: MealRoutine_ShoppingList
//   ) => {
//     console.log("PRESSED:", isChecked, item);
//   };

//   const RenderShoppingItem = ({
//     item,
//     index,
//     section,
//   }: {
//     item: MealRoutine_ShoppingList;
//     index: number;
//     section: {
//       title: string;
//       data: MealRoutine_ShoppingList[];
//     };
//   }) => {
//     let isChecked = false;
//     return (
//       <View
//         style={[
//           {
//             flex: 1,
//             backgroundColor: colours.light,
//           },
//           index === section.data.length - 1 && {
//             borderBottomLeftRadius: 8,
//             borderBottomRightRadius: 8,
//           },
//         ]}
//       >
//         <View
//           style={[
//             {
//               flex: 1,
//               marginHorizontal: 12,
//               flexDirection: "row",
//               justifyContent: "flex-end",
//               alignItems: "center",
//               gap: 24,
//             },
//           ]}
//         >
//           <Text_ListText>
//             {item.ingredient.name} ({item.totalQuantity}
//             {item.unit.unitDisplayName.length > 0
//               ? " " + item.unit.unitDisplayName
//               : ""}
//             )
//           </Text_ListText>
//           <View style={{ marginRight: -16 }}>
//             <BouncyCheckbox
//               size={32}
//               isChecked={isChecked}
//               onPress={(isChecked) => handleShoppingItemPress(isChecked, item)}
//               fillColor={colours.primaryButton}
//             />
//           </View>
//         </View>
//         {index !== section.data.length - 1 ? (
//           <View
//             style={[
//               { flex: 1, marginHorizontal: 12 },
//               styles.shoppingItemDivider,
//             ]}
//           />
//         ) : (
//           <View style={{ marginBottom: 8 }} />
//         )}
//       </View>
//     );
//   };

//   const RenderSectionFooter = ({
//     section,
//   }: {
//     section: { title: string; data: MealRoutine_ShoppingList[] };
//   }) => {
//     // Todo: Not hard code this...
//     if (section.title === "Desserts") return null;

//     return (
//       <View
//         style={{
//           height: 24,
//         }}
//       />
//     );
//   };

//   const AddShoppingItemComponent = useCallback(() => {
//     return (
//       <TouchableOpacity
//         style={{
//           justifyContent: "center",
//           alignItems: "center",
//           paddingVertical: 12,
//         }}
//       >
//         <PlusCircle size={72} weight="fill" color={colours.accentButton} />
//       </TouchableOpacity>
//     );
//   }, []);

//   const getShoppingList = (): {
//     title: string;
//     data: MealRoutine_ShoppingList[];
//   }[] => {
//     let shoppingList: {
//       title: string;
//       data: MealRoutine_ShoppingList[];
//     }[] = [];

//     // I need to go to the meal routine and foreach day get the ingredients
//     for (var dailyMeals of activeMealRoutine!.dailyMeals) {
//       for (var meal of dailyMeals.meals) {
//         if (meal.mealId === null) continue;

//         for (var ingredient of meal.mealId!.ingredients) {
//           // Ingredient
//           let foundIngredient = ingredients.find(
//             (item) => item._id.toString() === ingredient.ingredientId.toString()
//           )!;

//           // Unit
//           let foundUnit = units.find(
//             (item) =>
//               item._id.toString() ===
//               meal.mealId!.ingredients[0].unit.toString()
//           )!;

//           // Shopping category
//           let foundShoppingCategory = shoppingCategories.find(
//             (item) =>
//               item._id.toString() ===
//               foundIngredient.shoppingCategory.toString()
//           )!.shoppingCategory;

//           // Does the category exist? If not then add a new section
//           let foundCategory = shoppingList.find(
//             (category) => category.title === foundShoppingCategory
//           );

//           if (foundCategory) {
//             foundCategory.data.push({
//               ingredient: foundIngredient,
//               isAdded: false,
//               unit: foundUnit,
//               totalQuantity: ingredient.quantity as string,
//             });
//           } else {
//             shoppingList.push({
//               title: foundShoppingCategory,
//               data: [
//                 {
//                   ingredient: foundIngredient!,
//                   isAdded: false,
//                   unit: foundUnit,
//                   totalQuantity: ingredient.quantity as string,
//                 },
//               ],
//             });
//           }
//         }
//       }
//     }

//     return shoppingList;
//   };

//   // // Create shopping list if it is not defined
//   // useEffect(() => {
//   //   let shoppingList = getShoppingList();
//   //   // Do something here
//   // }, []);

//   return (
//     <View style={{ flex: 1, marginTop: 12 }}>
//       {/* {!activeMealRoutine!.shoppingList ||
//       activeMealRoutine!.shoppingList.length === 0 ? (
//         <LoadingShoppingList />
//       ) : ( */}
//       <View style={{ flex: 1, marginHorizontal: 12 }}>
//         <SectionList
//           showsVerticalScrollIndicator={false}
//           sections={getShoppingList()}
//           extraData={activeMealRoutine!.shoppingList}
//           keyExtractor={(item, index) =>
//             item!.ingredient!._id.toString() + index
//           }
//           renderItem={RenderShoppingItem}
//           renderSectionFooter={RenderSectionFooter}
//           renderSectionHeader={RenderShoppingCategoryHeader}
//         />
//         <AddShoppingItemComponent />
//         <TouchableOpacity onPress={deleteShoppingList}>
//           <Text_Text>DELETE SHOPPING LIST</Text_Text>
//         </TouchableOpacity>
//       </View>
//       {/* )} */}

//       {finished && (
//         <BottomSheet
//           ref={finishBottomSheetRef}
//           snapPoints={finishSnapPoints}
//           enablePanDownToClose={true}
//           handleComponent={null}
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

//                 router.replace("mealroutine/states/4_confirm_creation");
//               }}
//             >
//               Shopping Done
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

// export default Screen;
