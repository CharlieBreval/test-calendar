export const colors = [
    "#8C88BA", "#BF84AE", "#DB95AC", "#F6A294", "#A7B0CF", "#F8D1C9"
]

function getRandomIntInclusive(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

export function pickRandomColor() {
    const color = colors[getRandomIntInclusive(0, colors.length - 1)];
    return color;
}