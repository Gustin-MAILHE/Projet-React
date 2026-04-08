import { Dimensions, Platform, PixelRatio } from "react-native";

const { width: SCREEN_W } = Dimensions.get("window");
const BASE_WIDTH = 390;
const IS_DESKTOP = SCREEN_W >= 768;
const SCALE = IS_DESKTOP ? 1 : SCREEN_W / BASE_WIDTH;

export const sw = (size: number): number => IS_DESKTOP ? size : Math.round(size * SCALE);
export const sf = (size: number): number => IS_DESKTOP ? size : Platform.OS === "web" ? Math.round(size * SCALE) : Math.round(PixelRatio.roundToNearestPixel(size * SCALE));
export const SCREEN_WIDTH       = SCREEN_W;
export const IS_DESKTOP_SCREEN  = IS_DESKTOP;