import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.b198731.app',
  appName: 'Lista Cumparaturi',
  webDir: 'dist/lista-cumparaturi',
  server: {
    androidScheme: 'https',
    "cleartext": true,
    "hostname": "localhost"
  },
  "android": {
    "allowMixedContent": true
  },
};

export default config;
