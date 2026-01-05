import { YTRRegEx } from "./regexList";

export function YTVideoToThumbnail(url: string) {
    const match = url.match(YTRRegEx);
    const videoKey = match ? match[1] : null
    const FinalThumUrl = 'https://i.ytimg.com/vi/' + videoKey + '/hqdefault.jpg'
    return FinalThumUrl;
}


export function YTVideoId(url: string) {
    const match = url.match(YTRRegEx);
    return match ? match[1] : null;
}

