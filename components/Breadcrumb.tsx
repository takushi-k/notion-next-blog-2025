import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Breadcrumb = () => {
  const router = useRouter()
  let joinedPath = ''
  // console.log('Breadcrumbでパス取得：', router.asPath)

  return (
    <>
      {router.asPath.split('/').map((path, index) => {
        // console.log('path', path)
        if (path) {
          joinedPath += path + '/'
          // console.log('joinedPath：', joinedPath)

          return (
            <Link key={index} href={`/${joinedPath}`}>
              <a className="text-gray-500 hover:text-gray-600">
                <span className="text-gray-500 mx-2">/{path}</span>
              </a>
            </Link>
          )
        }
      })}
    </>
  )
}

export default Breadcrumb
