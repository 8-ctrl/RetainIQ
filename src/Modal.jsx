import React from "react";
import { useState, useRef, useEffect } from "react";
import { IKImage } from "imagekitio-react";
import axios from "axios";

export default function Modal({ url }) {
  const [showModal, setShowModal] = useState(false);
  const [upload, setUpload] = useState();
  const [fileData, setFileData] = useState();
  const [FilePaths, setFilePaths] = useState([]);
  const [showUploadBtn, setShowUploadBtn] = useState(false);
  const [selectImage, setSelectImage] = useState();
  const [link, setLink] = useState();
  const [uploadInput, setUploadInput] = useState();

  const publicKey = "public_5omC/8jvgPY4PdvyA8kOfAL2Vnk=";
  const urlEndpoint = "https://ik.imagekit.io/FEretainiq";
  const authenticationEndpoint = "http://localhost:3001/auth";

  useEffect(() => {
    axios
      .get("http://localhost:3001/fetch")
      .then((res) => setFilePaths(res.data))
      .catch((err) => console.log(err));
  }, [showModal]);

  function handleFileChange(e) {
    if (e.target.files[0] === undefined) {
      setShowUploadBtn(false);
      setUploadInput(false);
    } else {
      setShowUploadBtn(true);
      setUploadInput(true);
    }
    setUpload(e.target.files[0]);
    axios
      .get(authenticationEndpoint)
      .then((res) => setFileData(res.data))
      .catch((err) => console.log(err));
    setSelectImage(false);
  }

  function handleFileUpload(e) {
    let fd = new FormData();
    fd.append("file", upload, upload.name);
    fd.append("publicKey", publicKey);
    fd.append("signature", fileData.signature);
    fd.append("expire", fileData.expire);
    fd.append("token", fileData.token);
    fd.append("fileName", upload.name);
    axios
      .post("https://upload.imagekit.io/api/v1/files/upload", fd)
      .then((res) => url(res.data.url))
      .then(() => setShowModal(false))
      .then(() => setShowUploadBtn(false))
      .catch((err) => console.log(err));
    setSelectImage(false);
    setUploadInput(false);
  }

  function handleBtn(e) {
    setShowModal(false);
    setShowUploadBtn(false);
    setSelectImage(false);
    setUploadInput(false);
  }

  function handleImagesBtn(e) {
    url(link);
    setShowModal(false);
    setSelectImage(false);
  }

  function handleImages(e) {
    setLink(e.target.currentSrc);
    setSelectImage(true);
  }
  return (
    <>
      <button
        className="bg-slate-600 text-white active:bg-slate-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Upload
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto  fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-3/4 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex  justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Select Image</h3>
                </div>
                {/*Choose Image */}
                <div className="relative p-6 flex justify-center">
                  {showUploadBtn ? (
                    <button
                      className="mx-3 rounded-lg bg-slate-800 text-white w-44"
                      onClick={handleFileUpload}
                    >
                      Upload & Use image
                    </button>
                  ) : null}
                  <input
                    type="file"
                    accept="image/*"
                    id="select-image"
                    className="text-sm text-grey-500
                    file:mr-5 file:py-2 file:px-6
                    file:rounded-full file:border-0
                    file:text-sm file:font-medium
                    file:bg-blue-100 file:text-blue-700
                    hover:file:cursor-pointer 
                     disabled:cursor-not-allowed"
                    placeholder=""
                    onChange={handleFileChange}
                    disabled={uploadInput}
                  ></input>
                </div>

                {/*your Images */}
                <div
                  className="relative p-6 flex-auto h-96
                "
                >
                  <div className="mb-2">
                    <p className="text-4xl font-bold">Your Images</p>
                  </div>
                  <div className="p-5   h-5/6 flex flex-wrap justify-around overflow-y-scroll scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 w-auto">
                    {FilePaths.map((i, idx) => (
                      <div className="flex-col m-3 ">
                        <div className="mb-2 rounded-xl w-fit hover:shadow-2xl">
                          <IKImage
                            urlEndpoint={urlEndpoint}
                            path={i.name}
                            width="300"
                            height="300"
                            className="rounded-xl cursor-pointer"
                            onClick={handleImages}
                          />
                        </div>
                        <p className="text-slate-700 font-semibold">{i.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleBtn}
                  >
                    Close
                  </button>
                  <button
                    className="bg-slate-800 text-white font-bold  text-sm px-6 py-3 rounded shadow  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:cursor-not-allowed disabled:bg-slate-300 "
                    type="button"
                    onClick={handleImagesBtn}
                    disabled={!selectImage}
                  >
                    Use Selected Images
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
