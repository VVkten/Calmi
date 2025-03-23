// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: 'expo',
  ignorePatterns: ['/dist/*'],
  "rules": {
    "react/jsx-no-undef": ["error", { "allowGlobals": true }]
  }
};
