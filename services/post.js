const Post = require('../models/post')

exports.save = async (data) => {

  const post = new Post({
    title: data.title,
    body: data.body,
    createdBy: data.createdBy,
    status: data.status,
    location: data.location
  })
  return await post.save()
}

exports.find = async () => {
  return await Post.find({})
}

exports.update = async (id, data) => {
    return await Post.findByIdAndUpdate(id, data, { new: true })
}

exports.delete = async (id) => {
    return await Post.findByIdAndDelete(id)
}


exports.findByLocation = async (data) => {
  return await Post.findOne({location:data.location}).exec()
}

exports.activeCount = async () => {
  return await Post.find({status: "active"}).exec();
}

exports.inactiveCount = async () => {
  return await Post.find({status: "inactive"}).exec();
}

