import SettingItem from "@/components/SettingItem";
import LayoutStyles from "@/constants/LayoutStyles";
import { SettingItem_ActionStyle } from "@/models/enums/SettingItem_ActionStyle";
import { SettingItem_BorderStyle } from "@/models/enums/SettingItem_BorderStyle";
import { useRouter } from "expo-router";
import {
  GearSix,
  LockKey,
  SignOut,
  User,
  UserList,
} from "phosphor-react-native";
import { Platform, ScrollView, View } from "react-native";
import Constants from "expo-constants";
import { Text_Input } from "@/components/TextStyles";
import Spacings from "@/constants/Spacings";
import { useSystem } from "@/powersync/PowerSync";

const SettingsScreen = () => {
  const router = useRouter();
  const { supabaseConnector, powersync } = useSystem();

  const onSignOut = async () => {
    await powersync.disconnectAndClear();
    await supabaseConnector.client.auth.signOut();
  };

  return (
    <ScrollView contentContainerStyle={LayoutStyles.settingListScrollView}>
      <SettingItem
        Icon={GearSix}
        Title="User Preferences"
        BorderStyle={SettingItem_BorderStyle.START}
        Action={{
          type: SettingItem_ActionStyle.CHEVRON,
          OnPress: () => {
            router.push("/more/preferences");
          },
        }}
      />

      <SettingItem
        Icon={User}
        Title="Manage User Data"
        BorderStyle={SettingItem_BorderStyle.END}
        Action={{
          type: SettingItem_ActionStyle.CHEVRON,
          OnPress: () => {
            router.push("/more/manageuser");
          },
        }}
      />

      <View style={{ gap: 2, marginTop: Spacings.betweenCardAndHeading }}>
        <SettingItem
          Icon={SignOut}
          Title="Logout"
          BorderStyle={SettingItem_BorderStyle.SINGLE}
          Action={{
            type: SettingItem_ActionStyle.NONE,
            OnPress: onSignOut,
          }}
        />
      </View>

      <View style={{ gap: 2, marginTop: Spacings.betweenCardAndHeading }}>
        <SettingItem
          Icon={LockKey}
          Title="Privacy Policy"
          BorderStyle={SettingItem_BorderStyle.START}
          Action={{
            type: SettingItem_ActionStyle.CHEVRON,
            OnPress: () => {
              router.push("/more/inner/privacy");
            },
          }}
        />

        <SettingItem
          Icon={UserList}
          Title="Credits"
          BorderStyle={SettingItem_BorderStyle.END}
          Action={{
            type: SettingItem_ActionStyle.CHEVRON,
            OnPress: () => {
              router.push("/more/inner/credits");
            },
          }}
        />
      </View>

      <View style={{ marginTop: Spacings.betweenCardAndHeading }}>
        <Text_Input style={{ textAlign: "center" }}>
          App Version: {Constants.expoConfig?.version}
        </Text_Input>
        {Platform.OS === "android" && (
          <Text_Input style={{ textAlign: "center" }}>
            Android Version Code: {Constants.expoConfig?.android?.versionCode}
          </Text_Input>
        )}

        {Platform.OS === "ios" && (
          <Text_Input>IOS: {Constants.expoConfig?.ios?.buildNumber}</Text_Input>
        )}
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
