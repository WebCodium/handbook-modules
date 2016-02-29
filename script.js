/**
 *
 * @returns {{myFunc: myFunc, myCar: constructorCar}}
 */
var getCar = function () {
    /**
     *
     * @param model
     * @param type
     * @returns {{wheels: number, speed: number}}
     */
    function myFunc(model, type) {
        return object = {
            wheels: 4,
            speed: 5
        }
    }

    /**
     *
     * @param wheels
     * @param model
     */
    function constructorCar(wheels, model) {
        this.wheels = wheels;
        this.model = model;
    };
    /**
     *
     * @type {{run: Function}}
     */
    constructorCar.prototype = {
        run: function () {
            return this.wheels * this.model;
            return this.wheels * this.model;
        }
    };

    /**
     *
     * @type {constructorCar}
     */
    var myCar = new constructorCar(4, 23);

    return {
        myFunc: myFunc,
        myCar: myCar
    }
};