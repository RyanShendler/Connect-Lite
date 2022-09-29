import { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer, gql } from "apollo-server";
import neo4j from "neo4j-driver";

//prettier-ignore
const typeDefs = gql`
  type User {
    userID: String! @unique
    name: String!
    knownSkills: [Skill!]!
      @relationship(type: "HAS_SKILL", properties: "SkillRating", direction: OUT)
  }

  type Skill {
    skillID: ID! @id
    name: String!
    description: String!
    skillUsers: [User!]!
      @relationship(type: "HAS_SKILL", properties: "SkillRating", direction: IN)
  }

  interface SkillRating {
    rating: Int!
  }

  type Mutation {
    mergeUser(userID: String!, name: String!): User
    @cypher(
      statement: """
      MERGE (u:User {userID:$userID})
      ON CREATE SET u.name = $name, u.userID=$userID
      ON MATCH SET u.name = $name
      RETURN u
      """
    )
    mergeSkill(name: String!, description: String!): Skill
    @cypher(
      statement: """
      MERGE (s:Skill {name:$name})
      ON CREATE SET s.description=$description, s.name=$name
      ON MATCH SET s.description=$description, s.name=$name
      RETURN s
      """
    )
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
      database: "connect-lite",
    },
  },
});

await neoSchema.getSchema();

//checks if unique constraints exist and creates them if necessary
await neoSchema.assertIndexesAndConstraints({ options: { create: true } });

neoSchema.getSchema().then((schema) => {
  const server = new ApolloServer({ schema });

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
});
