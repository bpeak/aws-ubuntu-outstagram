const extract = (text) => {
    const hashtags = []
    text.replace(/#[^#\s,;]+/gm, (val) => {
        hashtags.push(val);
    });
    return hashtags
}
   
const getTextExceptSharp = (hashtags) => {
    const pattern = /#/
    const hashtagsExceptSharp = hashtags.map((hashtag) => {
        return hashtag.replace(pattern, '')
    })
    return hashtagsExceptSharp
}

const hashtagController = {
    extract,
    getTextExceptSharp
}

export default hashtagController

