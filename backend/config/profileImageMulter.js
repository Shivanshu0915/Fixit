// Multer to store profile images

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async(req,file)=>{
    return{
      folder: 'profileImages',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      public_id: req.user.id,
      overwrite: true,
      resource_type: 'image',
    };
  },
});


const upload3 = multer({ storage });

module.exports = upload3;
