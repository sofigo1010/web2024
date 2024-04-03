function Post({ title, content, picture }) {
    const handleOptionsClick = () => {
        console.log('Options for post:', title);
        
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: '#000',
            padding: '16px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            margin: '10px',
            border: "1px solid white",
            position: 'relative',
        }}>
            <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
            }} onClick={handleOptionsClick}>
                &#x22EE;
            </div>
            <p style={{ color: '#fff', textAlign: 'center' }}>{content}</p> 
            {picture && (
                <img 
                    src={picture} 
                    alt="Post" 
                    style={{
                        maxWidth: '25%', 
                        borderRadius: '10px',
                        margin: '10px 0',
                        display: 'block' 
                    }} 
                />
            )}
        </div>
    );
}

function Posts() {
    const [posts, setPosts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:3000/posts');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            
            const sortedPosts = data.sort((a, b) => b.id - a.id);
            setPosts(sortedPosts);
        } catch (error) {
            setError(error.toString());
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchPosts();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    title={post.title}
                    content={post.content}
                    picture={post.picture}
                />
            ))}
        </div>
    );
}
