import crypto from "crypto";
import multer from "multer";

// lets try something. if I import disk storage from multer then do I have to use multer.diskstorage? or I can use diskstorage directly
const FileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    if (file.fieldname == "imageFile") {
      cb(null, "./public/avatar/");
    }
    if (file.fieldname == "gallery") {
      // Added this if condition to handle gallery uploads
      cb(null, "./public/regstorage/");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Math.round(Math.random() * 1e9) + "_";
    // bhaia used Date.now() in this format `${Date.now()}_${file.originalname}` but I used math random to check if it works. I also didn't use backtick rather directly used functions
    cb(null, `${crypto.randomUUID()}${uniqueSuffix}${file.originalname}`);
  },
});

export default FileStorage;
