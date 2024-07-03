"use server";

import * as fs from "fs";
import * as crypto from "crypto";
import fetch from "node-fetch";
import { getBasePath } from "@/utils/getBasePath";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  const fileName = file.name;
  const mimeType = file.type;
  const validMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
    "audio/mpeg",
    "audio/ogg",
    "audio/wav",
    "video/mp3",
    "video/mp4",
    "video/ogg",
    "video/webm",
    "video/avi",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ];
  const fileExtension = fileName.split(".").pop();
  if (!validMimeTypes.includes(mimeType)) {
    return {
      success: false,
      message: "Tipo de arquivo inválido.",
    };
  }
  const data = await file.arrayBuffer();
  const hash = crypto
    .createHash("md5")
    .update(fileName + Date.now().toString())
    .digest("hex");
  const newFileName = `${hash}.${fileExtension}`;
  const dirPath = "./public";
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const filePath = `${dirPath}/${newFileName}`;
  await fs.promises.writeFile(filePath, Buffer.from(data));
  return {
    success: true,
    file: {
      title: fileName,
      url: `${dirPath.replace(
        "./public",
        `${getBasePath()}/api/files`
      )}/${newFileName}`,
      pureUrl: `${dirPath.replace("./public", "/api/files")}/${newFileName}`,
      size: file.size,
      name: fileName,
      extension: fileExtension,
    },
  };
}

export async function uploadImageByFile(formData: FormData) {
  const file = formData.get("file") as File;
  const fileName = file.name;
  const mimeType = file.type;
  const validMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
  ];
  const fileExtension = fileName.split(".").pop();
  if (!validMimeTypes.includes(mimeType)) {
    return {
      success: false,
      message: "Tipo inválido. Apenas imagens são aceitas.",
    };
  }
  const data = await file.arrayBuffer();
  const hash = crypto
    .createHash("md5")
    .update(fileName + Date.now().toString())
    .digest("hex");
  const newFileName = `${hash}.${fileExtension}`;
  const dirPath = "./public";
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const filePath = `${dirPath}/${newFileName}`;
  await fs.promises.writeFile(filePath, Buffer.from(data));
  return {
    success: true,
    file: {
      url: `${dirPath.replace(
        "./public",
        `${getBasePath()}/api/files`
      )}/${newFileName}`,
      pureUrl: `${dirPath.replace("./public", "/api/files")}/${newFileName}`,
    },
  };
}

export async function uploadImageByUrl(formData: FormData) {
  const urlEntry = formData.get("url");
  if (typeof urlEntry !== "string" || !urlEntry) {
    return {
      success: false,
      message: "URL inválida ou não fornecida.",
    };
  }
  const response = await fetch(urlEntry);
  if (!response.ok) {
    return {
      success: false,
      message: "Não foi possível baixar a imagem.",
    };
  }
  const arrayBuffer = await response.arrayBuffer();
  const data = Buffer.from(arrayBuffer);
  const mimeType = response.headers.get("content-type") || "";
  const validMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
  ];
  if (!validMimeTypes.includes(mimeType)) {
    return {
      success: false,
      message: "Tipo inválido. Apenas imagens são aceitas.",
    };
  }
  const fileExtension = mimeType.split("/").pop();
  const hash = crypto
    .createHash("md5")
    .update(urlEntry + Date.now().toString())
    .digest("hex");
  const newFileName = `${hash}.${fileExtension}`;
  const dirPath = "./public";
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const filePath = `${dirPath}/${newFileName}`;
  await fs.promises.writeFile(filePath, data);
  return {
    success: true,
    file: {
      url: `${dirPath.replace(
        "./public",
        `${getBasePath()}/api/files`
      )}/${newFileName}`,
      pureUrl: `${dirPath.replace("./public", "/api/files")}/${newFileName}`,
    },
  };
}
