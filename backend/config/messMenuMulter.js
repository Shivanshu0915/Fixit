const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const { college, hostel } = req.query;
    return {
      folder: 'fixit-mess-menus',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
      public_id: `${college}_${hostel}_messmenu`,
      overwrite: true,                            //ensures Cloudinary replaces the existing one
      resource_type: 'image',
    };
  },
});

const upload2 = multer({ storage });

module.exports = upload2;
