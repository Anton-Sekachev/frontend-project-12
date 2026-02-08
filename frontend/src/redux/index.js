import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from './slices/channelsSlice';
import messagesReducer from './slices/messagesSlice';
import modalReducer from './slices/modalSlice';

const store = configureStore({
  reducer: {
    channelsSlice: channelsReducer,
    messagesSlice: messagesReducer,
    modalSlice: modalReducer,
  },
});

export default store;
