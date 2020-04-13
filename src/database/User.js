import mongoose from 'mongoose'; 

const UserSchema = mongoose.Schema({
    username : String,
    password: {type: String, required: true},
    nom:  {type: String, required: true},
    prenom: {type: String, required: true},
    profession: {type: String, required: true},
    email : {type: String, required: true, unique: true},
    role : { type: String, required: true, default: 'User' },
    agence: [{type: mongoose.Schema.Types.ObjectId, ref: 'Agence'}]
}); 

UserSchema.virtual('agences',{ ref: 'Agence', localField: '_id', foreignField: 'user' })

export default mongoose.model('User', UserSchema);