import React from 'react';
import Title from '../components/Title.js';
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Todo - use env variables.
const client = new ApolloClient({
  uri: "http://localhost/drupal-contenta/graphql"
});

const Index = (props) => (
  <ApolloProvider client={client}>
    <Layout>
      <Title>Batman TV Shows</Title>
      <ul>
        {props.shows.map(({ show }) => (
          <li key={show.id}>
            <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  </ApolloProvider>
)

Index.getInitialProps = async function () {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

export default Index