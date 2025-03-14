"use server";

export const getYoutubeVideoTitleAction = async (videoId: string) => {
  try {
    const youtubeApiKey = process.env.YOUTUBE_API_KEY;

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${youtubeApiKey}&part=snippet`,
    );
    const data = await res.json();
    const title = data.items[0].snippet.title;

    return title ? (title as string) : null;
  } catch {
    return null;
  }
};
