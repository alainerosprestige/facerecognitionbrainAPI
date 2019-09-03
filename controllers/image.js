const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: '3751ea7967c04c7aa27990b15182c505'
   });

   const handleApiCall=(req,res)=>{
        app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data=>{
            console.log(data);
            res.json(data);
        })
        .catch(err=>res.status(400).json('Unable to work with the API'));
   }


const handleImage = (req,res,db)=>{
    const {id} = req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    }).catch(err=> res.status(400).json('Unable to get intries'));
}

module.exports = {
    handleImage,
    handleApiCall
};