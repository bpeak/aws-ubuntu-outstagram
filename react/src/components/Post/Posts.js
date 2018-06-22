import React, { Component, Fragment } from 'react';

//components 
import Post from './Post.js'
import LoadingSpinner from '~components/LoadingSpinner/LoadingSpinner.js'
import FollowingRecommend from '~components/FollowingRecommend/FollowingRecommend.js'

//scss
import './Posts.scss'

//modules
import scrollController from '../../modules/scrollController.js'

class Posts extends Component{
    constructor(){
        super()
        this.state = {
            posts : [],
            isFetching : true
        }
    }

	_shouldPostsUpdate = () => {
		const currentScrollPercentage =  scrollController.getPercentage()
		if(currentScrollPercentage > 95){
			if(this.state.isFetching === true){
				//스크롤발생 && 현재펫치중O => done
				return false
			} else {
				//'스크롤발생 && 현재펫치중X => update
				return true
			}
        }
    }    
    
    _fetchPostsStart = () => {
        return new Promise((resolve, reject) => {
            this.setState({
                ...this.state,
                isFetching : true
            }, () => {
                resolve()
            })
        })
    }

    _fetchPosts = () => {
        return new Promise((resolve, reject) => {
            const postsCurrentIdList = this.state.posts.map((post) => post._id)
            const request = {
                postsCurrentIdList
            }
            fetch('api/posts/main', {
                method : "POST",
                headers : {
                    'content-type' : 'application/json'
                },
                credentials: "same-origin",
                body : JSON.stringify(request)
            })
            .then(data => data.json())
            .then(json => JSON.parse(json))
            .then(response => resolve(response))
        })
    }

    _fetchPostsFinish = () => {
        this.setState({
            ...this.state,
            isFetching : false
        })
    }

    _setPosts = (posts) => {
        return new Promise((resolve, reject) => {
            this.setState({
                posts : [...this.state.posts, ...posts]
            }, () => {resolve()})
        })
    }

    _handleOnScroll = () => {
        const { 
            _shouldPostsUpdate,
            _fetchPostsStart,
            _fetchPosts,
            _fetchPostsFinish,
            _setPosts,
            _handleOnScroll
        } = this
        if(_shouldPostsUpdate() === true){
            _fetchPostsStart()
            .then(() => {
                return _fetchPosts()         
            })
            .then(response => {
                if(response.posts.length === 0){
                    //남은포스트 존재X
                    window.removeEventListener('scroll', _handleOnScroll)
                    _fetchPostsFinish()
                } else {
                    //남은포스트 존재O
                    _setPosts(response.posts)                   
                    .then(() => {
                        _fetchPostsFinish()
                    })
                }
            })           
        }        
    }

    componentDidMount(){
        const {
            _handleOnScroll,
            _fetchPostsStart,
            _fetchPosts,
            _fetchPostsFinish,
            _setPosts
        } = this 
        window.addEventListener('scroll', _handleOnScroll)
        _fetchPostsStart()
        .then(() => {
            return _fetchPosts()
        })
        .then(response => {
            return _setPosts(response.posts)
        })
        .then(() => {
            _fetchPostsFinish()
        })
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this._handleOnScroll)
    }

    render(){
        return (
            <div>
                {this.state.posts.map((post, index) => {
                        return (
                            <Fragment key={index}>
                                <Post
                                    _id={post._id}
                                    nick={post.nick}
                                    profilePhotoUrl={post.profilePhotoUrl}
                                    contents={post.contents}
                                    likes={post.likes}
                                    comments={post.comments}
                                />
                                {this.state.posts.length === 0 || index === 0 && <div className="followingRecommend-container"><FollowingRecommend/></div>}
                           </Fragment>
                        )
                    })
                }
                {this.state.isFetching === true && 
                    <div className="posts-loadingSpinner-container">
                        <LoadingSpinner/>
                    </div>
                }
            </div>
        )
    }
}

export default Posts