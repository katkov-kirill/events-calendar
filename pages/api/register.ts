import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { connectDatabase, insertDocument } from "@web/helpers/db-helper";

type Data = {
  email: string;
};

type Error = {
  errorMsg: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    const emailPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    if (!emailPattern.test(userEmail)) {
      res.status(400).json({ errorMsg: "Invalid email." });
      return;
    }

    let client: MongoClient;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ errorMsg: "Database connection failed." });
      return;
    }

    try {
      await insertDocument<Data>(client, "emails", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ errorMsg: "Data insertion failed." });
      return;
    }

    res.status(201).json({ email: req.body.email });
  }
}

export default handler;
