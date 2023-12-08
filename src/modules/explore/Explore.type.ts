export interface VideoItemProps {
  uri: string;
  title: string;
  duration: number;
  thumbnail: string;
  id: string;
}
export interface PandaVideo {
  id: string;
  title: string;
  description: string;
  status: string;
  user_id: string;
  folder_id: string;
  library_id: string;
  live_id: string;
  video_external_id: string;
  converted_at: string;
  created_at: string;
  updated_at: string;
  storage_size: number;
  length: number;
  video_player: string;
  video_hls: string;
  width: number;
  height: number;
  playable: boolean;
  backup: boolean;
  preview: string;
  thumbnail: string;
  playback: string[];
}
export interface IPandaVideos {
  page: number;
  limit: number;
  videos: PandaVideo[];
}