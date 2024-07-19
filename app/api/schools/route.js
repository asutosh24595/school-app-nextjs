import { query } from "@/lib/db";
import fs from "node:fs";

export async function GET() {
  try {
    const schools = await query({
      query: "SELECT * FROM schools",
      values: [],
    });
    let data = JSON.stringify(schools);
    return new Response(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching schools:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    let image = formData.get("image");
    const email_id = formData.get("email_id");

    if (!name || !address || !city || !state || !contact || !image || !email_id) {
      return new Response("Missing fields", { status: 400 });
    }

    const contactExists = await query({
      query: "SELECT * FROM schools WHERE contact = ?",
      values: [contact],
    });

    const emailExists = await query({
      query: "SELECT * FROM schools WHERE email_id = ?",
      values: [email_id],
    });

    if (contactExists.length > 0) {
      return new Response("Contact already exists", { status: 400 });
    }

    if (emailExists.length > 0) {
      return new Response("Email already exists", { status: 400 });
    }

    const extension = image.name.split(".").pop();

    const fileName = `${name}.${extension}`;

    const stream = fs.createWriteStream(`public/schoolImages/${fileName}`);

    const bufferedImage = await image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
        throw Error("Saving image failed!");
      }
    });

    image = `/schoolImages/${fileName}`;

    await query({
      query:
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      values: [name, address, city, state, contact, image, email_id],
    });

    return new Response("School added successfully", { status: 201 });
  } catch (error) {
    console.error("Error adding school:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
