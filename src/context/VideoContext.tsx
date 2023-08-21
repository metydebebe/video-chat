import React, { createContext, Context } from "react";

interface VideoContextProps {
  // Define your context properties here
}

const VideoContext: Context<VideoContextProps> =
  createContext<VideoContextProps>({} as VideoContextProps);

export default VideoContext;
