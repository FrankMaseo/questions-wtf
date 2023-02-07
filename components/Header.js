import Head from 'next/head'
import React from 'react';

const Header = () => {

    return (
        <>
            <title>Questions</title>

            <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3449758804922921"
                crossOrigin="anonymous">
            </script>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
               (adsbygoogle = window.adsbygoogle || []).push({
                   google_ad_client: "ca-pub-3449758804922921",
                   enable_page_level_ads: true
              });
                `
                }}
            />
            <meta name="description" content="questions" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </>
    )
}

export default Header;