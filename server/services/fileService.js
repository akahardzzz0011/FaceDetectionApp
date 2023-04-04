import { join } from 'path';

const saveFileToPath = (file) => {
    let staticPath = join('./', 'uploads');
    console.log(staticPath);
    let filePath = join(staticPath, file.name)
    file.mv(filePath);
}

export default saveFileToPath;