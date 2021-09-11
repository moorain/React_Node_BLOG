import { useEffect, useState } from "react"

// const origin = window.location.origin;
// const origin = 'http://localhost:8001';

export default ({ urlObj }) => {
  useEffect(() => {
    let origin = window.location.origin;
    if (window.location.href.indexOf('localhost') > -1) {
      origin = 'http://localhost:8001'
    }
    try {
      const iframe = document.getElementById('myframe');
      iframe.contentWindow.postMessage(urlObj?.key, origin);
    } catch (err) { }
  }, [urlObj?.key])

  if (!urlObj?.url) {
    return <></>
  }

  let urlss = urlObj?.url
  if (window.location.href.indexOf('localhost') > -1) {
    urlss = `http://localhost:8001${urlObj?.url}`;
  }
  return (
    <>
      <iframe scrolling="no" id='myframe' name='editor' height="100%" width='100%' frameBorder={0} src={urlss} />
    </>
  )
}