import Document, { Head, Main, NextScript } from 'next/document'

export default class extends Document {
  render() {
    return (
      <html >
        <Head>
          <meta name="format-detection" content="telephone=no, email=no" />
          <meta name="viewport" content="width=device-width,height=device-height, user-scalable=no,initial-scale=1, minimum-scale=1, maximum-scale=1,target-densitydpi=device-dpi" />
          <link href="https://cdn.bootcss.com/antd-mobile/2.1.1/antd-mobile.css" rel="stylesheet" />
          <link href="../static/main.css" rel="stylesheet" />
        </Head>
        <body >
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
