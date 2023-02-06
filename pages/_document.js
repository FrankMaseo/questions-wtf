import { Html, Main, Head, NextScript } from 'next/document'
import Header from '../components/Header';


export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <Header />
            </Head>
            <body>
                <Main />
                <NextScript />

            </body>
        </Html>
    )
}
