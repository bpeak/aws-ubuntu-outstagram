const getClassifiedPosts = (posts, pattern) => {
    const classifiedPostsObj = {}
    // result eg)
    // classifiedPostsObj = {
    //     달 : [post1, post2, post3 ...]
    //     별 : [...]
    // }
    console.log([posts.length, '포스트길이는 ?'])
    for(let i = 0; i < posts.length; i++){
        for(let j = 0; j < posts[i].hashtags.length; j++){
            if(pattern.exec(posts[i].hashtags[j]) === null){
                //해당패턴 미존재
                continue;
            } else {
                //해당패턴 존재
                if(classifiedPostsObj[posts[i].hashtags[j]] === undefined){
                    //분류카테고리 미존재 => 생성후 푸시
                    classifiedPostsObj[posts[i].hashtags[j]] = []
                    classifiedPostsObj[posts[i].hashtags[j]].push(posts[i])
                    break
                } else {
                    //분류카테고리 존재 => 푸시
                    classifiedPostsObj[posts[i].hashtags[j]].push(posts[i])
                    break
                }
            }
        }
    }

    console.log(classifiedPostsObj)

    //classifiedPostsObj key 가나다순 재배열
    const orderedHashtags = Object.keys(classifiedPostsObj).sort()

    const classifiedPosts = []
    // result eg)
    // classifiedPosts = [
    //     [hashtag : '가', posts : [post1, post2, post3 ...],
    //     [hashtag : '나', posts : [post1, post2, post3 ...]
    // ]
    for(let i = 0; i < orderedHashtags.length; i++){
        classifiedPosts.push({
            hashtag : orderedHashtags[i],
            posts : classifiedPostsObj[orderedHashtags[i]]
        })
    }
    return classifiedPosts
}

module.exports = (express, conn, path) => {
    //현재 작업끝 => 다음작업인데
    //두개 비동기형태로 동시에시작해서 둘다 완료되었을때 response 전송하는방법이 있나 연구해보자.
    const search = express.Router()
        search.get('/:val', (req, res) => {
            const searchVal = req.params.val
            const response = {}
            //posts
            conn((err, db) => {
                const pattern = new RegExp("^" + searchVal);
                let query = { hashtags : pattern }
                let cursor = db.collection('posts').find(query)
                cursor.toArray()
                .then(results => {
                    console.log(results.length)
                    const classifiedPosts =  getClassifiedPosts(results, pattern)
                    response.classifiedPosts = classifiedPosts
                    //users
                    conn((err, db) => {
                        query = { nick : pattern }
                        cursor = db.collection('users').find(query)
                        cursor.toArray()
                        //users 가나다순 재배열
                        .then(results => {
                            results.sort((a, b) => {
                                if(a.nick < b.nick){
                                    return -1
                                } else {
                                    return 1
                                }
                            })
                            response.users = results
                            res.json(JSON.stringify(response))
                        })
                    })                    
                })
            })
        })
    return search
}