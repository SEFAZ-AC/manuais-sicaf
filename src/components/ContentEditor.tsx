"use client";

import { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import AttachesTool from "@editorjs/attaches";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Delimiter from "@editorjs/delimiter";
import Warning from "@editorjs/warning";
import {
  uploadFile,
  uploadImageByFile,
  uploadImageByUrl,
} from "@/services/fileService";

const RenderEditor = (
  elementId: string,
  data: string | null,
  setData: (newData: string) => void
) => {
  const rendered = useRef<false | true>(false);
  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;
      new EditorJS({
        holder: elementId,
        tools: {
          embed: Embed,
          delimiter: Delimiter,
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote's author",
            },
          },
          marker: {
            class: Marker,
          },
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
          warning: {
            class: Warning,
            inlineToolbar: true,
            config: {
              titlePlaceholder: "Alert title",
              messagePlaceholder: "Alert message",
            },
          },
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              levels: [1, 2, 3, 4, 5],
              defaultLevel: 3,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          attaches: {
            class: AttachesTool,
            config: {
              uploader: {
                uploadByFile: async (file: File) => {
                  try {
                    const formData = new FormData();
                    formData.append("file", file!);
                    const res = await uploadFile(formData);
                    if (res.success) {
                      return res;
                    } else {
                      return Promise.reject({
                        error: "Não foi possível fazer o upload do arquivo ",
                      });
                    }
                  } catch (e: any) {
                    return Promise.reject({
                      error: "Não foi possível fazer o upload do arquivo ",
                    });
                  }
                },
              },
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile: async (file: File) => {
                  try {
                    const formData = new FormData();
                    formData.append("file", file!);
                    const res = await uploadImageByFile(formData);
                    if (res.success) {
                      return res;
                    } else {
                      return Promise.reject({
                        error: "Não foi possível fazer o upload do arquivo ",
                      });
                    }
                  } catch (e: any) {
                    return Promise.reject({
                      error: "Não foi possível fazer o upload do arquivo ",
                    });
                  }
                },
                uploadByUrl: async (url: string) => {
                  const formData = new FormData();
                  formData.append("url", url!);
                  try {
                    const res = await uploadImageByUrl(formData);
                    if (res.success) {
                      return res;
                    } else {
                      return Promise.reject({
                        error: "Não foi possível fazer o upload do arquivo ",
                      });
                    }
                  } catch (e: any) {
                    return Promise.reject({
                      error: "Não foi possível fazer o upload do arquivo ",
                    });
                  }
                },
              },
            },
          },
        },
        placeholder: "Comece a escrever aqui...",
        data: data ? JSON.parse(data) : {},
        onChange: (api) => {
          api.saver
            .save()
            .then((outputData) => {
              setData(JSON.stringify(outputData));
            })
            .catch((error) => {});
        },
      });
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementId]);
};

const ContentEditor = memo(function ContentEditor({
  id,
  data,
  setData,
}: {
  id: string;
  data: string | null;
  setData: (newData: string) => void;
}) {
  RenderEditor(id, data, setData);
  return <div className="w-full h-full px-12 z-[9990]" id={id}></div>;
});

export default ContentEditor;
