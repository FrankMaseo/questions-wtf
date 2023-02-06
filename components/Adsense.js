import React from 'react';

const Adsense = () => {

    const ref_url = process.env.NEXT_ADSENSE_REF;

    return <script async src={ref_url} crossOrigin="anonymous"></script>
}

export default Adsense;