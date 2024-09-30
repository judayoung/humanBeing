export const compLoader = (elId, compFile) => {
    console.log('compLoader', elId, compFile);

    // Fetch and insert header
    fetch('../ui/components/' + compFile)
        .then((response) => response.text())
        .then((data) => {
            if (!document) {
                throw new Error('Document not found');
            }
            if (!document.getElementById(elId)) {
                throw new Error('Element not found');
            }
            document
                ?.getElementById(elId)
                ?.insertAdjacentHTML('afterbegin', data);
        })
        .catch((error) => console.error('Error fetching header:', error));
};
