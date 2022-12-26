import { CommentCreateRequestDto } from "@web/common/types/comment/comment-create-request-dto.type";
import { CommentGetDto } from "@web/common/types/types";
import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "@web/helpers/db-helper";
import { InsertOneResult, MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type PostSuccess = {
  message: string;
  comment: CommentGetDto;
};

type GetSuccess = {
  comments: CommentGetDto[];
};

type Error = {
  errorMsg: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostSuccess | GetSuccess | Error>
) {
  const eventId = req.query.eventId;

  if (!eventId) {
    res.status(400).json({ errorMsg: "Invalid event" });
    return;
  }

  let client: MongoClient;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ errorMsg: "Database connection failed." });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    const emailPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    if (!emailPattern.test(email) || !name || !text) {
      res.status(400).json({ errorMsg: "Invalid input" });
      client.close();
      return;
    }

    const newComment: CommentCreateRequestDto = {
      email,
      name,
      text,
      eventId: eventId as string,
    };

    let result: InsertOneResult<Document>;
    try {
      result = await insertDocument<CommentCreateRequestDto>(
        client,
        "comments",
        newComment
      );

      const response = {
        ...newComment,
        _id: result.insertedId,
      };

      res.status(201).json({
        message: "Comment successfully added",
        comment: response,
      });
    } catch (error) {
      res.status(500).json({ errorMsg: "Data insertion failed." });
    }
  }

  if (req.method === "GET") {
    try {
      const docs = await getAllDocuments<CommentGetDto>(
        client,
        "comments",
        eventId as string
      );

      res.status(200).json({ comments: docs });
    } catch (error) {
      res.status(500).json({ errorMsg: "Document fetching failed." });
    }
  }

  client.close();
}

export default handler;
