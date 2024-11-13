import './css/welcome-page.scss'
import {importAll} from '../components/js/import-data.js';


export default function welcomePage(){
    const svgs = importAll(require.context('../assets/svgs/', false, /\.(png|jpe?g|svg)$/));
    return(
        <>
            
        </>
    )
}