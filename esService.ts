import esInstances from './esUtil';
import { RequestParams } from '@elastic/elasticsearch';
const { client } = esInstances;

/**
 * Function to check if an Index exist or not
 * @param {string} indexName - String Index Name
 * @return {object} Exist qurry sesponse
 */
const checkIndexExistance = async (indexName: string) => {
    return await client.indices.exists({ index: indexName });
}

/**
 * Function to create an Index
 * @param {string} indexName - String Index Name
 * @param {object} body - Valid object containing index settings and mapping(schema)
 * @return {object} Index create sesponse
 */
const createIndex = async (indexName: string, body: any) => {
    return await client.indices.create({
        index: indexName,
        body
    });
}

/**
 * Function to Insert data in an Index
 * @param {string} indexName - String Index Name
 * @param {array} dataSet - Array of Objects
 * @return {object} Insert sesponse
 */
const insertData = async (indexName: string, dataSet: any[]) => {
    try {
        const body = dataSet.reduce((list = [], item) => {
            list = [...list, { index: { _index: indexName } }, item];
            return list;
        }, []);
        return await client.bulk({ body });
    } catch (err) {
        throw err;
    }
}

/**
 * Function to Search data in an Index
 * @param {string} indexName - String Index Name
 * @param {string} keyword - String input value to be search in Indexed documents
 * @param {boolean} formatResponse - Boolean flag to specify response serialization
 * @return {array} Search sesponse
 */
const searchData = async (indexName: string, keyword: string, formatResponse: boolean = false) => {
    try {
        const searchParams: RequestParams.Search = {
            index: indexName,
            body: {
                query: {
                    match: { name: { query: keyword } }
                }
            }
        }
        const result = await client.search(searchParams);
        return formatResponse ? formatResponseData(result) : result;
    } catch (err) {
        throw err;
    }
}

/**
 * Function to Serialize ES Query Response
 * @param {array} indexName - ES Query response array
 * @return {array} Serialize response of input data
 */
const formatResponseData = (data: any) => {
    const { body: { hits: { hits = [] } = {} } = {} } = data;
    return hits.map(({ _source = {} }) => _source);
}

export default {
    createIndex,
    insertData,
    searchData,
    checkIndexExistance,
}