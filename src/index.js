import  {ApolloServer}  from 'apollo-server';
import gql from 'graphql-tag';
import typeDefs from './graphql/TypeDefs'; 
import User from './database/User';
import Agence from './database/Agence';
import mongoose from 'mongoose';
import generateToken from './utils/generateToken'; 
import verifyToken from './utils/verifyToken';
import Parc from './database/Parc';

const resolvers = {
  Query: {
    users: async (_, $, { models }) => {
      const user = await models.User.find().populate('agence');
      console.log('User', user)
      return user;
    },
    agences: async(_, $, {models}) => {
      const agence = await models.Agence.find().populate('parc');
      return agence;
    }
  },
  Mutation: {
    

    addUser: async (_, {input}, {models}) => {
      const agence = new models.Agence({
        nom: input.agence.nom,
        matricule: input.agence.matricule,
        secteur: input.agence.secteur
      });
      const agenceresolve = await agence.save();
      const user = new models.User({
        username : input.username, 
        password: input.password,
        nom: input.nom,
        prenom: input.prenom,
        profession: input.profession,
        email: input.email,
        agence : [
          agenceresolve._id
        ] 
      });

      await user.save();

      const token = generateToken(user.id, user.email);
      return {
        token,
        email:user.email,
        username: user.username,
        password: user.password,
        nom: user.nom,
        prenom: user.prenom,
        profession:user.profession,
        agence: [agenceresolve]
      }
    
    }, 
    addAgence: async (_, {input}, {models, userId}) => {
      console.log('input',input)
      const parc = new models.Parc ({
        nombrevoiture: input.parc.nombrevoiture,
        etat: input.parc.etat
      });

      const parcResolve = await parc.save();
      const agence = new models.Agence({
        nom: input.nom,
        matricule: input.matricule,
        secteur: input.secteur,
        user : userId,
        parc : [
          parcResolve._id
        ]
      });
       await agence.save();
      return {
        nom: input.nom, 
        matricule: input.matricule,
        secteur:input.secteur,
        parc:[parcResolve]
      }

    },
    addParc : async (_, {input}, {models}) => {
      const parc = new models.Parc({
        nombrevoiture: input.nombrevoiture,
        etat: input.etat
      });
      await parc.save();
      return {
        nombrevoiture: input.nombrevoiture,
        etat: input.etat
      }
    }
  },
  
 
};
// The ApolloServer constructor requires two parameters: your schema
//  definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, 
  context: async ({req}) => {
    const id = await verifyToken(req.headers.authorization);
  return {
    userId: id,
    ageneceId: id,
    models: {
      User,
      Agence,
      Parc
    }
  }
} });
mongoose.connect('mongodb://localhost:27017/Parc', {useNewUrlParser: true})
.then(()=> {
  console.log('connected to mongodb');
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})

// The `listen` method launches a web server.