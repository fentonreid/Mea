import Loading from "@/components/Loading";
import MealRoutineStateManager from "@/managers/MealRoutineStateManager";
import { MealRoutineState } from "@/models/enums/MealRoutineState";

const Screen = () => {
  console.log("IN 1");
  const activeMealRoutine = MealRoutineStateManager({
    ignoreCurrentMealRoutineState: [MealRoutineState.SELECTING_DATE_RANGE],
  });

  console.log(activeMealRoutine);

  return <Loading />;
};

export default Screen;

// import { MealRoutineState } from "@/models/enums/MealRoutineState";
// import MealRoutineStateManager from "@/managers/MealRoutineStateManager";
// import DatePickerCalendar from "@/components/DatePickerCalendar";
// import { View } from "react-native";
// import { Text_Text, Text_TextBold } from "@/components/TextStyles";
// import { SettingsContext } from "@/store/SettingsContext";
// import { useCallback, useContext, useState } from "react";
// import Spacings from "@/constants/Spacings";
// import { Button_PrimaryNormal } from "@/components/ButtonStyles";
// import { router } from "expo-router";
// import {
//   MomentToUTCDateEnd,
//   MomentToUTCDateStart,
//   ToUTCDateStartFromMoment,
// } from "@/constants/Date";
// import moment from "moment";
// import { MealType } from "@/models/enums/MealType";
// import { MealState } from "@/models/enums/MealState";
// import { useSystem } from "@/powersync/PowerSync";

// const Screen = () => {
//   const { colours } = useContext(SettingsContext);

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const { supabaseConnector, db } = useSystem();

//   const loggedInUser = //useQuery<Users>("Users")[0];

//   let activeMealRoutine = MealRoutineStateManager({
//     ignoreCurrentMealRoutineState: [
//       MealRoutineState.ACTIVE_MEAL_ROUTINE_NULL,
//       MealRoutineState.SELECTING_DATE_RANGE,
//     ],
//   });

//   // Method to create a new active meal routine
//   const createMealRoutine = () =>
//     realm.write(() => {
//       // Create association between users and meal routines
//       loggedInUser.activeMealRoutineId = {
//         _id: new ObjectId(),
//         creatorId: loggedInUser._id,
//         dailyMeals: [],
//         mealRoutineState: MealRoutineState.ACTIVE_MEAL_ROUTINE_NULL,
//         shoppingList: [],
//       };
//     });

//   const updateActiveMealRoutine = useCallback(
//     (startDate: string, endDate: string) => {
//       // Meal Routine is null, so need to create an active meal routine reference from users to mealRoutines and populate the mealRoutine as expected
//       if (loggedInUser.activeMealRoutineId === null) createMealRoutine();

//       // Create a meals object loop through each day and create: breakfast, lunch, dinner and snack objects
//       let currentDate = moment(startDate).startOf("day");
//       const end = moment(endDate);

//       while (currentDate.isSameOrBefore(end, "day")) {
//         // Create a meal routine per day
//         let dailyMeal: DailyMeal_Meals[] = [];

//         // Create a meal for each meal type: breakfast, lunch, etc...
//         for (let mealType in MealType) {
//           dailyMeal.push({
//             mealType: mealType,
//             mealState: MealState.PENDING_MEAL_SELECTION,
//             review: null,
//           });
//         }

//         realm.write(() => {
//           loggedInUser.activeMealRoutineId!.dailyMeals.push({
//             date: ToUTCDateStartFromMoment(currentDate),
//             day: currentDate.format("dddd"),
//             meals: dailyMeal,
//           });
//         });

//         // Increment currentDate
//         currentDate = currentDate.add(1, "days");
//       }

//       realm.write(() => {
//         loggedInUser.activeMealRoutineId!.mealRoutineState =
//           MealRoutineState.SELECTING_MEALS;
//         loggedInUser.activeMealRoutineId!.startDate =
//           MomentToUTCDateStart(startDate);
//         loggedInUser.activeMealRoutineId!.endDate = MomentToUTCDateEnd(endDate);
//       });

//       // Manually change to next route
//       router.replace("mealroutine/states/2_selecting_meals_quick_access");
//     },
//     [activeMealRoutine, realm]
//   );

//   const dateSelectionHandler = (start: string, end: string) => {
//     setStartDate(start);
//     setEndDate(end);
//   };

//   const confirmDateHandler = () => {
//     if (startDate == "" || endDate == "") return;

//     updateActiveMealRoutine(startDate, endDate);
//   };

//   return (
//     <View
//       style={{
//         padding: Spacings.mainContainerViewPadding,
//         marginVertical: 24,
//         gap: 24,
//         flex: 1,
//         justifyContent: "space-between",
//       }}
//     >
//       <Text_Text>
//         Please select your end date for this meal routine. A maximum of{" "}
//         <Text_TextBold style={{ color: colours.accent }}>10 days</Text_TextBold>{" "}
//         from{" "}
//         <Text_TextBold style={{ color: colours.accent }}>today</Text_TextBold>{" "}
//         is allowed.
//       </Text_Text>
//       <DatePickerCalendar dateSelectedHandler={dateSelectionHandler} />
//       <Button_PrimaryNormal
//         disabled={startDate == "" || endDate == ""}
//         onPress={confirmDateHandler}
//       >
//         Confirm Dates
//       </Button_PrimaryNormal>
//     </View>
//   );
// };

// export default Screen;
