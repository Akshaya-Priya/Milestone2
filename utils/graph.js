function findShortestPath(graph, start, end) {
    if (!graph[start] || !graph[end]) {
        throw new Error('Start or end stop not found in graph');
    }

    let queue = [start];
    let visited = new Set();
    let predecessor = {};
    predecessor[start] = null;

    while (queue.length > 0) {
        let current = queue.shift();

        if (current === end) {
            let path = [];
            let step = current;

            while (step !== null) {
                path.unshift(step);
                step = predecessor[step];
            }

            return path;
        }

        graph[current].forEach((neighbor) => {
            if (!visited.has(neighbor)) {
                queue.push(neighbor);
                visited.add(neighbor);
                predecessor[neighbor] = current;
            }
        });
    }

    throw new Error('No path found between the start and end stops');
}

module.exports = { findShortestPath };
