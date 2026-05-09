import { readFile, readdir } from "fs/promises";
import path from "path";

export type GeneratedFile = {
  path: string;
  content: Buffer;
};

export async function listGeneratedFiles(root: string, current = root): Promise<GeneratedFile[]> {
  const entries = await readdir(current, { withFileTypes: true });
  const files: GeneratedFile[] = [];

  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".git") {
      continue;
    }

    const absolutePath = path.join(current, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listGeneratedFiles(root, absolutePath)));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    files.push({
      path: path.relative(root, absolutePath).split(path.sep).join("/"),
      content: await readFile(absolutePath),
    });
  }

  return files;
}
