require('../models/User');
const Q = require('q');
var mongoose = require('mongoose');
var User = mongoose.model('user');
var ObjectId = require('mongoose').Types.ObjectId; 

module.exports = {
    create: function (user) {
        var deferred = Q.defer()
        user.save(function (err, data) {
            if (err) {
                console.error(err.stack)
                deferred.reject(err)
            }
            deferred.resolve(data)
        })
        return deferred.promise;
    },
    delete: function (id) {
        console.log('delete user with id => ' + id)
        var deferred = Q.defer() 
        User.remove({
            _id: id
        }, function (err, data) {
            if (err) {
                console.error(err.stack)
                deferred.reject(err)
            }
            deferred.resolve(data)
        })
        return deferred.promise;
    },
    read: function () {
        var deferred = Q.defer()
        User.find().sort([['createDate', 'descending']]).exec(function (err, users) {
            if (err) {
                console.error(err.stack)
                deferred.reject(err)
            } else {
                deferred.resolve(users)
            }
        })
        return deferred.promise;
    },
    readById: function (id) {
        var deferred = Q.defer()
        console.log("moogoose find by Id = > "+id)
        var identity=new ObjectId(id)
        User.findById(identity).exec(function (err, user) {
            if (err) {
                console.error(err.stack)
                deferred.reject(err)
            } else {
                deferred.resolve(user)
            }
        })
        return deferred.promise;
    },
    readByUsername: function (username) {
        var deferred = Q.defer()
        var field={
            username:username
        }
        User.find(field).exec(function (err, user) {
            if (err) {
                console.error(err.stack)
                deferred.reject(err)
            } else {
                deferred.resolve(user)
            }
        })
        return deferred.promise;
    },
    update: function (updateUserId, updateUser) {
        var deferred = Q.defer()
        User.findByIdAndUpdate(updateUserId, {
            $set: updateUser
        }, function (err, data) {
            if (err) {
                console.error(err.stack)
                deferred.reject(err)
            } else {
                deferred.resolve(data)
            }
        })
        return deferred.promise;
    }
}