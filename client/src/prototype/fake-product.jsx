export default function FakeProduct () {
    function handleConvertButton(e) {
        console.log(e);
    }
    return (
        <>
            <button id="convert-button" name="convert-button" onClick={(e) => { e.preventDefault(); handleConvertButton(e) }}>Convert</button>
            Rupesh
        </>
    );
}