import axios from 'axios'
import dotenv from 'dotenv'

// Scrapbox のページを取得する
// 事前に .env の内容を設定する必要がある
const getScrapboxPages = async () => {
  try {
    const url = `https://scrapbox.io/api/pages/${process.env.PROJECT_PATH}/`
    const config = { headers: { Cookie: `connect.sid=${process.env.CONNECT_SID};` } }
    const response = await axios.get(url, config)
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}

dotenv.config()
await getScrapboxPages()
