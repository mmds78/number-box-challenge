
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.856e4cae39d84f23ba79d833eb1bb3db',
  appName: 'number-box-challenge',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "https://856e4cae-39d8-4f23-ba79-d833eb1bb3db.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
};

export default config;
