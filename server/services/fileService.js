const path = require('path');

const saveFileToPath = (file) => {
    staticPath = path.join(__dirname, '..', 'uploads');
    filePath = path.join(staticPath, file.name)
    file.mv(filePath);
}


module.exports = saveFileToPath;