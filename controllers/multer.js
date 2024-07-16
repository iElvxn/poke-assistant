const multer = require("multer");

/**
 * DiskStorage for images:
 * Temporarily stores the uploaded files on the server's disk. 
 * The public/uploads directory is the destination where these files are stored temporarily before being processed & moved to Cloudinary.
 */
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/uploads");  
	},
	filename: function (req, file, cb) { 
		cb(null, Date.now() + '-' + file.originalname);
	},
});
const upload = multer({ storage: storage });
module.exports =  upload;