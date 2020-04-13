import gql from 'graphql-tag';
const typeDefs = gql`
  type User {
    id: ID
    username: String
    password: String!
    nom: String!
    prenom: String!
    profession: String!
    email:String!
    role:userRole
    agence:[Agence]

  }
  type Agence {
    id: ID
    nom: String
    matricule:String
    secteur: String
    isFtav:agenceEtat
    parc: [Parc]
  }
  type Parc {
      id: ID
      nombrevoiture: String
      etat: String
  }
  input ParcInput {
      id: ID
      nombrevoiture: String
      etat: String
  }
  input UserInput {
    id: ID
    username: String
    password: String!
    nom: String!
    prenom: String!
    profession: String!
    email:String!
    role:String
    agence: AgenceInput
  }
  input AgenceInput {
    id: ID
    nom: String!
    matricule:String!
    secteur: String!
    isFtav:String!
    parc: ParcInput
  }
  enum userRole {
    ADMIN
    USER
}
enum agenceEtat {
    OUI
    NON
}

  type Query {
    users : [User]
    agences: [Agence]
  }
  type Mutation {
    addUser(input: UserInput): User
    addAgence(input: AgenceInput): Agence
    addParc(input: ParcInput) : Parc
  }
`;
export default typeDefs;