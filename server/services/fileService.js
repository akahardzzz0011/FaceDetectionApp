import { join } from 'path';

const saveFileToPath = async (file) => {
    let staticPath = join('./', 'uploads');
    let filePath = join(staticPath, file.name)
    await file.mv(filePath);

}

export default saveFileToPath;