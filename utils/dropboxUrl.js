export default function dropboxUrl(url) {
    return url.replace(/&dl=0(?!.*&dl=0)/, "&raw=1").replace("www.dropbox.com", "dl.dropboxusercontent.com")
}