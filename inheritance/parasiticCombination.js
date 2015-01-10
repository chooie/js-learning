(function() {
    "use strict";
    /**
     * Parasitic Combination inheritance is considered the most efficient way to
     * implement type-based inheritance.
     *
     * --What is it?--
     * An approach that combines constructor stealing (to inherit properties)
     * with a hybrid form of prototype chaining (to inherit methods).
     *
     * --Basic Idea--
     * Inherit from the supertype's prototype and then assign the result to
     * subtype's prototype.
     *
     * --Why is it the best?--
     * - Supertype constructor is called only once. This is superior to
     *   Combination inheritance, because CI calls the supertype constructor
     *   twice, storing an extra copy of the supertype's properties on the
     *   subtype's prototype (waste of memory).
     * - It preserves the prototype chain, so instanceof and isPrototypeOf()
     *   behave normally. I.e. 'subInstance instanceof SuperType' returns true.
     */

    /**
     * Basic Pattern
     */
    function inheritPrototype(subType, superType) {
        // Create a new instance of the superType's prototype.
        var superPrototype = Object.create(superType.prototype);

        // Ensure superPrototype's constructor attribute references the subType
        // object. This is so that when we use instanceof on the subType object,
        // it will behave normally.
        superPrototype.constructor = subType;

        // Assign the clone of the superPrototype, with updated constructor
        // reference, to the subType's prototype attribute.
        subType.prototype = superPrototype;
    }

    /**
     * Use in action
     */

    /**
     * Some SuperType
     * @param {String} name
     */
    function SuperType(name) {
        this.name = name;
        this.colors = ["red", "blue", "green"];
    }

    SuperType.prototype.sayName = function() {
        console.log(this.name);
    }

    /**
     * Some SubType
     * @param {String} name
     * @param {Number} age
     */
    function SubType(name, age) {
        SuperType.call(this, name);
        this.age = age;
    }

    // Use our function to correctly inherit SuperType's prototype
    inheritPrototype(SubType, SuperType);

    SubType.prototype.sayAge = function() {
        console.log(this.name + " is " + this.age + ".");
    }

    /**
     * Test it out
     */

    var subTypeInstance = new SubType('Charlie', 22);
    console.log(subTypeInstance instanceof SuperType); // true
    console.log(subTypeInstance instanceof SubType); // true
    console.log(SubType.prototype.isPrototypeOf(subTypeInstance)); // true
    subTypeInstance.sayAge(); // Charlie is 22.

    var superTypeInstance = new SuperType('Charlie');
    console.log(superTypeInstance instanceof SuperType); // true
    console.log(superTypeInstance instanceof SubType); // false
    console.log(SubType.prototype.isPrototypeOf(superTypeInstance)); // false
    superTypeInstance.sayAge(); // Error
}());
