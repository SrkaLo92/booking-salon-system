import expressJwt from 'express-jwt';
import config from '../../config';

const isAuth = expressJwt({
    secret: config.jwt.secret, // The _secret_ to sign the JWTs
    algorithms: [config.jwt.algorithm], // JWT Algorithm
    audience: config.domain,
    issuer: config.domain,
});

export default isAuth;
