import Image from 'next/image'
import ReactMarkdown from 'react-markdown';

export interface Props {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
}

export const FeatureItem: React.FC<Props> = function ({ title, text, image, imageAlt }) {
  const components = {
    code: ({ node, ...props }) => {
      return <code className="my-2 inline-block bg-white bg-opacity-5 rounded-md py-1 px-2">{props.children}</code>
    },
  }

  return (
    <div>
      <h2 className="font-highlight text-2xl mb-4 md:text-3xl md:mb-4">{title}</h2>
      <div className="">
        <div className="mb-4 md:mb-6">
          <ReactMarkdown components={components}>{text}</ReactMarkdown>
        </div>
        <div className="flex rounded-2xl overflow-hidden p-4 bg-gradient-to-tr from-red-900 to-purple-900">
          <Image src={image} width="600" height="600" alt={imageAlt} className="w-full rounded-md" />
        </div>
      </div>
    </div>
  )
}

export const Features: React.FC = function () {
  return (
    <div className="max-w-6xl m-auto">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16 2xl:grid-cols-3">
        <FeatureItem
          title="Markdown support"
          text="Use a markdown to format your structures and give more context and style."
          image="/images/features/markdown.png"
          imageAlt="Markdow supoort example"
        />
        <FeatureItem
          title="Tree command"
          text={`Export your structure with

\`tree my-app | pbcopy\`

and paste it in the editor to save time.`}
          image="/images/features/tree.png"
          imageAlt="Tree command supoort example"
        />
        <FeatureItem
          title="Embed [soon]"
          text="Embed with iframe to enrich your article."
          image="/images/features/embed.png"
          imageAlt="Embed supoort example"
        />
      </div>
    </div>
  )
}
