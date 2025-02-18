export const extractYoutubeVideoId = (url: string) => {
  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]+)/;
  const match = url.match(regex);

  if (!match) return null;

  const videoId = match[1];
  if (videoId.length !== 11) return null;

  return videoId;
};
