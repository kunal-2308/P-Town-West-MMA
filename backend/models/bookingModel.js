import mongoose from "mongoose";

const applicationsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    date: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Ensure the date is in the correct format (YYYY-MM-DD)
                return /^\d{4}-\d{2}-\d{2}$/.test(value);
            },
            message: "Invalid date format. Use YYYY-MM-DD."
        }
    }
});

export default mongoose.model('Application',applicationsSchema);
