import { join } from 'path';
import sharp from 'sharp';

const saveFileToPath = async (file) => {
    let staticPath = join('./', 'uploads');
    let filePath = join(staticPath, file.name)
    await file.mv(filePath);
}

export default saveFileToPath;