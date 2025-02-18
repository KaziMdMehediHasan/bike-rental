import multer from 'multer';

// // const storage = multer.memoryStorage()  // store image in memory
// export const upload = multer({ dest: "./upload" })

// storage configuration for multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./uploads");
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null, file.fieldname + "-" + uniqueSuffix);
//     },
// });
// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });
