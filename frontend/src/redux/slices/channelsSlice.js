/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchData from '../fetchData';

const initialState = {
  status: 'idle',
  channels: [],
  currentChannelId: null,
};

const DEFAULT_CHANNEL_ID = 1;

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel(state, { payload }) {
      if (!state.channels) {
        state.channels = [];
      }
      state.channels.push(payload);
    },
    renameChannel(state, { payload }) {
      const { id, name } = payload;
      const channel = state.channels?.find((c) => c.id === id);
      if (channel) {
        channel.name = name;
      }
    },
    removeChannel(state, { payload }) {
      if (state.channels) {
        state.channels = state.channels.filter((channel) => channel.id !== payload.id);
      }
      if (state.currentChannelId === payload.id) {
        state.currentChannelId = DEFAULT_CHANNEL_ID;
      }
    },
    setActiveChannel(state, action) {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        if (typeof payload === 'string') {
          state.status = 'failed';
          return;
        }

        state.channels = payload.channels || [];
        state.currentChannelId = payload.currentChannelId || DEFAULT_CHANNEL_ID;
        state.status = 'idle';
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {
  addChannel,
  renameChannel,
  removeChannel,
  setActiveChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
