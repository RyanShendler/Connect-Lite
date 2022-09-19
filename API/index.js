const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

const typeDefs = gql`
  type User {
    name: String!
    knownSkills: [Skill!]!
      @relationship(type: "HAS_SKILL", properties: "SkillRating", direction: OUT)
  }

  type Skill {
    name: String!
    skillUsers: [User!]!
      @relationship(type: "HAS_SKILL", properties: "SkillRating", direction: IN)
  }

  interface SkillRating {
    rating: Int!
  }
`;

//need to provide URI to database and login credentials
const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "kyle9876")
);

//config selects "connect-lite" DB instead of the default "neo4j" DB
const neoSchema = new Neo4jGraphQL({ 
    typeDefs, 
    driver,
    config: {
        driverConfig: {
            database: "connect-lite"
        }
    }
});

neoSchema.getSchema().then((schema) => {
  const server = new ApolloServer({ schema });

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
});
