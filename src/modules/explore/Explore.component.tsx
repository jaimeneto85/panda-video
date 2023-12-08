import * as React from "react";
import { VideoItemProps } from "./Explore.type";
import { Video, ResizeMode } from "expo-av";

export const VideoItem = ({ video }: VideoItemProps): JSX.Element => {
  const videoRef = React.useRef(null);
  return <Video />;
};
