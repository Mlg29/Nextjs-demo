import React, { useMemo, memo, DetailedHTMLProps, HTMLAttributes } from 'react'
import { TextProps } from '../../utils/types';


const Paragraph = memo(
    ({
        text,
        fontSize = '0.9375em',
        lineHeight = "22px",
        textTransform ='inherit',
        textDecoration = 'none',
        textAlign='left',
        color = 'white',
        fontFamily = 'Nunito',
        fontWeight = '400',
        margin= "0%",
        ...rest
    }: TextProps) => {

        const propsStyle = useMemo(
            () => ({
                color,
                fontSize,
                textAlign,
                lineHeight,
                fontWeight,
                fontFamily,
                margin,
                textTransform, textDecoration
            }),
            [color, fontWeight, textAlign, lineHeight, fontSize, margin, textTransform, textDecoration],
        );

        return (
            <p
                style={propsStyle}
                {...rest}
            >
                {text}
            </p>
        )
    })


export default Paragraph

