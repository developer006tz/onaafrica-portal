import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/images/onaafrica-logo@4x.png"
            alt="App Logo"
            {...props}
            style={{
                width: '100%',
                height: 'auto',
                ...props.style
            }}
        />
    );
}
