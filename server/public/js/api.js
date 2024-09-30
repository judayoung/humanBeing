export const getData = async (uri) => {
    try {
        const response = await fetch(uri);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error('Error fetching data:', err);
    }
};
