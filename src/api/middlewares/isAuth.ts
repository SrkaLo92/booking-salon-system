import expressJwt from 'express-jwt';
import config from '../../config';

const isAuth = expressJwt({
    secret: config.jwt.secret, // The _secret_ to sign the JWTs
    algorithms: [config.jwt.algorithm], // JWT Algorithm
    issuer: config.domain,
    // audience: config.domain,
});

export default isAuth;
