let mongoose = require('mongoose');
// BDD connection
const options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
        useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://admin2:admin2@cluster0.zfafw.mongodb.net/mymovizapp?retryWrites=true&w=majority',
    options,    
    function(err) {
     console.log(err);
    }
   );
module.exports = mongoose;