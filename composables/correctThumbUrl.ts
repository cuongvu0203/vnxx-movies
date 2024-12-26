import { isUrl } from 'check-valid-url'

export default function (path: string) {
    const imgDomain = 'https://kkphim.vip/'
    return isUrl(path) ? path : imgDomain + path
}
