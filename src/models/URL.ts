import mongoose, {Document, Schema} from 'mongoose';



export interface IUrl extends Document {
    originalUrl: string;
    shortUrl: string;
    clicks: number;
    createdAt:Date;
    updatedAt:Date;

}

const urlSchema: Schema = new Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true , unique: true , index:true},

    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

}, { timestamps: true });

urlSchema.index({ createdAt: -1});

// urlSchema.index({ shortUrl: 1});



export const URL = mongoose.model<IUrl>('Url', urlSchema);


;