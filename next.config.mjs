import path from 'path';

const sassOptions = {
    includePaths: [
        path.join(process.cwd(), 'styles') // Используйте process.cwd() вместо __dirname
    ]
};

export default {
    sassOptions
};