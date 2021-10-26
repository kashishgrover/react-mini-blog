import {useState, useEffect } from 'react';
import BlogList from './BlogList';

const Home = () => {

    const [blogs, setBlogs] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch('http://localhost:8000/blogs')
            .then( res => {
                if(!res.ok) {
                    throw Error('could notfetch data for that resource');
                }
                return res.json();
            })
            .then((data) => { 
                setBlogs(data);
                setIsLoading(false);
                setError(null);
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error.message);
            })
    }, [])

    return (
        <div className="home">
            { error && <div>{ error }</div>}
            { isLoading && <div>Loading...</div> }
            {blogs && <BlogList blogs={blogs} title="All Blogs" /> }
        </div>
    );
}
 
export default Home;