import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import PptxGenJS from "pptxgenjs";
const PDFJS = window.pdfjsLib;

const ImportInduction = () => {
  const [induction, setInduction] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [pdf, setPdf] = useState("");
  const [width, setWidth] = useState(0);
  const [images, setImages] = useState([]);
  const [height, setHeight] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfRendering, setPdfRendering] = useState("");
  const [pageRendering, setPageRendering] = useState("");
  const [text, setText] = useState("");

  function generatePresentation(imagesList) {
    console.log(imagesList, "imagesList...");
    const pptx = new PptxGenJS();
    for (let i = 0; i < imagesList.length; i++) {
      const slide = pptx.addSlide();
      slide.addImage({ path: imagesList[i], x: 0, y: 0, w: "50%", h: "80%" });
    }
    pptx.writeFile("presentation.pptx");
  }

  async function showPdf(event) {
    try {
      setPdfRendering(true);
      const file = event.target.files[0];
      const uri = URL.createObjectURL(file);
      const imagesList = [];
      var _PDF_DOC = await PDFJS.getDocument({ url: uri }).promise;
      setPdf(_PDF_DOC);
      setPdfRendering(false);
      document.getElementById("file-to-upload").value = "";
    } catch (error) {
      alert(error.message + "here");
    }
  }
  /* function changePage() {
    setCurrentPage();
  } */

  async function renderPage() {
    setPageRendering(true);
    const imagesList = [];
    const canvas = document.createElement("canvas");
    canvas.setAttribute("className", "canv");
    let canv = document.querySelector(".canv");
    for (let i = 1; i <= pdf.numPages; i++) {
      var page = await pdf.getPage(i);
      var viewport = page.getViewport({ scale: 1 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      var render_context = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      };
      console.log("page lenght", pdf.numPages);
      setWidth(viewport.width);
      setHeight(viewport.height);
      await page.render(render_context).promise;
      let img = canvas.toDataURL("image/png");
      imagesList.push(img);
    }
    setImages(imagesList);
    setPageRendering(false);
    generatePresentation(imagesList);
  }



  useEffect(() => {
    pdf && renderPage();
    // eslint-disable-next-line
  }, [pdf, currentPage]);

  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: "5px",
      flexWrap: "wrap",
    },
    imageWrapper: {
      //display: "inline-block",
      width: "200px",
      height: "250px",
      border: "1pxsolid rgba(0,0,0,0.15)",
      borderRadius: "3px",
      boxShadow: "0 2px 5px 0 rgba(0,0,0,0.25)",
      padding: "0",
    },
  };
  //to do ........
  // new
  // console.log(images, "images")
  const handleSubmit = () => {
    const textimg = [];
    setIsLoading(true);
    console.log("checking images", images);
    Promise.all(
      images.map((images) =>
        Tesseract.recognize(images, "eng").catch((err) => console.error(err))
      )
      // jo section alg alg wala aa oh kam  ithe kita a
    ).then((img) => {
      console.log(img, "img..");
      setText(img);
      // setText(img.map((img) => img.data.text).join('\n'));
      setIsLoading(false);
      const imagesList = [];
      imagesList.push(img);

      console.log(imagesList);

    });
  };




  return (
    <div className="App">
      <h2
        style={{
          justifyContent: "center",
          display: "flex",
          marginBottom: "50px",
        }}
      >
        <marquee direction="left" style={{ color: "black", fontSize: "2em" }}>
          PDF to PPT Convertor
        </marquee>
      </h2>
      <button
        className="btn btn-primary d-flex m-auto mb-3"
        onClick={() => document.getElementById("file-to-upload").click()}
      >
        Select PDF
      </button>
      <input
        type="file"
        id="file-to-upload"
        accept="application/pdf"
        hidden
        onChange={showPdf}
      />
      <div id="pdf-main-container">
        <div id="pdf-loader" hidden={!pdfRendering}>
          Loading document ...
        </div>
        <div id="image-convas-row">
          {/* <canvas id="pdf-canvas" width={width} height={height}></canvas> */}
          <div style={styles.wrapper}>
            {images.map((image, idx) => (
              <div key={idx} style={styles.imageWrapper}>
                <img
                  id="image-generated"
                  src={image}
                  alt="pdfImage"
                  style={{
                    width: "100%",
                    height: "100%",
                    margin: "0",
                    border: "none",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div id="page-loader" hidden={!pageRendering}>
          Loading page ...
        </div>
        <br />
        <button
          className="btn btn-primary d-flex m-auto mb-3"
          onClick={handleSubmit}
          type="button"
        >
          Extract{" "}
        </button>
      </div>

      {text &&
        text.map((item) => (
          <div style={{ border: "2px solid black" }}>{item.data.text}</div>
        ))}
    </div>
    //Jo test nu alag alag kkrn wala kam aa oh ithe hoya aa Upper
  );
};
export default ImportInduction;