import Image from "next/image";
import Link from "next/link";
import DynamicIcon from "./DynamicIcon";

const Paragraph = ({ data }: { data: ParagraphData }) => (
  <p
    className="indent-14 paragraph text-justify hyphens-auto"
    dangerouslySetInnerHTML={{ __html: data.text }}
  />
);

const Header = ({ data }: { data: HeaderData }) => {
  const Tag = `h${data.level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag
      className={`mt-12 mb-6 ${
        data.level === 1
          ? "text-4xl font-extrabold"
          : data.level === 2
          ? "text-3xl font-extrabold"
          : data.level === 3
          ? "text-2xl font-bold"
          : data.level === 4
          ? "text-xl font-semibold"
          : data.level === 5
          ? "text-lg font-medium italic"
          : ""
      } `}
      dangerouslySetInnerHTML={{ __html: data.text }}
    ></Tag>
  );
};

const Delimiter = () => <div className="my-4 divider"></div>;

const Quote = ({ data }: { data: QuoteData }) => (
  //@ts-ignore
  <blockquote className="p-3 mx-auto w-full max-w-[90%] my-4 bg-base-content bg-opacity-10 border-s-4 border-base-content">
    <p className="italic" dangerouslySetInnerHTML={{ __html: data.text }} />
    <footer
      className="mt-2 text-xs text-gray-500"
      dangerouslySetInnerHTML={{ __html: data.caption }}
    />
  </blockquote>
);

const Table = ({ data }: { data: TableData }) => {
  const renderRow = (row: string[], isHeader: boolean = false) => (
    <tr>
      {row.map((cell, cellIndex) => (
        <td
          key={cellIndex}
          style={isHeader ? { fontWeight: "bold" } : undefined}
        >
          {cell}
        </td>
      ))}
    </tr>
  );
  return (
    <table className="table mx-auto my-4 w-fit max-w-[90%] border border-base-300 table-zebra-zebra">
      <tbody>
        {data.withHeadings ? renderRow(data.content[0], true) : null}
        {data.content
          .slice(data.withHeadings ? 1 : 0)
          .map((row, index) => renderRow(row))}
      </tbody>
    </table>
  );
};

const Warning = ({ data }: { data: WarningData }) => (
  <div
    role="alert"
    className="mx-auto my-4 w-full max-w-[90%] shadow-lg alert bg-warning bg-opacity-10 border-warning border-opacity-50"
  >
    <span className="text-2xl">🔔</span>
    <div>
      <h3
        className="font-bold"
        dangerouslySetInnerHTML={{ __html: data.title }}
      />
      <div
        className="text-xs"
        dangerouslySetInnerHTML={{ __html: data.message }}
      />
    </div>
  </div>
);

const List = ({ data }: { data: ListData }) => {
  const ListTag = data.style === "unordered" ? "ul" : "ol";
  return (
    <ListTag className="my-4">
      {data.items.map((item, index) => (
        <li
          key={index}
          className="list-[square] ms-10"
          dangerouslySetInnerHTML={{ __html: item }}
        />
      ))}
    </ListTag>
  );
};

const Attaches = ({ data }: { data: AttachesData }) => (
  <Link
    className="mx-auto my-4 w-full max-w-[90%] shadow-lg alert border-base-content border-opacity-50 flex gap-3 items-center"
    href={data.file.url}
    download
    target="_blank"
  >
    <div className="text-success">
      <DynamicIcon name="download" size="lg" />
    </div>
    <div className="flex flex-col">
      <p className="font-bold">{data.title}</p>
      <p className="text-xs">
        ({(data.file.size / (1024 * 1024)).toFixed(2)} MB, {data.file.extension}
        )
      </p>
    </div>
  </Link>
);

const ImageBlock = ({ data }: { data: ImageData }) => (
  <figure className="bg-base-content bg-opacity-[0.03] my-4 mx-auto w-full p-3">
    <Image
      width={2000}
      height={2000}
      alt={data.caption}
      src={data.file.url}
      className="object-contain w-fit h-full max-h-[70vh] 2xl:max-w-[90%] 3xl:max-w-[80%] mx-auto"
      unoptimized={true}
    />
    <figcaption className="w-fit mx-auto mt-3 text-xs italic text-gray-500 text-center">
      {data.caption}
    </figcaption>
  </figure>
);

const Embed = ({ data }: { data: EmbedData }) => {
  return (
    <>
      <div
        className="object-contain w-full 2xl:max-w-[90%] 3xl:max-w-[80%] mx-auto"
        style={{
          position: "relative",
          paddingBottom: `${(data.height / data.width) * 80}%`,
          height: 0,
        }}
      >
        <iframe
          src={data.embed}
          width={data.width}
          height={data.height}
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></iframe>
      </div>
      {data.caption && (
        <figcaption className="bg-base-100 text-xs italic text-gray-500 text-center">
          {data.caption}
        </figcaption>
      )}
    </>
  );
};

const Path = ({ data }: { data: { items: string[] } }) => (
  <div className="my-4">
    <h3 className="text-2xl font-bold">Caminho:</h3>
    <div className="flex items-center gap-3 p-3 my-3 flex-wrap">
      {data.items.map((item, index) => (
        <div className="flex items-center gap-2" key={index}>
          <span className="font-medium indicator border border-gray-300 p-2 rounded-xl shadow-md my-2">
            <span className="font-light indicator-item indicator-center badge badge-primary text-white text-xs">
              {index + 1}
            </span>
            {item}
          </span>
          {index < data.items.length - 1 && <DynamicIcon name="arrow-right" />}
        </div>
      ))}
    </div>
  </div>
);

const Article = ({ blocks }: { blocks: Block[] }) => {
  return (
    <div className="content-parser-wrapper w-full h-full my-6 flex flex-col gap-2 leading-loose">
      {blocks.map((block) => {
        switch (block.type) {
          case "paragraph":
            return (
              <Paragraph key={block.id} data={block.data as ParagraphData} />
            );
          case "header":
            return <Header key={block.id} data={block.data as HeaderData} />;
          case "delimiter":
            return <Delimiter key={block.id} />;
          case "quote":
            return <Quote key={block.id} data={block.data as QuoteData} />;
          case "table":
            return <Table key={block.id} data={block.data as TableData} />;
          case "warning":
            return <Warning key={block.id} data={block.data as WarningData} />;
          case "list":
            return <List key={block.id} data={block.data as ListData} />;
          case "attaches":
            return (
              <Attaches key={block.id} data={block.data as AttachesData} />
            );
          case "image":
            return <ImageBlock key={block.id} data={block.data as ImageData} />;
          case "embed":
            return <Embed key={block.id} data={block.data as EmbedData} />;
          case "path":
            return (
              <Path key={block.id} data={block.data as { items: string[] }} />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

const ContentParser = ({ data }: { data?: string }) => {
  if (!data) return;
  const parsedData = JSON.parse(data);
  return <Article blocks={parsedData.blocks} />;
};

export default ContentParser;
