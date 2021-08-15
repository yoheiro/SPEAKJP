import React from 'react'
import { useState, useRef } from 'react'
import './App.css'
//import Peer from 'skyway-js'
import Peer from "skyway-js";
const peer = new Peer({ key:process.env.REACT_APP_PEER_KEY})

const Chat = () => {
  const [myId, setMyId] = useState('')
  const [callId, setCallId] = gituseState('')
  const localVideo = useRef(null)
  const remoteVideo = useRef(null)


  peer.on('open', () => {
    setMyId(peer.id)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(localStream => {
      localVideo.current.srcObject = localStream
    })
    .catch((error) => {
      console.error("mediaDevice.getUserMedia() error:", error);
      return;
    });
  })

  peer.on('call', mediaConnection => {
    mediaConnection.answer(localVideo.current.srcObject)
    

    mediaConnection.on('stream', async stream => {
      remoteVideo.current.srcObject = stream
    })

  })

  const makeCall = () => {
    const mediaConnection = peer.call(callId, localVideo.current.srcObject)
    mediaConnection.on('stream', async stream => {
      remoteVideo.current.srcObject = stream
      await remoteVideo.current.play().catch(console.error)
    })
  }
  return (
    <div>
      <div>skyway test</div>
      <div><video width="400px" autoPlay muted playsInline ref={localVideo}></video></div>
      <div>{myId}</div>
      <div>
        <input value={callId} onChange={e => setCallId(e.target.value)}></input>
        <button onClick={makeCall}>発信</button>
      </div>
      <div><video width="400px" autoPlay muted playsInline ref={remoteVideo}></video></div>
    </div>
  )
}

export default Chat