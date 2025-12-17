import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as ReduxProvider } from 'react-redux';
import { io } from 'socket.io-client';
import {
  addChannel,
  renameChannel,
  removeChannel,
} from './redux/slices/channelsSlice';
import { addMessage } from './redux/slices/messagesSlice';
import App from './App';
import resources from './locales';
import rollbarConfig from './rollbar';
import store from './redux';
import SocketContext from './Contexts/SocketContext';
import getSocketApi from './socketApi';

const Init = async () => {
  const socket = io({
    transports: ['websocket'],
    auth: {
      token: JSON.parse(localStorage.getItem('userId') || '{}').token,
    },
  });

  const socketApi = getSocketApi(socket);
  const i18n = i18next.createInstance();
  const { dispatch } = store;

  socket.on('newMessage', (payload) => {
    dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    const channel = payload.data || payload;
    dispatch(addChannel(channel));
  });

  socket.on('renameChannel', (payload) => {
    const channel = payload.data || payload;
    dispatch(renameChannel(channel));
  });

  socket.on('removeChannel', (payload) => {
    const { id } = payload.data || payload;
    dispatch(removeChannel({ id }));
  });

  await i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    debug: false,
  });

  return (
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <I18nextProvider i18n={i18n}>
            <ReduxProvider store={store}>
              <SocketContext.Provider value={socketApi}>
                <App />
              </SocketContext.Provider>
            </ReduxProvider>
          </I18nextProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>
  );
};

export default Init;
