import { join } from 'path';

const saveFileToPath = (file) => {
    let staticPath = join('./', 'uploads');
    let filePath = join(staticPath, file.name)
    file.mv(filePath);
}

export default saveFileToPath;