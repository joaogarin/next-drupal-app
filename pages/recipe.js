import gql from 'graphql-tag';
import { graphql, Query } from 'react-apollo';
import withData from '../lib/withData';

// Styling.
import styled, { ThemeProvider } from 'styled-components';
import theme from './../theme/theme';
import Layout from '../components/MyLayout.js';
import Title from '../components/Title.js';

export const GET_RECIPE = gql`
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

const RecipeDetail = ({ slug }) => (
    <Query query={GET_RECIPE} variables={{ slug }}>
        {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
                <ThemeProvider theme={theme}>
                    <Layout>
                        <Title>Recipe - {data.route.entity.entityLabel}</Title>
                    </Layout>
                </ThemeProvider>
            );
        }}
    </Query>
);

RecipeDetail.getInitialProps = async function (context) {
    const { slug } = context.query;
    return {
        slug: `/recipe/${slug}`
    }
}

export default withData(RecipeDetail);
