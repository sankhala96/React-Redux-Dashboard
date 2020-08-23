import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingComponent from './LoadingComponent';
import './Posts.css'

import { getPosts } from '../actions/postActions';

const Card = (props) => {
    const post = props.post;
    return (
        <div key={`${post.title}-${post.userID}`} className='post-item'>
            <h2>{ post.title }</h2>
            <p>{ post.body }</p>
        </div>
    )
}

const Posts = ( props ) => {
    const [ searchKey, updateKey ] = useState('')
    const [ start, updateCount ] = useState(0);
    const [ postsArr, updatePostArr ] = useState(props.posts)

    useEffect(() => {
        updatePostArr(props.posts)
    }, [props.posts])

    useEffect(() => {
        props.getPosts(start);
    }, [])

    const filterPosts = () => {
        const filteredPosts = postsArr.filter((post) => {
            return post.body.includes(searchKey);
        });

        updatePostArr(filteredPosts);
    }

    const onScroll = () => {
        const value = start + 5;
        updateCount(value);

        props.getPosts(value);
    }

    return (
        <div className='posts'>
            <div className='post-search'>
                <input
                    name='search'
                    placeholder='Search any word or phrase'
                    value={searchKey}
                    onChange={(e) => updateKey(e.target.value)}
                />
                <button onClick={filterPosts}>Go</button>
            </div>
            <div className='post-list'>
                <InfiniteScroll
                    dataLength={postsArr.length}
                    next={onScroll}
                    hasMore={true}
                    height={450}
                    loader={<LoadingComponent />}
                >
                {postsArr.map((post, idx) => {
                    return <Card key={`${post}-${idx}`} post={post} />
                })}
                </InfiniteScroll>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      posts: state.post.posts,
      error: state.error
    }
}

export default connect(mapStateToProps, { getPosts })(Posts);
