export const model = (function () {

    const ship = (length) => {
        const shipLength = length;
        return { shipLength };
    };

    const cruiser = ship(3);

    return { ship, cruiser };
})();
