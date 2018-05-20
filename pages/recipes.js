import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag'
import withData from '../lib/withData';
import Link from 'next/link';

// Styling.
import styled, { ThemeProvider } from 'styled-components';
import Layout from '../components/MyLayout.js'
import Title from '../components/Title.js';
import theme from './../theme/theme';
import { Button } from 'jobiqo-cl';

export const GET_ALL_RECIPES = gql`
{
    nodeQuery(limit: 100, offset: 0, filter: {conditions: [{operator: EQUAL, field: "type", value: ["recipe"]}]}) {
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

const RecipesListing = () => (
    <Query query={GET_ALL_RECIPES}>
        {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
                <ul>
                    {data.nodeQuery.entities.map(recipe => (
                        <li key={recipe.entityId}>
                            <div>{recipe.entityLabel}</div>
                            <Link as={`/recipe${recipe.entityUrl.path.replace('/drupal-contenta/web/recipe', '')}`} href={`/recipe?slug=${recipe.entityUrl.path.replace('/drupal-contenta/web/recipe/', '')}`}>
                                <a>Read more</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            );
        }}
    </Query>
);

const RecipesList = () => {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Title>All Recipes</Title>
                <Button type='primary'>
                    Custom theme button
                </Button>
                <RecipesListing />
            </Layout>
        </ThemeProvider>
    )
}

export default withData(RecipesList);
