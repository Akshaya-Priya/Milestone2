class Bus {
    constructor(id, name, startStop, endStop, route, time) {
        this.id = id;
        this.name = name;
        this.startStop = startStop;
        this.endStop = endStop;
        this.route = route;
        this.time = time;
    }
}

module.exports = Bus;
