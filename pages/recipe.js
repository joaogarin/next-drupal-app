import fetch from 'isomorphic-unfetch';
import Layout from '../components/MyLayout.js';
import Title from '../components/Title.js';
import withData from '../lib/withData';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styled, { ThemeProvider } from 'styled-components';
import theme from './../theme/theme';

export const recipeQuery = gql`
query findRecipes($slug: String!) {
    route(path:$slug) {
      ... on EntityCanonicalUrl {
        entity {
          entityLabel
        }
      }
    }
  }
  
`;

function RecipeDetail({
    data: { loading, error, route, _allPostsMeta }, props }) {
    if (error) return <div message='Error loading recipe.' />
    if (recipeQuery) {
        return (
            <ThemeProvider theme={theme}>
                <Layout>
                    <Title>Recipe - {route.entity.entityLabel}</Title>
                </Layout>
            </ThemeProvider>
        )
    }
    return <div>Loading</div>
}

const IndexRecipe = graphql(recipeQuery, {
    options: (props) => (console.log(props), {
        variables: {
            slug: props.slug
        }
    }),
    props: ({ data }) => ({
        data
    })
})(RecipeDetail);

IndexRecipe.getInitialProps = async function (context) {
    const { slug } = context.query;
    console.log('Param id for recipe - ', slug);
    return {
        slug: `/recipe/${slug}`
    }
}

export default withData(IndexRecipe);
