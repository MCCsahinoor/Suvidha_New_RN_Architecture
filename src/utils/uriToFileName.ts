// export function filename(data: string) {
//     return data.substring(data.lastIndexOf('/') + 1);
// }


// export function getFileExtension(url: string) {
//     return url.substring(url.lastIndexOf('.') + 1);
// };

export function filename(data?: string) {
    if (!data) return '';
    return data.substring(data.lastIndexOf('/') + 1);
}

export function getFileExtension(url?: string) {
    if (!url) return '';
    return url.substring(url.lastIndexOf('.') + 1);
}
