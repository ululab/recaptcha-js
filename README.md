# recaptcha-js
Classe helper js per verifica recaptcha di Google

```js
const Recaptcha = require('@ululab/recaptcha-js');


async function test () {

    let data = new Recaptcha('6Ld9zTIjAAAAAJXlsboO0ziWE3uir5KzrKvIxTFK', 'recaptchaValue');

    await data.toVerify();

    if (!data.isOk()) {
    
        console.log({
            message: 'Recaptcha non verificato',
            recaptcha_object: data,
            infoDebug: [data.isOk(), data.get('success'), data.getResponse()]
        });

        console.log(data.getResponse());
        
    }
}

test()

```

```js
// console.log(data.getResponse());
{ success: false, 'error-codes': [ 'invalid-input-response' ] }
```
### Step

Inclusione pacchetto
```js
const Recaptcha = require('@ululab/recaptcha-js');
```

Inizilizzazione istanza Recaptcha
```js
 let data = new Recaptcha(process.env.RECAPTCHA_SECRET_KEY, 'recaptchaValue');
```

Chiamata di verifica http con axios
```js
 await data.toVerify();
```

Verifica della risposta di google
```js
data.isOk()
oppure
data.get('success') === true
```

