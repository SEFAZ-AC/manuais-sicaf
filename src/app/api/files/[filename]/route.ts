import { promises as fs } from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename;
  const filePath = path.join("public", filename);
  try {
    const fileContents = await fs.readFile(filePath);
    return new Response(fileContents, {});
  } catch (error) {
    return new Response("Não encontrado", { status: 404 });
  }
}
