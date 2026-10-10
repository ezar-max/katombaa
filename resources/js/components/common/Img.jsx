import React, { useState, useEffect, useId } from 'react';

export function Placeholder({ caption = 'image', aspect = '16/10', style }) {
    const id = useId();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 500"
            preserveAspectRatio="xMidYMid slice"
            style={{ width: '100%', height: '100%', display: 'block', aspectRatio: aspect, ...style }}
        >
            <defs>
                <pattern id={`p-${id}`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <rect width="14" height="14" fill="#E7EAEF" />
                    <rect width="7" height="14" fill="#F4F5F7" />
                </pattern>
            </defs>
            <rect width="800" height="500" fill={`url(#p-${id})`} />
            <g transform="translate(400, 250)">
                <rect x="-150" y="-22" width="300" height="44" rx="6" fill="#0F3D5F" opacity="0.9" />
                <text
                    x="0"
                    y="6"
                    fill="#FFFFFF"
                    fontFamily="ui-monospace, 'SF Mono', Menlo, monospace"
                    fontSize="13"
                    textAnchor="middle"
                    letterSpacing="0.04em"
                >
                    {caption}
                </text>
            </g>
        </svg>
    );
}

export default function Img({ src, caption, alt, style, className, ...rest }) {
    const [failed, setFailed] = useState(!src);

    useEffect(() => {
        setFailed(!src);
    }, [src]);

    if (failed) {
        return (
            <div className={className} style={{ width: '100%', height: '100%', ...style }}>
                <Placeholder caption={caption || alt || 'Katoomba Greenpark'} />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt || caption || ''}
            onError={() => setFailed(true)}
            className={className}
            style={style}
            {...rest}
        />
    );
}
