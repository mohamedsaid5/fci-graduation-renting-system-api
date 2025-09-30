import { useEffect, useRef, useState } from 'react';
import dots from '../../assets/loaders/dots.gif'
import defaultLoader from '../../assets/loaders/loader.gif'
import errorImage from '../../assets/images/no-internet_up2.png'
import { imageLoadingHandler } from '../../func/helpers';


export default function Loader({ isLoading, type = 'dots', children }) {
    return isLoading ? (
        <div className={`cust-loader ${type}`}>
            <img src={type == 'dots' ? dots : defaultLoader} alt="" />
        </div>
    ) : children;
}

export function ImageLoader({ type = 'dots', src, onErrorSrc, parentStyle, style, imageClassName = '', className = '', alt = '' }) {

    const img = useRef();

    useEffect(() => {

        if (img?.current && src) imageLoadingHandler(img?.current, src, onErrorSrc ?? errorImage)

    }, [src]);

    return (
        <div className={`cust-loader ${type} ${className}`} style={parentStyle}>
            <img ref={img} src={(type == 'dots' ? dots : defaultLoader)} alt={alt}
                style={{
                    width: '100%',
                    height: '100%',
                    ...(style ?? {})
                }}
                
                className={imageClassName}
            />
        </div>
    )
}