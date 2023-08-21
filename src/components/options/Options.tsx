
import React, { useState, useContext, useEffect, useRef } from "react";
import { Input, Button, Tooltip, Modal, message } from "antd";
import Phone from "../../assests/phone.gif";
import Teams from "../../assests/teams.mp3";
import * as classes from "./Options.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VideoContext from "../../context/VideoContext";
import Hang from "../../assests/hang.svg";
import {
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";
import {
  UserOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { socket } from "../../context/VideoState";

const Options: React.FC = () => {
  const [idToCall, setIdToCall] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const Audio = useRef<HTMLAudioElement>(null);
  const call: any,
  const callAccepted: any,
  const myVideo: any,
  const userVideo: any,
  const stream: any,
  const name: any,
  const setName: any,
  const  callEnded: any,
  const me: any,
  const callUser: any,
  const leaveCall: any,
  const answerCall: any,
  const otherUser: any,
  const setOtherUser: any,
  const leaveCall1:any,
  }; = useContext(VideoContext);

  useEffect(() => {
    if (isModalVisible) {
      Audio.current?.play();
    } else {
      Audio.current?.pause();
    }
  }, [isModalVisible]);

  const showModal = (showVal: boolean) => {
    setIsModalVisible(showVal);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    leaveCall1();
    window.location.reload();
  };
  useEffect(() => {
    if (call.isReceivingCall && !callAccepted) {
      setIsModalVisible(true);
      setOtherUser(call.from);
    } else {
      setIsModalVisible(false);
    }
  }, [call.isReceivingCall]);

  return (
    <div className={classes.options}>
      <div style={{ marginBottom: "0.5rem" }}>
        <h2>Account Info</h2>
        <Input
          size="large"
          placeholder="Your name"
          prefix={<UserOutlined />}
          maxLength={15}
          suffix={<small>{name.length}/15</small>}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            localStorage.setItem("name", e.target.value);
          }}
          className={classes.inputgroup}
        />

        <div className={classes.share_options}>
          <CopyToClipboard text={me}>
            <Button
              type="primary"
              icon={<CopyOutlined />}
              className={classes.btn}
              tabIndex={0}
              onClick={() => message.success("Code copied successfully!")}
            >
              Copy code
            </Button>
          </CopyToClipboard>

          <div className={classes.share_social}>
            <WhatsappShareButton
              url={`https://video-chat-mihir.vercel.app/`}
              title={`Join this meeting with the given code "${me}"\n`}
              separator="Link: "
              className={classes.share_icon}
            >
              <WhatsappIcon size={26} round />
            </WhatsappShareButton>
            <FacebookShareButton
              url={`https://video-chat-mihir.vercel.app/`}
              quote={`Join this meeting with the given code "${me}"\n`}
              className={classes.share_icon}
            >
              <FacebookIcon size={26} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://video-chat-mihir.vercel.app/`}
              title={`Join this meeting with the given code "${me}"\n`}
              className={classes.share_icon}
            >
              <TwitterIcon size={26} round className={classes.share_border} />
            </TwitterShareButton>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <h2>Make a call</h2>

        <Input
          placeholder="Enter code to call"
          size="large"
          className={classes.inputgroup}
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
          style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Enter code of the other user">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />

        {callAccepted && !callEnded ? (
          <Button
            type="primary"
            danger
            icon={<PhoneOutlined />}
            onClick={leaveCall}
            className={classes.btn}
          >
            Hang Up
          </Button>
        ) : (
          <Button
            type="primary"
            icon={<PhoneOutlined />}
            size="large"
            onClick={() => callUser(idToCall)}
            className={classes.btn}
          >
            Call
          </Button>
        )}
      </div>

      {call.isReceivingCall && !callAccepted && (
        <Modal
          title="Incoming Call"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="hangup" type="primary" danger onClick={handleCancel}>
              Hang Up
            </Button>,
            <Button
              key="answer"
              type="primary"
              icon={<PhoneOutlined />}
              onClick={answerCall}
            >
              Answer
            </Button>,
          ]}
        >
          <h1>{otherUser} is calling you</h1>
        </Modal>
      )}
    </div>
  );


export default Options;
