import mongoose from 'mongoose';
const ParcSchema = mongoose.Schema({
    nombrevoiture : {type: Number, required: true},
    etat : {type: String, required: true},

 
})
export default mongoose.model('Parc', ParcSchema);