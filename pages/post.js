import fetch from 'isomorphic-unfetch';
import Layout from '../components/MyLayout.js';
import Title from '../components/Title.js';

const Post = (props) => (
    <Layout>
        <Title>{props.show.name}</Title>
        <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
        <img src={props.show.image.medium} />
    </Layout>
)

Post.getInitialProps = async function (context) {
    const { id } = context.query
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
    const show = await res.json()

    console.log(`Fetched show: ${show.name}`)

    return { show }
}

export default Post;
