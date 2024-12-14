/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#3C7960';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#F2F6F3',
    tint: tintColorLight,
    icon: '#ccc',
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
} as const;

export type ThemeMode = keyof typeof Colors; // "light"만 포함

