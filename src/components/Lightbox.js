import React, { useEffect } from 'react';
import './CategoryGrid.css';

function Lightbox({ photos }) {
    useEffect(() => {
        const gallery = document.querySelectorAll(".image:not(:last-child)");
        const previewBox = document.querySelector(".preview-box");
        const previewImg = previewBox.querySelector("img");
        const closeIcon = previewBox.querySelector(".closeImageView");
        const shadow = document.querySelector(".shadow");

        if (photos && photos.length > 0) {
            for (let i = 0; i < gallery.length - 1; i++) {
                let newIndex = i;
                let clickedImgIndex;

                gallery[i].onclick = () => {
                    clickedImgIndex = i;
                    function preview() {
                        let imageURL = gallery[newIndex].querySelector("img").src;
                        previewImg.src = imageURL;
                    }
                    preview();

                    const prevBtn = document.querySelector(".prev");
                    const nextBtn = document.querySelector(".next");

                    if (newIndex === 0) {
                        prevBtn.style.display = "none";
                    }
                    if (newIndex >= gallery.length - 1) {
                        nextBtn.style.display = "none";
                    }

                    prevBtn.onclick = () => {
                        newIndex--;
                        if (newIndex === 0) {
                            preview();
                            prevBtn.style.display = "none";
                        } else {
                            preview();
                            nextBtn.style.display = "block";
                        }
                    };
                    nextBtn.onclick = () => {
                        newIndex++;
                        if (newIndex >= gallery.length - 1) {
                            preview();
                            nextBtn.style.display = "none";
                        } else {
                            preview();
                            prevBtn.style.display = "block";
                        }
                    };

                    document.querySelector("body").style.overflow = "hidden";
                    previewBox.classList.add("show");
                    shadow.style.display = "block";
                    closeIcon.onclick = () => {
                        newIndex = clickedImgIndex;
                        prevBtn.style.display = "block";
                        nextBtn.style.display = "block";
                        previewBox.classList.remove("show");
                        shadow.style.display = "none";
                        document.querySelector("body").style.overflow = "scroll";
                    };
                };
            }

            document.querySelector(".closeImageView").onclick = function () {
                previewBox.style.display = "none";
                shadow.style.display = "none";
            };
        }
    }, [photos]);

    return (
        <div>
            <div className="preview-box">
                <div className="image-box">
                    <div className="closeImageView"><p>X</p></div>
                    <a href="#prev" className="arrow prev">prev</a>
                    <a href="#next" className="arrow next">next</a>
                    <img src={photos && photos.length > 0 ? photos[0].image : ''} alt="" />
                </div>
            </div>
            <div className="shadow"></div>
        </div>
    );
}

export default Lightbox;
