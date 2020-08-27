import { createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';
const electron = require('electron');
const sess = electron.remote.session;
import axios from 'axios';
import Config from '../../lib/Config';

const config = new Config();
const accessToken = config.getAccessToken();

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    authed: true,
    loading: true,
    clientId: null,
    user: {
      id: 0,
      login: '',
      display_name: '',
      type: '',
      broadcaster_type: '',
      description: '',
      profile_image_url: '',
      offline_image_url: '',
      view_count: 0,
      email: '',
    },
  },
  reducers: {
    clientSuccess: (state, action) => {
      state.clientId = action.payload;
    },
    userSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    userFail: (state) => {
      config.setAccessToken(undefined);
      state.authed = false;
    },
    logoutSuccess: (state) => {
      sess.defaultSession.clearCache();
      config.setAccessToken(undefined);
      state.authed = false;
    }
  },
});

export const { clientSuccess, userSuccess, userFail, logoutSuccess } = homeSlice.actions;

export const fetchUser = (): AppThunk => {
  return (dispatch) => {
    axios
      .get('https://id.twitch.tv/oauth2/validate', {
        headers: {
          Authorization: `OAuth ${accessToken}`,
        },
      })
      .then((response) => {
        const client = response.data;
        dispatch(clientSuccess(client.client_id));
        axios
          .get(`https://api.twitch.tv/helix/users?id=${client.user_id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Client-ID': client.client_id,
            },
          })
          .then((response) => {
            const user = response.data.data[0];
            dispatch(userSuccess(user));
          });
      })
      .catch(() => {
        dispatch(userFail());
      });
  };
};

export const logOut = (): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    axios.post(`https://id.twitch.tv/oauth2/revoke?client_id=${state.home.clientId}&token=${accessToken}`).then((_response) => {
      dispatch(logoutSuccess());
    });
  };
}

export default homeSlice.reducer;

export const authed = (state: RootState) => state.home.authed;
export const user = (state: RootState) => state.home.user;
export const loading = (state: RootState) => state.home.loading;
