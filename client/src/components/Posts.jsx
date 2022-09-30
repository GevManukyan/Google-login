import { useEffect, useState } from "react";
import { GoogleLogout } from "react-google-login";
const Posts = ({ loggedIn, clientId, setLoginStatus }) => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
   
    const logout = () => {
        console.log("logout");
        setLoginStatus(false);
    };
    useEffect(() => {
        if (loggedIn) {
            fetch("https://dummyjson.com/posts").then(res => res.json()).then(e => setPosts(e.posts));
        }
        
    }, [loggedIn]);

    const getBlogComments = (id) => {

        if (id ) {
            fetch(`https://dummyjson.com/posts/${id}/comments`).then(res => res.json()).then(res => setComments(res.comments))
        };
    };

    return (
        <div className="bigDiv">
            {
                posts.map((post, index) => {
                    return (
                        <ul key={post + index}>
                            <ul className={"postUl"} onClick={() => {
                                getBlogComments(post.id)
                            }}>{post.title}</ul>
                            
                            {
                                comments.length ? comments.map((comment) => {
                                    return +post.id === +comment.postId? (
                                        <ol className="postOl"  key={comment.id}>
                                            <li>{comment.body}</li>
                                        </ol>
                                    ) : null
                                }) : null
                            }
                        </ul>
                    )
                })
            }
            <GoogleLogout 
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={logout}
                className = "logOut"
            />
        </div>
    )
};


export default Posts;