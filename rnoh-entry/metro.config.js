/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { mergeConfig, getDefaultConfig } = require('@react-native/metro-config');
const {
  createHarmonyMetroConfig,
} = require('@react-native-oh/react-native-harmony/metro.config');
const pathUtils = require('node:path');

module.exports = mergeConfig(
  getDefaultConfig(__dirname),
  createHarmonyMetroConfig({
    reactNativeHarmonyPackageName: '@react-native-oh/react-native-harmony',

    /**
     * INTERNAL: We do it because RNOH isn't in node_modules (it's symlinked).
     */
    __reactNativeHarmonyPattern:
      pathUtils.sep + 'react-native-harmony' + pathUtils.sep,

    /**
     * INTERNAL: We do it because RNOH isn't in node_modules (it's symlinked).
     */
    __reactNativeInteropLibraryPackagePattern:
      pathUtils.sep + 'react-native-harmony-61-interop' + pathUtils.sep,
  }),
  {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    }
  }
);
