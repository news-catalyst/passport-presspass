/**
 * Module dependencies.
 */
var util = require('util')
  , OpenIDConnectStrategy = require('passport-openidconnect').Strategy;


/**
 * `Strategy` constructor.
 *
 * Options:
 *   - `clientID`       The OIDC Client ID.
 *   - `pressPassBase`  The base url of PressPass/squarlet; usually unnecessary, but helpful when developing
 *   - ...              Inherits from OpenIDConnect strategy
 *
 * Examples:
 *
 *     passport.use(new PressPassStrategy({
 *         clientID: "<your id>"
 *       },
 *       function(identifier, profile, done) {
 *         // your function...
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, validate) {
  options = options || {};
  var pressPassBase = options.pressPassBase || "https://presspass.it/";
  options.issuer = options.issuer || pressPassBase + "openid";
  options.authorizationURL = options.authorizationURL || pressPassBase + "openid/authorize/";
  options.tokenURL = options.tokenURL || pressPassBase + "openid/token/";
  options.userInfoURL = options.userInfoURL || pressPassBase + "openid/userinfo/";
  options.scope = options.scope || "openid email profile organizations";
  options.clientSecret = options.clientSecret || "unknown"; // Not always required
  OpenIDConnectStrategy.call(this, options, validate);
  this.name = 'presspass';
}

/**
 * Inherit from `OpenIDConnectStrategy`.
 */
util.inherits(Strategy, OpenIDConnectStrategy);

/**
 * Expose `Strategy`.
 */

 module.exports = Strategy;
 module.exports.Strategy = Strategy;