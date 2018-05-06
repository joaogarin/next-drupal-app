import React from 'react';
import Title from '../components/Title.js';
import Layout from '../components/MyLayout.js'
import Link from 'next/link';
import fetch from 'isomorphic-unfetch'
import withData from '../lib/withData';

const Index = (props) => (
  <Layout>
    <Title>Recipes Graphql</Title>
    Click on recipes above to see all recipes.
  </Layout>
)

export default withData(Index);
