import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>意味物語 - Imimonogatari</title>
    </Head>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
    </>
  )
}

export default MyApp