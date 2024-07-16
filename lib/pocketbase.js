import PoocketBase from 'pocketbase';

const pb = new PoocketBase('http://192.168.1.7:8090');

pb.autoCancellation(false);

export default pb;
