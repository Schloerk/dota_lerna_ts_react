export function VectorManhattenDistance(from: Vector, to: Vector) {
    return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
}

export function VectorFromArray(from: number[]) {
    if (from === null || from.length === 0) {
        return Vector(0, 0, 0);
    }

    if (from.length >= 3) {
        return Vector(from[0], from[1], from[2]);
    } else if (from.length === 2) {
        return Vector(from[0], from[1], 0);
    } else if (from.length === 1) {
        return Vector(from[0], 0, 0);
    }
}

export function VectorToArray(from: Vector) {
    return [from.x, from.y, from.z];
}
