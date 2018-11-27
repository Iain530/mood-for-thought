export const standardDeviation = (values) => {
    const avg = average(values);

    const squareDiffs = values.map((value) => {
        const diff = value - avg;
        const sqrDiff = diff * diff;
        return sqrDiff;
    });

    const avgSquareDiff = average(squareDiffs);

    const stdDev = Math.sqrt(avgSquareDiff);
    return [stdDev, avg];
};

export const average = (data) => {
    const sum = data.reduce((sum, value) => {
        return sum + value;
    }, 0);

    const avg = sum / data.length;
    return avg;
};

export const percentile = (arr, p) => {
    if (arr.length === 0) return 0;
    if (typeof p !== 'number') throw new TypeError('p must be a number');
    if (p <= 0) return arr[0];
    if (p >= 1) return arr[arr.length - 1];

    const index = arr.length * p,
        lower = Math.floor(index),
        upper = lower + 1,
        weight = index % 1;

    if (upper >= arr.length) return arr[lower];
    return arr[lower] * (1 - weight) + arr[upper] * weight;
};

export const range = (start, end, gap) => {
    const arr = [start];
    let current = start;
    while (current + gap < end) {
        current += gap;
        arr.push(current);
    }
    return arr;
};

export const getBuckets = (arr, size) => arr.map(v => v - v % size);

export const getCounts = (arr) => arr.reduce((cnts, v) => {
    cnts[v] ? cnts[v]++ : cnts[v] = 1;
    return cnts;
}, {});
