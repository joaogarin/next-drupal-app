import fetch from 'isomorphic-unfetch';
import Layout from '../components/MyLayout.js';
import Title from '../components/Title.js';

const RecipeDetail = (props) => (
    <Layout>
        <Title>Name here</Title>
    </Layout>
)

RecipeDetail.getInitialProps = async function (context) {
    const { id } = context.query;
    console.log('Param id for recipe - ' , id);
    return {}
}

export default RecipeDetail;
