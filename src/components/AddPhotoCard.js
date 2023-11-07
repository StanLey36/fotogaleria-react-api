
function AddPhotoCard(props) {
    return (
        <div class= "hero">
        <div id="overlay" style={{display:"none"}}>
            <div class="card-l-design-width">
                <div class="form">
                    <div class="title">
                        <h3>Pridať fotky</h3>
                        <p class="closeOverlay">X</p>
                    </div>
                    <label for="input-file" id="drop-area">
                        <input type= "file" accept= "images/*" id= "input-file" hidden />
                        <div id="img-view">
                            <div id="img-view-content">
                                <img src="/img/icon.png" alt=""/>
                                <p>Sem presunte fotky</p>
                                <span>alebo</span>
                                <p class="chooseImages">Vyberte súbory</p>
                            </div>
                        </div>
                    </label>
                    <button id="submitButton" type="submit">Pridať</button>
                </div>
                
            </div>
        </div>
    </div>
    );
}

export default AddPhotoCard;