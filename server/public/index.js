import { compLoader } from './js/pageLoader.js';
import { getData } from './js/api.js';

compLoader('header', 'header.html');

document.getElementById('start').onclick = async function () {
    console.log('start clicked');

    const data = await getData('/songs');
    document.getElementById('data').innerHTML = JSON.stringify(data, null, 2);
};
