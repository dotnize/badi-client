import type { EventMapBase, NavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import {
  createMaterialBottomTabNavigator,
  type MaterialBottomTabNavigationOptions,
} from "react-native-paper/react-navigation";

const { Navigator } = createMaterialBottomTabNavigator();

const MaterialBottomTabs = withLayoutContext<
  MaterialBottomTabNavigationOptions,
  typeof Navigator,
  NavigationState,
  EventMapBase
>(Navigator);

export default MaterialBottomTabs;
