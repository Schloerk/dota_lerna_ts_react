export function ArrayContains<T>(array: T[], target: T) {
    const length = array.length;

    for (let i = 0; i < length; i++) {
        if (array[i] === target) {
            return true;
        }
    }

    return false;
}

/**
 * Returns only entries contained in both
 */
export function ArrayDuplicates<T>(arrayA: T[], arrayB: T[]): T[] {
    return arrayA.filter(item => ArrayContains(arrayB, item));
}

export function ArrayRandomElementBetween<T>(array: T[], min: number, max: number): T {
    return array[RandomInt(min, max)];
}

export function ArrayRandomElement<T>(array: T[]): T {
    return ArrayRandomElementBetween(array, 0, array.length - 1);
}

export function ArrayCopy2D<T>(array: T[][]): T[][] {
    const copy: T[][] = [];

    for (let i = 0; i < array.length; i++) {
        if (!copy[i]) {
            copy[i] = [];
        }
        for (let j = 0; j < array[i].length; j++) {
            copy[i][j] = array[i][j];
        }
    }

    return copy;
}

export function Index2DTo1D(bounds: Vector, index: Vector): number {
    return bounds.x * index.x + index.y;
}

export function Index1DTo2D(bounds: Vector, index: number): Vector {
    return Vector(math.floor(index / bounds.x), math.floor(index % bounds.y));
}

export function forEach2D<T>(array: T[][], func: (elem: T, x?: number, y?: number) => void) {
    for(let x = 0; x < array.length; x++) {
        for(let y = 0; y < array[x].length; y++) {
            func(array[x][y], x, y);
        }
    }
}

export function map2DTo1D<T, D>(array: T[][], func?: (elem: T) => D): D[] {
    const result = [] as D[];
    const xDim = array.length;
    for(let x = 0; x < xDim; x++) {
        const yDim = array[x].length;
        for(let y = 0; y < yDim; y++) {
            const index = Index2DTo1D(Vector(xDim, yDim), Vector(x,y));
            const elem = array[x][y];
            result[index] = func ? func(elem) : elem as any as D;
        }
    }

    return result;
}

export function map2D<T, D>(array: T[][], func: (elem: T) => D): D[][] {
    const result = [] as D[][];
    const xDim = array.length;
    for(let x = 0; x < xDim; x++) {
        const yDim = array[x].length;
        result[x] = [];
        for(let y = 0; y < yDim; y++) {
            result[x][y] = func(array[x][y]);
        }
    }

    return result;
}
