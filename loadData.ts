import esService from './esService';
import dataSet from './mocks/dummyData';
import config from './config';

const { indexName = '' } = config;
const { createIndex, checkIndexExistance, insertData } = esService;

const body = {
    settings: {
        analysis: {
            analyzer: {
                my_analyzer: {
                    type: 'custom',
                    tokenizer: 'my_tokenizer',
                    filter: ['lowercase']
                },
            },
            tokenizer: {
                my_tokenizer: {
                    type: 'edge_ngram',
                    min_gram: 2,
                    max_gram: 20
                }
            }
        }
    },
    mappings: {
        properties: {
            id: { type: 'integer' },
            name: { type: 'text', analyzer: 'my_analyzer' },
            description: { type: 'text' },
            price: { type: 'integer' }
        }
    }
};

/**
 * Function to load initial dummy dats in Index
 * @return {array} Loaded Data in Index
 */
const load = async () => {
    try {
        const { body: isIndexExist = false } = await checkIndexExistance(indexName);
        if (!isIndexExist) {
            await createIndex(indexName, body);
            await insertData(indexName, dataSet);
            console.log('Data Loaded Successfully.');
        } else console.log('Index already exist.');
    } catch (err) {
        throw err;
    }
}

(async () => {
    try {
        await load();
    } catch (err) {
        console.log(err);
    }
})();