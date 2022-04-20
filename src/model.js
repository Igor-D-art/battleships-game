export const model = (function () {

    const ship = (length) => {
        const shipLength = length;
        return shipLength;
    };

    const add = (a, b) => {
        return a + b;
    };

    return { ship, add };
})();
