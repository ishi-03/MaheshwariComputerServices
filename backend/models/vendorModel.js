import mongoose from "mongoose";

const vendorSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    }
   

},
    { timestamps: true }//it will give us time when user is created or deleted
);


const Vendor = mongoose.model('Vendor', vendorSchema)
export default Vendor;