const axios = require('axios');

class Recaptcha {

 /**
   * Opzioni di default per il transport http
   */
  static httpVerifyUrl = 'https://www.google.com/recaptcha/api/siteverify'

 /**
   * Request
   */
  request = null

 /**
   * Response
   */
  response = null

 /**
   * Settings
   */
  settings = {}

  /**
   * Costruttore istanza oggetto Recaptcha
   *
   */
  constructor(secret, token) {
    this.request = {
        secret: secret,
        token: token
    }
  }


  setRequest(data) {
    this.request = data;
  }

    /**
    * Chiamata http per la verifica del token
    * @return {Object}
    */
    async toVerify() {

    let { data } = await axios({
      method: 'post',
      url: Recaptcha.httpVerifyUrl,
      params: {
        secret: this.request.secret,
        response: this.request.token
      }
    });

    this.response = data;

    return data;
  }

   isOk() {

    return this.get('success') === true;

  }

  successful() {

    return this.isOk();

  }

  failed() {

    return !this.isOk();

  }
  
    /**
     * Ritorna il valore della risposta di google recaptcha
     * @return {Object|null} 
     */
    getResponse() {
        return this.response;
    }

    get(keyPath = null, defaultReturn = null) {
        
        let response = this.getResponse();

        keyPath = (!keyPath || keyPath == '') ? [] : keyPath.split('.');
    
        if (!response)
          return defaultReturn;
    
        for (var i = 0; i < keyPath.length; i++) {
           if (keyPath[i] in response && (response[keyPath[i]] && typeof response[keyPath[i]] == 'object' || i == keyPath.length - 1)) {
             response = response[keyPath[i]];
           } else {
             return defaultReturn;
           }
        }
        return response;
     }


}

module.exports = Recaptcha;
module.exports.default = Recaptcha;
