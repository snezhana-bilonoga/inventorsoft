function grid(n) {
    if (n < 0) {
        return null;
    }

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const result = [];

    for (let i = 0; i < n; i++) {
        result[i] = [];
        for (let j = i; j < n + i; j++) {
            result[i].push(alphabet[j % alphabet.length]);
        }
    }

    return result;
}
