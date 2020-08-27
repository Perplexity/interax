import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
const electron = require('electron');
import { BrowserWindow, ipcRenderer } from 'electron';
const BW = electron.remote.BrowserWindow;
import Config from '../../lib/Config';

const config = new Config();

let authWindow: BrowserWindow | null = null;

const loginSlice = createSlice({
  name: 'login',
  initialState: { loading: false },
  reducers: {
    enableLoading: (state) => {
      state.loading = true;
      const scopes = ['user:read:email', 'moderation:read'];
      const clientID = 'wq852hkxpa4tpfu1anqr5h5gvtncwa';
      const scope = scopes.join('+');
      const url = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientID}&redirect_uri=http://localhost/callback&scope=${scope}`;
      authWindow = new BW({
        show: false,
        width: 1024,
        height: 728,
        webPreferences: {
          nodeIntegration: true,
        },
      });
      authWindow.loadURL(url);
      authWindow.webContents.on('did-start-navigation', (_event, url) => {
        processCallbackUrl(url);
      });
      authWindow.webContents.on('will-redirect', (_event, url) => {
        processCallbackUrl(url);
      });
      authWindow.webContents.on('did-finish-load', () => {
        authWindow?.show();
        authWindow?.focus();
      });
      authWindow.on('closed', () => {
        authWindow?.destroy();
        ipcRenderer.send('auth');
      });
    },
  },
});

function processCallbackUrl(url: string) {
  var token = /#access_token=(\w+)/.exec(url) || null;
  if (token) {
    config.setAccessToken(token[1]);
    authWindow?.close();
  }
}

export const { enableLoading } = loginSlice.actions;

export default loginSlice.reducer;

export const isLoading = (state: RootState) => state.login.loading;
