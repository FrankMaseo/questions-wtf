import Head from 'next/head'
import React from 'react';
import Adsense from '../components/Adsense';

const Header = () => {

    return (
        <>
            <title>Questions</title>
            <Adsense />
            <meta name="description" content="questions" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </>
    )
}

export default Header;