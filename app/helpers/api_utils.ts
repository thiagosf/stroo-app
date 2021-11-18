import axios from 'axios'
import configUtils from './config_utils'

const apiUtils = {
  async createFolder(payload: any, token: string) {
    const url = `${configUtils.apiURL}/folders`
    const { data } = await axios.post(
      url,
      JSON.stringify(payload),
      {
        headers: {
          'Content-type': 'application/json',
          'Authorization': token,
        }
      }
    )
    return data
  }
}

export default apiUtils
