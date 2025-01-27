import Cast from "../models/Casts.js"

const castService = {
    create(castData) {
    return Cast.create(castData)

    },
    getAll() {
        return Cast.find({})

    }
}

export default castService