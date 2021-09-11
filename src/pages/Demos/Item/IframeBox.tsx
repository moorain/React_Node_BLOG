import { useEffect, useState } from "react"

const origin = window.location.origin;
// const origin = 'http://localhost:8001';

export default ({ urlObj }) => {
  useEffect(() => {
    try {
      const iframe = document.getElementById('myframe');
      iframe.contentWindow.postMessage(urlObj?.key, origin);
    } catch (err) { }
  }, [urlObj?.key])

  if (!urlObj?.url) {
    return <></>
  }
  // const urlss = `http://localhost:8001${urlObj?.url}`;
  const urlss = urlObj?.url

  return (
    <>
      <iframe scrolling="no" id='myframe' name='editor' height="100%" width='100%' frameBorder={0} src={urlss} />
    </>
  )
}