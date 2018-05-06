import Layout from '../components/MyLayout.js'
import Title from '../components/Title.js';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import withData from '../lib/withData';

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
            <Layout>
                <Title>All Recipes</Title>
                <ul>
                    {nodeQuery.entities.map(recipe => (
                        <li key={recipe.entityId}>{recipe.entityLabel}</li>
                    ))}
                </ul>
            </Layout>
        )
    }
    return <div>Loading</div>
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
const IndexAbout = graphql(allRecipes, {
    options: {
        variables: {}
    },
    props: ({ data }) => ({
        data
    })
})(RecipesList);

export default withData(IndexAbout);
