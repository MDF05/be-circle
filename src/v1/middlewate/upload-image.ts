import multer from "multer";


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./image/")
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, uniqueSuffix + '-' + file.originalname)
//     }
// })


const storage = multer.memoryStorage()

export const upload = multer({ storage: storage })