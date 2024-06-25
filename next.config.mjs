import path from 'path';

const sassOptions = {
    includePaths: [
        path.join(process.cwd(), 'styles')
    ]
};

const nextConfig = {
    sassOptions,
    compiler: {
        styledComponents: true
    }
};

export default nextConfig;