/// The Greetr Library:
/// Used for sending greetings in English and Spanish.
/// It can be incorporated within any project without getting in the way of its performance.

(function (global, $) {

    // 'new' the creation of object
    var Greetr = function (firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language)
    }

    var supportedLangs = ['en', 'es'];

    var greetings = {
        en: 'Hello',
        es: 'Hola'
    }

    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    }

    var logMessages = {
        en: 'Logged in',
        es: 'Inicio Sesion'
    }

    // Build functionality.
    Greetr.prototype = {
        // Get the fullname of the subject.
        fullname: function () {
            return this.firstName + ' ' + this.lastName;
        },

        // Validate whether the language is in the library, if not throw an error.
        validate: function () {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw 'Invalid Language!'
            }
        },

        // Greet person.
        greeting: function () {
            return greetings[this.language] + ', ' + this.firstName + '!';
        },

        // Greet personal formally.
        formalGreeting: function () {
            return formalGreetings[this.language] + ', ' + this.fullname() + '.';
        },

        greet: function (formal) {
            var msg;

            // If undefined or null it will be coerced to 'false'.
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time
            // makes the method chainable.
            return this;
        },

        log: function () {
            if (console) {
                console.log(logMessages[this.language] + ', ' + this.fullname());
            }
            return this;
        },

        setLang: function (lang) {
            this.language = lang;

            this.validate();

            return this;
        },

        // Set jQuery support.
        HTMLGreeting: function (selector, formal) {
            // If we don't have jQuery.
            if (!$) {
                throw 'jQuery not loaded!';
            }

            // If we don't have a selector.
            if (!selector) {
                throw 'Missing jQuery selector!'
            }

            // Throw message based on greeting.
            var msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            // Inject the message into the DOM.
            $(selector).html(msg);

            // Make it chainable.
            return this;
        }
    };

    // Create the initialisation function (object).
    Greetr.init = function(firstName, lastName, language) {
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
    }

    // Set the prototype.
    Greetr.init.prototype = Greetr.prototype;

    // Set the G$ variable to call in Greetr with 'G$'.
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));