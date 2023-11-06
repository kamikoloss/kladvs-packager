import axios from 'axios'
import dotenv from 'dotenv'

let api = null

// Scrapbox の API インスタンスを作成する
// 事前に .env の内容を設定する必要がある
const createApiInstance = () => {
  dotenv.config()
  api = axios.create({
    baseURL: `https://scrapbox.io/api/pages/${process.env.PROJECT_PATH}`,
    timeout: 10000, // 10s
    headers: { 'Cookie': `connect.sid=${process.env.CONNECT_SID};` },
  })
}

// Scrapbox のページを取得する
const getScrapboxPages = async () => {
  try {
    const response = await api.get('/')
    const pages = response.data?.pages
    console.log(`Succeed to get ${pages.length} pages`)
    return pages
  } catch (error) {
    console.error(error)
  }
}

// メイン処理
createApiInstance()
const pages = await getScrapboxPages()
const urlList = getUrlList(pages)

