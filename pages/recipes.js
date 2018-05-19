import Layout from '../components/MyLayout.js'
import Title from '../components/Title.js';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import withData from '../lib/withData';
import styled, { ThemeProvider } from 'styled-components';
import { Button } from 'jobiqo-cl';

// This page has a custom theme.
const customTheme = {
    primary: '#413fb6',
    secondary: '#d0378c'
};

export const allRecipes = gql`
{
    nodeQuery(limit: 10, offset: 0, filter: {conditions: [{operator: EQUAL, field: "type", value: ["recipe"]}]}) {
      entities {
        entityId
        entityLabel
        entityUrl {
          path
        }
        ... on NodeRecipe {
          fieldCategory {
            targetId
          }
          fieldDifficulty
        }
      }
    }
  }
`;

function RecipesList({
    data: { loading, error, nodeQuery, _allPostsMeta } }) {
    if (error) return <div message='Error loading posts.' />
    if (allRecipes) {
        console.log('Got all recipes');
        return (
            <ThemeProvider theme={customTheme}>
                <Layout>
                    <Title>All Recipes</Title>
                    <Button type='primary'>
                        Custom theme button
                    </Button>
                    <ul>
                        {nodeQuery.entities.map(recipe => (
                            <li key={recipe.entityId}>{recipe.entityLabel}</li>
                        ))}
                    </ul>
                </Layout>
            </ThemeProvider>
        )
    }
    return <div>Loading</div>
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
const IndexRecipes = graphql(allRecipes, {
    options: {
        variables: {}
    },
    props: ({ data }) => ({
        data
    })
})(RecipesList);

export default withData(IndexRecipes);
