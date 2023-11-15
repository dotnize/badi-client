// Design token constants for Badi's theme.

// For typography, we're using Paper's text component:
// https://callstack.github.io/react-native-paper/docs/components/Text/
// ---

/**
 * Mainly for margin, padding, gap, and element sizes such as icons.
 * For text sizes, use Paper's text component.
 *
 * From tailwind's spacing scale: https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
 */
export const SIZES = {
    px: 1,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
    32: 128,
    40: 160,
    48: 192,
    56: 224,
    64: 256,
    72: 288,
    80: 320,
    96: 384,
} as const;

/**
 * Generated from https://callstack.github.io/react-native-paper/docs/guides/theming/#creating-dynamic-theme-colors
 *
 * Source color: #6EB257
 */
export const COLORS = {
    primary: "rgb(43, 108, 25)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(173, 245, 145)",
    onPrimaryContainer: "rgb(3, 33, 0)",
    secondary: "rgb(84, 98, 77)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(216, 231, 204)",
    onSecondaryContainer: "rgb(18, 31, 14)",
    tertiary: "rgb(56, 102, 104)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(188, 235, 237)",
    onTertiaryContainer: "rgb(0, 32, 33)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(253, 253, 246)",
    onBackground: "rgb(26, 28, 24)",
    surface: "rgb(253, 253, 246)",
    onSurface: "rgb(26, 28, 24)",
    surfaceVariant: "rgb(223, 228, 215)",
    onSurfaceVariant: "rgb(67, 72, 63)",
    outline: "rgb(115, 121, 110)",
    outlineVariant: "rgb(195, 200, 188)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(47, 49, 45)",
    inverseOnSurface: "rgb(241, 241, 234)",
    inversePrimary: "rgb(146, 216, 120)",
    elevation: {
        level0: "transparent",
        level1: "rgb(243, 246, 235)",
        level2: "rgb(236, 241, 228)",
        level3: "rgb(230, 237, 222)",
        level4: "rgb(228, 236, 220)",
        level5: "rgb(224, 233, 215)",
    },
    surfaceDisabled: "rgba(26, 28, 24, 0.12)",
    onSurfaceDisabled: "rgba(26, 28, 24, 0.38)",
    backdrop: "rgba(45, 50, 41, 0.4)",
} as const;
