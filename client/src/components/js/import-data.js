/**
 * Function to import all modules from a folder.
 * Copied from https://shaquillegalimba.medium.com/how-to-import-multiple-images-in-react-1936efeeae7b
 *
 * @example
 * const images = importAll(require.context('../assets/images/', false, /\.(png|jpe?g|svg)$/));
 *
 * @param {Object} r Imported data of modules from a certain directory
 * @returns {Object} Filtered data of modules
 */
function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
        images[item.replace("./", "")] = r(item);
    });
    return images;
}

/**
 * A function to import required assets like 'images', 'svgs', etc. from src/assets directory.
 *
 * @param {string} assets Describe which assets to import.
 * @returns {object} - Filtered data of required assets.
 */
function importAssets(assets) {
    if (assets === "svgs") {
        return importAll(
            require.context("../../assets/svgs/", false, /\.(png|jpe?g|svg)$/)
        );
    }

    if (assets === "images") {
        return importAll(
            require.context("../../assets/svgs/", false, /\.(png|jpe?g|svg)$/)
        );
    }
}

export { importAll, importAssets };
