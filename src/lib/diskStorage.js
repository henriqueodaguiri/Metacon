const fs = require("fs");
const path = require("path");
const UPLOADS_FOLDER = path.join(process.cwd(), "public/uploads");
const crypto = require("crypto");

class DiskStorage {
  async save(fileName, buffer) {
    const fileHash = crypto.randomBytes(10).toString("hex");
    const uniqueFileName = `${fileHash}-${fileName}`;
    await fs.promises.writeFile(path.resolve(UPLOADS_FOLDER, uniqueFileName), buffer);

    return uniqueFileName;
  }

  async delete(fileName) {
    const filePath = path.resolve(UPLOADS_FOLDER, fileName);

    try {
      await fs.promises.stat(filePath);
    } catch(error) {
      console.log(error);
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;