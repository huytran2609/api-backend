import dotenv from 'dotenv';

function initDotENV() {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
        dotenv.config({
            path: '.env.development',
        });
    }
    if (process.env.NODE_ENV === 'production') {
        dotenv.config({
            path: '.env.production',
        });
    }
}

export { initDotENV };
