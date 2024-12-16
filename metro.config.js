const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// 추가: expo-asset 플러그인 설정
config.transformer.assetPlugins = ["expo-asset/tools/hashAssetFiles"];

module.exports = config;
