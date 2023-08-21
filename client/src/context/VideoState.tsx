import React, { useState, useEffect, useRef, ReactNode } from "react";
import VideoContext, { VideoContextProps } from "./VideoContext";
import { io, Socket } from "socket.io-client";
import Peer from "simple-peer";
import { message } from "antd";

const URL = "https://fathomless-tundra-67025.herokuapp.com/";
// const SERVER_URL = "http://localhost:5000/";

export const socket: Socket = io(URL);

interface VideoStateProps {
  children: ReactNode;
}

const VideoState = ({ children}: VideoStateProps): JSX.Element => {
  return <div>{children}</div>;
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState<MediaStream | undefined>();
  const [chat, setChat] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [call, setCall] = useState<any>({});
  const [me, setMe] = useState("");
  const [userName, setUserName] = useState("");
  const [otherUser, setOtherUser] = useState("");
  const [myVdoStatus, setMyVdoStatus] = useState(true);
  const [userVdoStatus, setUserVdoStatus] = useState<boolean>();
  const [myMicStatus, setMyMicStatus] = useState(true);
  const [userMicStatus, setUserMicStatus] = useState<boolean>();
  const [msgRcv, setMsgRcv] = useState<any>("");
  const [screenShare, setScreenShare] = useState(false);

  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);
  const screenTrackRef = useRef<MediaStreamTrack | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });
    if (localStorage.getItem("name")) {
      setName(localStorage.getItem("name")!);
    }
    socket.on("me", (id: React.SetStateAction<string>) => setMe(id));
    socket.on("endCall", () => {
      window.location.reload();
    });

    socket.on(
      "updateUserMedia",
      ({ type, currentMediaStatus }: { type: string; currentMediaStatus: any }) => {
        if (currentMediaStatus !== null && currentMediaStatus !== 0) {
          switch (type) {
            case "video":
              setUserVdoStatus(currentMediaStatus);
              break;
            case "mic":
              setUserMicStatus(currentMediaStatus);
              break;
            default:
              setUserMicStatus(currentMediaStatus[0]);
              setUserVdoStatus(currentMediaStatus[1]);
              break;
          }
        }
      }
    );

    socket.on(
      "callUser",
      ({ from, name: callerName, signal }: { from: string; name: string; signal: any }) => {
        setCall({ isReceivingCall: true, from, name: callerName, signal });
      }
    );

    socket.on(
      "msgRcv",
      ({ name, msg: value, sender }: { name: string; msg: any; sender: string }) => {
        setMsgRcv({ value, sender });
        setTimeout(() => {
          setMsgRcv({});
        }, 2000);
      }
    );
  }, []);                                

  // useEffect(() => {
  //   console.log(chat);
  // }, [chat]);

  const answerCall = () => {
    setCallAccepted(true);
    setOtherUser(call.from);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data: any) => {
      socket.emit("answerCall", {
        signal: data,
        to: call.from,
        userName: name,
        type: "both",
        myMediaStatus: [myMicStatus, myVdoStatus],
      });
    });

    peer.on("stream", (currentStream: MediaProvider | null) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
    console.log(connectionRef.current);
  };
  const callUser = (id: string) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    setOtherUser(id);
    peer.on("signal", (data: any) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream: any) =>{
        const callUser = (id: string) => {
            const peer = new Peer({ initiator: true, trickle: false, stream });
            setOtherUser(id);
            
            peer.on("signal", (data: any) => {
              socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name,
              });
            });
          
            peer.on("stream", (currentStream: MediaProvider | null) => {
              if (userVideo.current) {
                userVideo.current.srcObject = currentStream;
              }
            });
          
            socket.on("callAccepted", (signal: any) => {
              setCallAccepted(true);
              peer.signal(signal);
            });
          
            connectionRef.current = peer;
          };
    }