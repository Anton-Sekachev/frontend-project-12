import { createSelector } from 'reselect'

const currentChannelIdSelector = (state) => state.channelsSlice?.currentChannelId ?? '1'
const channelsSelector = (state) => state.channelsSlice?.channels ?? []

const messagesSelector = createSelector(
  [
    (state) => state.messagesSlice?.messages ?? [],
    currentChannelIdSelector,
  ],
  (messages, currentChannelId) => {
    const allMessages = messages ?? []
    return allMessages.filter((message) => String(message?.channelId) === String(currentChannelId))
  },
)

const currentChannelNameSelector = createSelector(
  [channelsSelector, currentChannelIdSelector],
  (channels, currentChannelId) => {
    const channel = channels.find((ch) => String(ch?.id) === String(currentChannelId))
    return channel?.name ?? 'general'
  },
)

const modalIsOpenedSelector = (state) => state.modalSlice?.isOpened ?? false
const modalTypeSelector = (state) => state.modalSlice?.type ?? null
const modalChannelIdSelector = (state) => state.modalSlice?.data?.channelId ?? null

const channelsNamesSelector = createSelector(
  channelsSelector,
  (channels) => (channels ? channels.map((ch) => ch?.name ?? '').filter(Boolean) : []),
)

const channelNameSelector = (state) => {
  const channels = state.channelsSlice?.channels ?? []
  const channelId = state.modalSlice?.data?.channelId
  if (!channelId) return ''
  const channel = channels.find((ch) => String(ch?.id) === String(channelId))
  return channel?.name ?? ''
}

const statusSelector = (state) => state.channelsSlice?.status ?? 'idle'

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
}
