// Learn more https://docs.expo.io/guides/customizing-metro
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Shared design tokens live in the monorepo at /packages/tokens (linked via `file:`).
const tokensDir = path.resolve(__dirname, '../../packages/tokens');
config.watchFolders = [...(config.watchFolders ?? []), tokensDir];

module.exports = config;
