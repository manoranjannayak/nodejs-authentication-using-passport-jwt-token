const User = require('../models/user')

exports.save = async (data) => {

    console.log('data', data);

  const user = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password
  })
  return await user.save()
}

exports.findByEmail = async (data) => {
    return await User.findOne({email:data.email})
  }
