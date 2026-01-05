export const convertSecondsToMinutesAndSeconds = (totalSeconds: any) => {
    // const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Pad minutes and seconds with a leading zero if necessary
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = seconds.toString().padStart(2, '0');

    // return `${minutes}:${paddedSeconds}`;
    return ({ minutes: paddedMinutes, seconds: paddedSeconds })
}