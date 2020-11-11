// const User = require('../models/user');


// exports.index = (req, res) => {
//     User.find()
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 success: true,
//                 count: result.length,
//                 message: 'All users',
//                 users: result
//             });
//         })
//         .catch(err => {
//             res.status(500).json({
//                 success: false,
//                 message: err
//             });
//         });
// };

// exports.create = (req, res) => {
//     const user = new User({
//         name: req.body.name,
//         age: req.body.age,
//         location: req.body.location,
//     });

//     user.save()
//         .then(result => {
//             res.status(201).json({
//                 success: true,
//                 message: 'User added',
//                 user: result
//             });
//         })
//         .catch(err => {
//             res.status(500).json({
//                 success: false,
//                 message: err
//             });
//         });
// };

// exports.show = (req, res) => {
//     const id = req.params.id;
//     User.findById(id)
//         .exec()
//         .then(result => {
//             if (result) {
//                 res.status(200).json({
//                     success: true,
//                     message: 'User found',
//                     users: result
//                 });
//             }
//             else {
//                 res.status(404).json({
//                     success: false,
//                     message: 'User not found'
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).json({
//                 success: false,
//                 message: err
//             });
//         });
// };

// exports.update = (req, res) => {
//     const id = req.params.id;
//     const updateProps = {
//         name: req.body.name,
//         age: req.body.age,
//         location: req.body.location,
//     };

//     User.updateOne({ _id: id }, { $set: updateProps })
//         .exec()
//         .then(result => {
//             if (result) {
//                 res.status(201).json({
//                     success: true,
//                     message: 'User updated',
//                     users: result
//                 });
//             }
//             else {
//                 res.status(404).json({
//                     success: false,
//                     message: 'User not found'
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).json({
//                 success: false,
//                 message: err
//             });
//         });
// };

// exports.delete = (req, res) => {
//     const id = req.params.id;
//     User.deleteOne({ _id: id })
//         .exec()
//         .then(result => {
//             if (result) {
//                 res.status(200).json({
//                     success: true,
//                     message: 'User deleted'
//                 });
//             } else {
//                 res.status(404).json({
//                     success: false,
//                     message: 'User not found'
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).json({
//                 success: false,
//                 message: err
//             });
//         });
// };
