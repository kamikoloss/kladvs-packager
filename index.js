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

// リソースファイルの URL を抽出する
// [ { title: ページ名, main: ページ1行目のURL, sub: ページ2行目のURL }, ... ]
const getUrlList = (pages) => {
  const bracketRegExp = /\[|\]/g
  const titleRegExp = /ch\s|bg\s|img\s|bgm\s|se\s|vi\s|vo\s/g
  const urlRegExp = /files|gyazo/
  const urlList = []

  pages.forEach(page => {
    const hasMain = Boolean(page.description[0])
    const hasSub = Boolean(page.descriptions[1]) && urlRegExp.test(page.descriptions[1])
    if (page.descriptions[0] && titleRegExp.test(page.title)) {
      urlList.push({
        title: page.title.replace(/\s/g, '_'),
        main: hasMain ? page.descriptions[0].replace(bracketRegExp, '') : '',
        sub: hasSub ? page.descriptions[1].replace(bracketRegExp, '') : '',
      })
    }
  })
  console.log(urlList)
  return urlList
}

// メイン処理
createApiInstance()
const pages = await getScrapboxPages()
const urlList = getUrlList(pages)

