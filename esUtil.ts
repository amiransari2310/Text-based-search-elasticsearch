import { Client } from '@elastic/elasticsearch';
import config from './config';

const { esHost, esPort } = config;
const node = `${esHost}:${esPort}`;
const client = new Client({ node });

export default { client };