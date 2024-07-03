interface ParagraphData {
  text: string;
}

interface HeaderData {
  text: string;
  level: number;
}

interface QuoteData {
  text: string;
  caption: string;
  alignment: string;
}

interface TableData {
  withHeadings: boolean;
  content: string[][];
}

interface WarningData {
  title: string;
  message: string;
}

interface ListData {
  style: "unordered" | "ordered";
  items: string[];
}

interface AttachesData {
  file: {
    url: string;
    pureUrl: string;
    size: number;
    name: string;
    title: string;
    extension: string;
  };
}

interface ImageData {
  file: {
    url: string;
    pureUrl: string;
  };
  caption: string;
  withBorder: boolean;
  withBackground: boolean;
  stretched: boolean;
}

interface EmbedData {
  service: string;
  source: string;
  embed: string;
  width: number;
  height: number;
  caption: string;
}

interface Block {
  id: string;
  type: string;
  data:
    | ParagraphData
    | HeaderData
    | QuoteData
    | TableData
    | WarningData
    | ListData
    | AttachesData
    | ImageData
    | EmbedData;
}

interface ArticleData {
  time: number;
  blocks: Block[];
  version: string;
}
