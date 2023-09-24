const multer = require('multer');
const path = require("path")
function RemoveLastDirectoryPartOf(the_url)
{
    var the_arr = the_url.split('\\');
    the_arr.pop();
    return( the_arr.join('\\') );
}

const storage = multer.diskStorage({
    destination: function(req,file,cb){ 
      cb(null, './backend/uploads/');
    },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0],
    );
  },
});
module.exports =  multi_upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/jpg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error('Only .jpg .jpeg .png images are supported!');
      err.name = 'ExtensionError';
      return cb(err);
    }
  },
})