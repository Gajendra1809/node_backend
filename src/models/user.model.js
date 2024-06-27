import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar:{
        type: String,   //cloudinary url
        required: true
    },
    coverImage:{
        type: String   //cloudinary url
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: video
        }
    ],
    password: {
        type: String,
        reuired: [true, 'Password is required']
    },
    referhToken: {
        type: String
    }
},{ timestamps: true });

//run on save request only, similar to middlware
userSchema.pre("save", function(next){
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password, 10)
        next()
    } else {
        return next()
    }
    
})

//to check password is correct or not
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
            {
                _id: this._id,
                username: this.username,
                email: this.email,
                fullname: this.fullname
            },
            process.env.ACCESS_TOKEN_EXPIRY,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }      
        )
}

userSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_EXPIRY,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }      
    )
}

export const User = mongoose.model("User", userSchema)