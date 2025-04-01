var Livro = require('../models/livro');

module.exports.list = () => {
    return Livro.find().
    sort({title:1}).
    exec();
}

module.exports.getLivros = () => {
    return Livro.find().exec()
}

module.exports.getLivroById = id => {
    return Livro.findById(id).exec()
    //return Contrato.findOne({_id : id}).exec()
}

module.exports.getLivrosByGenre = genre => {
    return Livro.find({genres : genre}).exec()
}

module.exports.getLivrosByCharacter = characterName => {
    return Livro.find({ characters: { $regex: characterName, $options: "i" } })
                .sort({ title: 1 })
                .exec();
};

module.exports.getLivrosByAuthor = aut => {
    return Livro.find({author : aut}).exec()
};

module.exports.getGenres = () => {
    return Livro.aggregate([
        { $unwind: "$genres" },  
        { $group: { _id: "$genres" } },  
        { $sort: { _id: 1 } }  
    ]).exec();
};

module.exports.getCharacters = () => {
    return Livro.aggregate([
        { $unwind: "$characters" },  
        { $group: { _id: "$characters" } },  
        { $sort: { _id: 1 } }  
    ]).exec();
};

module.exports.insert = livr => {
    var livrToSave = new Livro(livr)
    return livrToSave.save()
}

module.exports.update = (livr, id) => {
    return Livro.findByIdAndUpdate(id, livr, {new : true}).exec()
}

module.exports.delete = id => {
    return Livro.findByIdAndDelete(id, {new : true}).exec()
}