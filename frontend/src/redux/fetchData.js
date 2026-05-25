import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import routes from '../routes'

const fetchData = createAsyncThunk(
  'data/fetchData',
  async (authHeader, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.channelsPath, { headers: authHeader })

      console.log('[fetchData] Успешно получили каналы от бэкенда:', response.data) // удалить

      return {
        channels: response.data,
        currentChannelId: response.data[0]?.id || '1',
      }
    }
    catch (error) {
      console.error('[fetchData] Ошибка при запросе к /api/v1/channels:', error)
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

export default fetchData
