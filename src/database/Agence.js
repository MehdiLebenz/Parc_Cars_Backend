import mongoose from 'mongoose';
const AgenceSchema = mongoose.Schema({
    nom : {type: String, required: true},
    matricule:{type: String, required: true},
    secteur:{type: String, required: true},
    isFtav: { type: String, required: true, default: 'OUI' },
    parc: [{type: mongoose.Schema.Types.ObjectId, ref: 'Parc'}]

 
})
AgenceSchema.virtual('parcs',{ ref: 'Parc', localField: '_id', foreignField: 'agence' })
export default mongoose.model('Agence', AgenceSchema);