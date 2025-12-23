import { createSelector } from 'reselect';

const currentChannelIdSelector = ({ channelsSlice }) => channelsSlice.currentChannelId ?? 1;

const channelsSelector = ({ channelsSlice }) => channelsSlice.channels ?? [];

const getCurrentMessages = (state) => {
  const messages = state.messagesSlice.messages ?? [];
  const currentChannelId = state.channelsSlice.currentChannelId ?? 1;
  return messages.filter((message) => message.channelId === currentChannelId);
};

const messagesSelector = createSelector(
  getCurrentMessages,
  (messages) => messages,
);

const currentChannelNameSelector = (state) => {
  const channels = state.channelsSlice.channels ?? [];
  const currentChannelId = state.channelsSlice.currentChannelId ?? 1;
  const channel = channels.find((ch) => ch.id === currentChannelId);
  return channel?.name ?? 'general';
};

const modalIsOpenedSelector = ({ modalSlice }) => modalSlice.isOpened;

const channelsNamesSelector = createSelector(
  channelsSelector,
  (channels) => channels.map(({ name }) => name),
);

const modalTypeSelector = (state) => state.modalSlice.type;

const modalChannelIdSelector = ({ modalSlice }) => modalSlice.data?.channelId;

const channelNameSelector = (state) => {
  const channels = state.channelsSlice.channels ?? [];
  const channelId = state.modalSlice.data?.channelId;
  const channel = channels.find((ch) => ch.id === channelId);
  return channel?.name ?? '';
};

const statusSelector = (state) => state.channelsSlice.status;

export default {
  currentChannelIdSelector,
  channelsSelector,
  messagesSelector,
  currentChannelNameSelector,
  modalIsOpenedSelector,
  channelsNamesSelector,
  modalTypeSelector,
  modalChannelIdSelector,
  channelNameSelector,
  statusSelector,
};
