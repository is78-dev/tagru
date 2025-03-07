export const extractYoutubeVideoId = (url: string) => {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]+)/;
  const match = url.match(regex);

  // 正規表現に一致しない場合はnull
  if (!match) return null;

  const videoId = match[1];
  // videoIdが11文字でない場合はnull
  if (videoId.length !== 11) return null;

  return videoId;
};
