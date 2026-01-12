export const stringPrepareToCompare = function (string: string): string {
    return string.normalize('NFD').replace(/[\u0300-\u036f|\"]/g, '').toLowerCase()
}

