import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index : true,
    },
    password: {
      type: String,
      required: [true, 'Password Is Required'],
      unique : true,
    },
    phone: {
      type: String,
      required: true,
    },
    adminType : {
      type : String
    },
    refreshToken: {
      type: String
  }

  },
  { timestamps: true }
);

adminSchema.pre("save", 
  async function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
  }
)
adminSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

adminSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}


adminSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          phone : this.phone,
          name : this.name
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}

export const Admin = mongoose.model("admin", adminSchema)