import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next'
import React from 'react'
import ArticleMeta from '../../components/ArticleMeta'
import Layout from '../../components/Layout'
import { ArticleProps, PageType, Params } from '../../types/types'
import { fetchBlocksByPageId, fetchPages } from '../../utils/notion'
import NotionBlocks from 'notion-block-renderer'
import { sampleCards } from '../../utils/sample'
import { getText } from '../../utils/property'
import Block from '../../components/Block'

export const getStaticPaths: GetStaticPaths = async () => {
  // console.log('getStaticPaths!!!!!!!!!!! pages/articles/[slug].tsx')
  const { results } = await fetchPages({})
  const paths = results.map((page: any) => {
    return {
      params: {
        slug: getText(page.properties.slug.rich_text),
      },
    }
  })
  // console.log(paths)

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // console.log('getStaticProps pages/articles/[slug].tsx　コール')
  const { slug } = ctx.params as Params

  const { results } = await fetchPages({ slug: slug })
  // console.log('results: ', results)
  const page = results[0]
  const pageId = page.id
  const { results: blocks } = await fetchBlocksByPageId(pageId)
  return {
    props: {
      page: page,
      blocks: blocks,
    },
    // revalidate: 10,
  }
}

const Article: NextPage<ArticleProps> = ({ page, blocks }) => {
  // console.log('page', page)
  // console.log('blocks', blocks)

  return (
    <Layout>
      <article className="w-full">
        {/* meta section */}
        <div className="my-12">
          <ArticleMeta page={page} />
        </div>
        {/* article */}
        {/* <div className="my-12">
          {blocks.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div> */}

        <div className="my-12">
          <NotionBlocks blocks={blocks} isCodeHighlighter={true} />
        </div>
      </article>
    </Layout>
  )
}

export default Article
