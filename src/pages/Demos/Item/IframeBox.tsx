import { useEffect, useState } from "react"

export default ({ urlObj }) => {
  useEffect(() => {
    const iframe = document.getElementById('myframe');
    iframe.contentWindow.postMessage(urlObj?.key, 'http://localhost:8001');
  }, [urlObj?.key])
  return (
    <>
      <iframe scrolling="no" id='myframe' name='editor' height="100%" width='100%' frameBorder={0} src={urlObj?.url} />
    </>
  )
}