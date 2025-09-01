import mongoose, { Schema } from "mongoose";
import {mongooseAggregatePaginate} from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    videoFile: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  
},
  { timestamps: true }
);

// Add pagination plugin to the schema
videoSchema.plugin(mongooseAggregatePaginate);


const Video = mongoose.model("Video", videoSchema);

export default Video;
