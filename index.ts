import esService from './esService';
import config from './config';
import utils from './utils';
import Product from './models/Product';

const { indexName = '' } = config;
const { searchData, checkIndexExistance } = esService;
const { getUserInput } = utils;

/**
 * Function to perform Text Based Search
 * @return {array} Serialize response of input data
 */
const search = async () => {
    try {
        const { body: isIndexExist = false } = await checkIndexExistance(indexName);
        if (!isIndexExist)
            throw new Error("Index Does Not Exist. Run 'npm run load' To Create Index And Load Data.")
        else {
            const data: Product[] = await searchData(indexName, getUserInput(), true);
            console.log(`Result: \n ${JSON.stringify(data, null, 2)}`);
        }
    } catch (err) {
        throw err;
    }
}

(async () => {
    try {
        await search();
    } catch (err) {
        console.log(err);
    }
})();