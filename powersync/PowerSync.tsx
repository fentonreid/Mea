import "@azure/core-asynciterator-polyfill";
import "react-native-polyfill-globals/auto";
import { createContext, useContext } from "react";
import {
  AbstractPowerSyncDatabase,
  PowerSyncDatabase,
} from "@powersync/react-native";
import { AppSchema, Database } from "./AppSchema";
import { SupabaseConnector } from "./SupabaseConnector";
import { Kysely, wrapPowerSyncWithKysely } from "@powersync/kysely-driver";

export class System {
  supabaseConnector: SupabaseConnector;
  powersync: AbstractPowerSyncDatabase;
  db: Kysely<Database>;

  constructor() {
    this.powersync = new PowerSyncDatabase({
      schema: AppSchema,
      database: {
        dbFilename: "app.sqlite",
      },
    });

    this.supabaseConnector = new SupabaseConnector();
    this.db = wrapPowerSyncWithKysely(this.powersync);
  }

  async init() {
    console.log("Initializing system");
    await this.powersync.init();
    await this.powersync.connect(this.supabaseConnector);
  }
}

export const system = new System();
export const SystemContext = createContext(system);
export const useSystem = () => useContext(SystemContext);
