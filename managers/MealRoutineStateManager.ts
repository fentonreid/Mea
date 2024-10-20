import { MealRoutineState } from "@/models/enums/MealRoutineState";
import { MEAL_ROUTINES_TABLE } from "@/powersync/AppSchema";
import { useSystem } from "@/powersync/PowerSync";
import { router } from "expo-router";
import { useEffect } from "react";

type Props = {
  ignoreCurrentMealRoutineState?: MealRoutineState[];
};

const MealRoutineStateManager = async ({
  ignoreCurrentMealRoutineState,
}: Props) => {
  const { supabaseConnector, db } = useSystem();
  const { userId } = await supabaseConnector.fetchCredentials();

  const mealRoutineState = await db
    .selectFrom(MEAL_ROUTINES_TABLE)
    .select("meal_routine_state")
    .where("creator_id", "=", userId)
    .where("start_date", ">=", "datetime('now', 'utc')")
    .where("end_date", "<", "datetime('now', 'utc')")
    .orderBy("start_date")
    .executeTakeFirst();

  useEffect(() => {
    const state =
      mealRoutineState === undefined
        ? MealRoutineState.ACTIVE_MEAL_ROUTINE_NULL
        : (mealRoutineState.meal_routine_state as MealRoutineState);

    // If we are already on the meal routine state then ignore...
    if (
      !ignoreCurrentMealRoutineState ||
      ignoreCurrentMealRoutineState!.includes(state)
    )
      return;

    // SWITCH on mealRoutineState and redirect to appropriate stack
    switch (state) {
      case MealRoutineState.ACTIVE_MEAL_ROUTINE_NULL:
      case MealRoutineState.SELECTING_DATE_RANGE:
        router.replace("mealroutine/states/1_selecting_date_range");
        break;

      case MealRoutineState.SELECTING_MEALS:
        router.replace("mealroutine/states/2_selecting_meals_day");
        break;

      case MealRoutineState.SHOPPING:
        router.replace("mealroutine/states/3_shopping");
        break;

      case MealRoutineState.CONFIRM_CREATION:
        router.replace("mealroutine/states/4_confirm_creation");
        break;

      case MealRoutineState.VIEWING:
        router.replace("mealroutine/states/5_viewing");
        break;

      case MealRoutineState.COMPLETE:
        router.replace("mealroutine/states/6_complete");
        break;
    }
  }, [mealRoutineState?.meal_routine_state]);

  if (mealRoutineState !== undefined)
    return mealRoutineState.meal_routine_state;

  return null;
};

export default MealRoutineStateManager;
