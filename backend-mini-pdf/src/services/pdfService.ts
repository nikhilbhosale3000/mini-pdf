import os from "os";
import { exec } from "child_process";

//Our compression levels
type CompressionLevel = "less" | "medium" | "max";

export const compressPdf = (
  inputPath: string,
  outputPath: string,
  level: CompressionLevel
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const commandName = os.platform() === "win32" ? "gswin64c" : "gs";
    let qualitySetting = "/ebook";

    if (level === "max") qualitySetting = "/screen";
    if (level === "less") qualitySetting = "/printer";

    const command = `${commandName} -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=${qualitySetting} -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error compressing PDF : ${error.message}`);
        reject(error);
        return;
      }

      resolve();
    });
  });
};
