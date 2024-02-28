import productsModels from "../models/productsModels.js"

export const paginate = async (prop, str, numLimit, numPage, numSort) => {
    const pag = await productsModels.paginate({ [prop]: str }, { limit: numLimit, page: numPage, sort: numSort })
    return pag
}

