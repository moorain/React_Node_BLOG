import { useEffect, useState } from "react"
import { Button } from 'antd'
// const origin = window.location.origin;
// const origin = 'http://localhost:8001';
let flag = 1;
export default ({ doc }: { doc: string }) => {
  // useEffect(() => {
  //   let origin = window.location.origin;
  //   if (window.location.href.indexOf('localhost') > -1) {
  //     origin = 'http://localhost:8001'
  //   }
  //   try {
  //     const iframe = document.getElementById('myframe');
  //     iframe.contentWindow.postMessage(urlObj?.key, origin);
  //   } catch (err) { }
  // }, [urlObj?.key])

  if (!doc) {
    return <></>
  }

  // let urlss = urlObj?.url
  // if (window.location.href.indexOf('localhost') > -1) {
  //   urlss = `http://localhost:8001${urlObj?.url}`;
  // }

  return (
    <>
      <iframe srcDoc={doc} scrolling="no" height="100%" width='100%' frameBorder={0} />
    </>
  )
}