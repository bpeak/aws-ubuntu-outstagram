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

const discriminator = (text) => {
    const pattern = /#[^#\s,;]+/gm
    const result = /#[^#\s,;]+/gm.exec(text)
    if(result === null){
        return false
    } else {
        return true
    }
}

const hashtagController = {
    extract,
    getTextExceptSharp,
    discriminator
}

export default hashtagController

