import Layout from '../components/MyLayout.js'
import Title from '../components/Title.js';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Todo - use env variables.
const client = new ApolloClient({
    uri: "http://localhost/drupal-contenta/web/graphql"
});

import { Query } from "react-apollo";
import gql from "graphql-tag";

export default () => (
    <ApolloProvider client={client}>
        <Query
            query={gql`
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
    `}
        >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                return (
                    <Layout>
                        <Title>
                            Recipes
                        </Title>
                        <ul>
                            {data.nodeQuery.entities.map(recipe => (
                                <li key={recipe.entityId}>{recipe.entityLabel}</li>
                            ))}
                        </ul>

                    </Layout>
                );
            }}
        </Query>
    </ApolloProvider>
);