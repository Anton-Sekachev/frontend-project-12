/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import fetchData from '../fetchData';
import { removeChannel } from './channelsSlice.js';

const initialState = { messages: [] };

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, { payload }) {
      if (!state.messages) {
        state.messages = [];
      }
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.messages = payload.messages || [];
      })
      .addCase(removeChannel, (state, { payload }) => {
        if (!state.messages) {
          state.messages = [];
          return;
        }
        // eslint-disable-next-line max-len
        state.messages = state.messages.filter((message) => String(message.channelId) !== String(payload.id));
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
