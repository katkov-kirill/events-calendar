import { ObjectId } from "mongodb";

type CommentGetDto = {
  email: string;
  name: string;
  text: string;
  eventId: string;
  _id: ObjectId;
};

export type { CommentGetDto };
