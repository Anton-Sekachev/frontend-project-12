/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchData from '../fetchData';

const initialState = {
  status: 'idle',
  channels: [],
  currentChannelId: null,
};

const DEFAULT_CHANNEL_ID = '1';
const RANDOM_CHANNEL_ID = '2';

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
        const incomingChannels = payload.channels ?? [];

        // eslint-disable-next-line max-len
        const hasGeneral = incomingChannels.some((channel) => String(channel.id) === DEFAULT_CHANNEL_ID);
        // eslint-disable-next-line max-len
        const hasRandom = incomingChannels.some((channel) => String(channel.id) === RANDOM_CHANNEL_ID);

        const defaultChannelsToFill = [];

        if (!hasGeneral) {
          defaultChannelsToFill.push({ id: DEFAULT_CHANNEL_ID, name: 'general', removable: false });
        }
        if (!hasRandom) {
          defaultChannelsToFill.push({ id: RANDOM_CHANNEL_ID, name: 'random', removable: false });
        }

        state.channels = [...defaultChannelsToFill, ...incomingChannels];

        state.currentChannelId = payload.currentChannelId ?? DEFAULT_CHANNEL_ID;
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
