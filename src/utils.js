import JXRand from "jxrand"

export const getRandomScientificNotationNumber = () => {
    return {
        coefficient: JXRand.getNumber({min: 1, max: 9.999})
            .toFixed(JXRand.getNumber({min: 0, max: 4, type: 'integer'})),
        exponent: JXRand.getNumber({min: -6, max: 6, type: 'integer'})
    }
}
