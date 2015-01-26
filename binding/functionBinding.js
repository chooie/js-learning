(function() {
    "use strict";
    /**
     * Function binding is used call a function with a specific 'this' value and
     * with specific arguments. A function is defined that returns a function
     * with a specific variable context (closure) whose body consists of
     * calling a function that is a parameter of the outermost function with
     * the context of an object that is also passed as a parameter.
     */

    /**
     * The core idea
     */

    /**
     * We're passing in a function and an object that defines the context in
     * which we wish to call the function. Basically we want 'this' to point
     * to the context object.
     * @param {Function} fn
     * @param {Object} context
     * @returns {Function}
     */
    function bind(fn, context) {
        // This function's basic purpose is to return a function. Note that this
        // function still has access to the 'bind' function's variable context.
        // It is essentially 'locked' to the context of the 'context' object.
        return function() {
            // Note that the 'context' parameter is the same object that was
            // passed into 'bind'. The 'arguments' parameter does NOT correspond
            // to the parameters of 'bind'. It corresponds to any arguments that
            // will be passed to the anonymous function (which is a closure).
            // You'll see how this works soon!

            // Also take note that this closure returns whatever value is
            // returned from applying the original 'fn' argument (a function)
            // with a specific context (whatever object is passed to it) and
            // also whatever arguments this closure is called with.
            return fn.apply(context, arguments);
        }
    }

    /**
     * So what's the point? Function binding really shines when dealing with
     * events.
     */

    /**
     * Some object we're using to handle events.
     * @type {{message: string, handleClick: Function}}
     */
    var handler = {
        message: "Event handled",

        handleClick: function(event) {
            console.log(this.message + ": " + event.type);
        }
    };

    var btn1 = document.getElementById("user-defined-bind-btn");
    // Here we're adding an event listener that will do something when the
    // button is clicked. Note our use of the 'bind' function that was defined
    // earlier!
    btn1.addEventListener("click", bind(handler.handleClick, handler), false);

    // Since ECMAScript 5, we haven't had to define our own 'bind' function.
    // It is defined on Function.prototype natively!
    var btn2 = document.getElementById("native-bind-btn");
    btn2.addEventListener("click", handler.handleClick.bind(handler), false);

    /**
     * Not quite sure yet how this works? Let's see what could happen if we
     * didn't bind the function to a context.
     */

    var btn3 = document.getElementById("no-bind-btn");
    btn3.message = "This isn't the right context!";
    // We simply pass in a reference to the handler object's 'handleClick'
    // function.
    btn3.addEventListener("click", handler.handleClick, false);
    // When you click the 'no-bind-btn' button, you'll see that we get the
    // message "This isn't the right context!: click". So, as you can see,
    // because we haven't bound our 'handleClick' function to the right context
    // (the handler object), 'this' is therefore pointing to the btn3 object.
    // Seeing as we assigned btn3.message the value "This isn't the right
    // context!", handleClick is therefore printing out this value to the
    // console because 'this.message' corresponds to 'btn3.message'. Function
    // binding is therefore used here so that 'this.message' corresponds to
    // 'handler.message'.
})();
