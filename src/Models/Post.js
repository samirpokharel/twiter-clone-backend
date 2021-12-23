import { model, Schema } from "mongoose";

const PostSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: { type: String, maxlength: 289, trim: true },
    tags: [String],
    pinned: Boolean,
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    replyTo: { type: Schema.Types.ObjectId, ref: "Post" },
    retweets: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    retweet: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true }
);

PostSchema.pre("save", function (next) {
  if (this.text) {
    this.tags = this.text.split(" ").filter((item) => item.startsWith("#"));
  }
  next();
});

export default model("Post", PostSchema);
