import Cast from "../models/Casts.js"

const castService = {
    create(castData) {
    return Cast.create(castData)

    }
}

export default castService