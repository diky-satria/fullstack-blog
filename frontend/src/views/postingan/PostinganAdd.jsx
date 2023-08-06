import { Button, Form, Input, Progress } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import axios from "../../interceptor/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";

// ckeditor5
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

// react-select
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
const createOption = (label) => ({
  label,
  value: label,
});

export default function PostinganAdd() {
  const navigate = useNavigate();

  const [judul, setJudul] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [inputTechStack, setInputTechStack] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [content, setContent] = useState("");

  const [statusPending, setStatusPending] = useState(false);
  const [statusPublish, setStatusPublish] = useState(false);
  const [status, setStatus] = useState([]);

  const [loading, setLoading] = useState(false);

  const [errorTechStack, setErrorTechStack] = useState("");
  const [error, setError] = useState([]);

  const [page, setPage] = useState(0);

  const handleKeyDown = (event) => {
    if (!inputTechStack) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setError([]);
        setErrorTechStack("");

        var cek = techStack.filter((val) => val.value === inputTechStack);

        if (cek.length <= 0) {
          setTechStack((prev) => [...prev, createOption(inputTechStack)]);
        } else {
          setErrorTechStack("TechStack tidak boleh ada yang sama");
        }

        setInputTechStack("");
        event.preventDefault();
        break;
      default:
    }
  };

  const loadthumbnail = (e) => {
    const gambar_load = e.target.files[0];
    if (gambar_load) {
      setThumbnail(gambar_load);
      setPreviewThumbnail(URL.createObjectURL(gambar_load));
    } else {
      setThumbnail(null);
      setPreviewThumbnail("");
    }
  };

  const clickNotAll = (e) => {
    setStatus([]);

    const value = e.target.id;
    const checked = e.target.checked;

    var allStatus = document.getElementsByClassName("status");
    var jumlah = [];
    for (var i = 0; i < allStatus.length; i++) {
      var cekChecked = allStatus[i].checked;

      if (cekChecked === true) {
        jumlah.push(allStatus[i]);
      }
    }

    if (value === "pending") {
      setStatusPending(checked);
      setStatusPublish(false);
    }
    if (value === "publish") {
      setStatusPublish(checked);
      setStatusPending(false);
    }

    if (checked) {
      setStatus((pre) => [...pre, value]);
    } else {
      setStatus((pre) => [...pre.filter((val) => val !== value)]);
    }
  };

  const progressPercent = () => {
    if (page === 0) {
      return 35;
    } else if (page === 1) {
      return 70;
    } else {
      return 100;
    }
  };

  const sebelumnya = () => {
    setPage((currPage) => currPage - 1);
  };

  const selanjutnya = async (page) => {
    setError([]);
    setErrorTechStack("");
    setLoading(true);

    if (page === 0) {
      try {
        const formData = new FormData();
        formData.append("judul", judul);
        formData.append("techstack", techStack);
        formData.append("thumbnail", thumbnail);
        formData.append("deskripsi", deskripsi);

        await axios.post("/api/post/addOne", formData, {
          "Content-type": "multipart/form-data",
        });

        setPage((currPage) => currPage + 1);
        setLoading(false);
      } catch (e) {
        setError(e.response.data.errors);
        setLoading(false);
      }
    }
    if (page === 1) {
      try {
        await axios.post("/api/post/addTwo", {
          content: content,
        });
        setPage((currPage) => currPage + 1);
        setLoading(false);
      } catch (e) {
        setError(e.response.data.errors);
        setLoading(false);
      }
    }
    if (page === 2) {
      try {
        var tt = "";
        for (var i = 0; i < techStack.length; i++) {
          if (i > 0) {
            tt += `,${techStack[i].value}`;
          } else {
            tt += `${techStack[i].value}`;
          }
        }

        const formData = new FormData();
        formData.append("judul", judul);
        formData.append("techstack", tt);
        formData.append("thumbnail", thumbnail);
        formData.append("deskripsi", deskripsi);
        formData.append("content", content);
        formData.append("status", status);

        let response = await axios.post("/api/post/addThree", formData, {
          "Content-type": "multipart/form-data",
        });

        navigate(`/postingan`);

        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
          iconTheme: {
            primary: "#1bff1f",
            secondary: "#000000",
          },
          style: {
            borderRadius: "10px",
            background: "#1bff23",
            color: "#000000",
          },
        });
        setLoading(false);

        setPage((currPage) => currPage + 1);
      } catch (e) {
        setError(e.response.data.errors);

        toast.error(e.response.data.errors.msg, {
          position: "top-right",
          iconTheme: {
            primary: "#ff5959",
            secondary: "#fff",
          },
          style: {
            borderRadius: "10px",
            background: "#ff3131",
            color: "#fff",
          },
        });

        setLoading(false);
      }
    }
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setPreviewThumbnail("");
  };

  return (
    <Div className="c-content">
      <div className="container">
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-lg-8 col-xl-8 col-md-8 col-sm-12">
            <Progress
              className="c-ant-progress"
              percent={progressPercent()}
              showInfo={true}
              status="active"
            />
            <div className="card mt-3">
              {page === 0 ? (
                <div className="card-body">
                  <h5 className="mb-4">Tambah Postingan</h5>
                  <div className="form-group mt-3">
                    <label>Judul</label>
                    <Form>
                      <Input
                        onChange={(e) => setJudul(e.target.value)}
                        value={judul}
                      />
                    </Form>
                    {error && error.param === "judul" ? (
                      <small className="form-text" style={{ color: "red" }}>
                        {error.msg}
                      </small>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group mt-3">
                    <label>Techstack</label>
                    <CreatableSelect
                      components={animatedComponents}
                      inputValue={inputTechStack}
                      isClearable
                      isMulti
                      menuIsOpen={false}
                      onChange={(newValue) => setTechStack(newValue)}
                      onInputChange={(newValue) => setInputTechStack(newValue)}
                      onKeyDown={handleKeyDown}
                      placeholder=""
                      value={techStack}
                    />
                    {error && error.param === "techstack" ? (
                      <small className="form-text" style={{ color: "red" }}>
                        {error.msg}
                      </small>
                    ) : (
                      ""
                    )}
                    {errorTechStack ? (
                      <small className="form-text" style={{ color: "red" }}>
                        {errorTechStack}
                      </small>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group mt-3">
                    <label>Thumbnail</label>
                    <Form key={thumbnail}>
                      <Input type="file" onChange={loadthumbnail} />
                    </Form>
                    {previewThumbnail ? (
                      <div className="mt-3" style={{ display: "flex" }}>
                        <div className="thumbnail-cover">
                          <img src={previewThumbnail} alt="load" width="100" />
                          <span
                            className="removeIcon"
                            onClick={() => removeThumbnail()}
                          >
                            <BsFillTrashFill
                              style={{ fontSize: "12px", color: "red" }}
                            />
                          </span>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div>
                      {error && error.param === "thumbnail" ? (
                        <small className="form-text" style={{ color: "red" }}>
                          {error.msg}
                        </small>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <label>Deskripsi</label>
                    <Form>
                      <Input.TextArea
                        onChange={(e) => setDeskripsi(e.target.value)}
                        value={deskripsi}
                      />
                    </Form>
                    {error && error.param === "deskripsi" ? (
                      <small className="form-text" style={{ color: "red" }}>
                        {error.msg}
                      </small>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
              {page === 1 ? (
                <div className="card-body">
                  <h5 className="mb-4">Tambah Postingan</h5>
                  <div className="form-group mt-3">
                    <label>Konten</label>
                    <CKEditor
                      editor={Editor}
                      config={{
                        toolbar: {
                          items: [
                            "findAndReplace",
                            "selectAll",
                            "|",
                            "heading",
                            "|",
                            "bold",
                            "italic",
                            "strikethrough",
                            "underline",
                            "subscript",
                            "superscript",
                            "removeFormat",
                            "|",
                            "bulletedList",
                            "numberedList",
                            "todoList",
                            "|",
                            "outdent",
                            "indent",
                            "|",
                            // '-',
                            "fontSize",
                            "fontFamily",
                            "fontColor",
                            "fontBackgroundColor",
                            "|",
                            "alignment",
                            "|",
                            "link",
                            "insertImage",
                            // "mediaEmbed",
                            "blockQuote",
                            "insertTable",
                            "|",
                            "specialCharacters",
                            "horizontalLine",
                            // "pageBreak",
                            "|",
                            "undo",
                            "redo",
                          ],
                          shouldNotGroupWhenFull: true,
                        },
                        image: {
                          toolbar: ["imageStyle:inline", "linkImage"],
                        },
                        table: {
                          contentToolbar: [
                            "tableColumn",
                            "tableRow",
                            "mergeTableCells",
                          ],
                        },
                        fontSize: {
                          options: [10, 12, 14, "default", 18, 20, 22],
                          supportAllValues: true,
                        },
                        removePlugins: [],
                        ckfinder: {
                          uploadUrl: `${process.env.REACT_APP_URL_API}/upload`,
                        },
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(data);
                      }}
                      data={content}
                    />
                    {error && error.param === "content" ? (
                      <small className="form-text" style={{ color: "red" }}>
                        {error.msg}
                      </small>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  ></div>
                </div>
              ) : (
                ""
              )}
              {page === 2 ? (
                <div className="card-body">
                  <h5 className="mb-4">Tambah Postingan</h5>

                  <div className="row" style={{ justifyContent: "center" }}>
                    <table
                      className="table table-borderles"
                      style={{
                        width: "200px",
                      }}
                    >
                      <thead>
                        <tr>
                          <td className="py-2 text-center" colSpan={2}>
                            <b>Status</b>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2">Pending</td>
                          <td className="py-2">
                            <div
                              className="form-check form-switch"
                              style={{ float: "right" }}
                            >
                              <input
                                className="form-check-input source"
                                type="checkbox"
                                role="switch"
                                id="pending"
                                name="status"
                                onChange={(e) => clickNotAll(e)}
                                checked={statusPending}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2">Publish</td>
                          <td className="py-2">
                            <div
                              className="form-check form-switch"
                              style={{ float: "right" }}
                            >
                              <input
                                className="form-check-input source"
                                type="checkbox"
                                role="switch"
                                id="publish"
                                name="status"
                                onChange={(e) => clickNotAll(e)}
                                checked={statusPublish}
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="card-body pt-0">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    type="primary"
                    style={
                      page === 0
                        ? {
                            backgroundColor: "#686bfd",
                            color: "white",
                          }
                        : {
                            backgroundColor: "#5356fb",
                            color: "white",
                          }
                    }
                    onClick={() => sebelumnya()}
                    disabled={page === 0 ? true : false}
                  >
                    Sebelumnya
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => selanjutnya(page)}
                    loading={loading}
                    style={
                      page === 2
                        ? {
                            backgroundColor: "#10cd1d",
                            color: "white",
                            border: "#10cd1d",
                          }
                        : {
                            backgroundColor: "#5356fb",
                            color: "white",
                          }
                    }
                  >
                    {page === 2 ? `Tambah` : `Selanjutnya`}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  .ant-progress-bg {
    background-color: #5356fb !important;
  }

  /* react-select */
  .css-13cymwt-control:hover,
  .css-13cymwt-control:focus,
  .css-t3ipsp-control:hover,
  .css-t3ipsp-control:focus {
    border-color: #5356fb !important;
    box-shadow: none !important;
  }

  /* ckeditor */
  .ck-editor__editable {
    min-height: 200px !important;
  }
  .ck-editor__editable:hover,
  .ck-editor__editable:focus {
    border-color: #ccced1 !important;
    box-shadow: none !important;
  }

  /* custom checkbox */
  input[type="checkbox"]:checked {
    background-color: #5356fb !important;
    border-color: #5356fb !important;
  }
  .form-switch .form-check-input {
    transform: scale(1.5) !important;
    box-shadow: none !important;
  }

  .thumbnail-cover {
    position: relative;
  }
  .removeIcon {
    cursor: pointer;
    height: 20px !important;
    width: 20px !important;
    background-color: white !important;
    position: absolute;
    top: -10px;
    right: -10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid red;
  }
`;
