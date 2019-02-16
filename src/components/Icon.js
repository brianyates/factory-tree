import React from 'react';

const vectors = {
    times: {
        path: 'M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z',
        viewBox: '0 0 320 512'
    },
    plus: {
        path: 'M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z',
        viewBox: '0 0 448 512'
    },
    pencil: {
        path: 'M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z',
        viewBox: '0 0 576 512'
    },
    trash: {
        path: 'M296 432h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zm-160 0h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zM440 64H336l-33.6-44.8A48 48 0 0 0 264 0h-80a48 48 0 0 0-38.4 19.2L112 64H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h24v368a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96h24a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8zM171.2 38.4A16.1 16.1 0 0 1 184 32h80a16.1 16.1 0 0 1 12.8 6.4L296 64H152zM384 464a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V96h320zm-168-32h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8z',
        viewBox: '0 0 448 512'
    },
    angle: {
        path: 'M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z',
        viewBox: '0 0 256 512'
    },
    search: {
        path: 'M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z',
        viewBox: '0 0 512 512'
    },
    check: {
        path: 'M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z',
        viewBox: '0 0 512 512'
    },
    carot: {
        path: 'M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z',
        viewBox: '0 0 320 512'
    },
    alphaDown: {
        path: 'M400.7 427.1h-61.1c.7-1 1.5-2 2.3-3.1l67.5-95.7c1.4-2 2.2-4.4 2.2-6.9V300c0-6.6-5.4-12-12-12H274.5c-6.6 0-12 5.4-12 12v28.9c0 6.6 5.4 12 12 12H331c-.7 1-1.5 2-2.3 3.1l-67.2 95.2c-1.4 2-2.2 4.4-2.2 6.9V468c0 6.6 5.4 12 12 12h129.4c6.6 0 12-5.4 12-12v-28.9c0-6.7-5.4-12-12-12zM176 368h-48V48c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16v320H16c-14.2 0-21.4 17.2-11.3 27.3l80 80c6.2 6.2 16.4 6.2 22.6 0l80-80c10-10 2.9-27.3-11.3-27.3zm248.2-159.9l-57.1-168c-1.7-4.9-6.2-8.1-11.4-8.1h-39.6c-5.1 0-9.7 3.3-11.4 8.1l-57.1 168c-2.6 7.8 3.1 15.9 11.4 15.9h35.7c5.4 0 10.1-3.5 11.5-8.7l8.1-28.2h42.9l8.3 28.3A12 12 0 0 0 377 224h35.7c8.4 0 14.2-8.1 11.5-15.9zm-95-71.5l6.8-22.9 6.6 22.9z',
        viewBox: '0 0 448 512'
    },
    alphaUp: {
        path: 'M107.3 36.7c-6.2-6.2-16.4-6.2-22.6 0l-80 80c-10 10-2.9 27.3 11.3 27.3h48v320c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V144h48c14.2 0 21.4-17.2 11.3-27.3zm293.4 390.4h-61.1c.7-1 1.5-2 2.3-3.1l67.5-95.7c1.4-2 2.2-4.4 2.2-6.9V300c0-6.6-5.4-12-12-12H274.5c-6.6 0-12 5.4-12 12v28.9c0 6.6 5.4 12 12 12H331c-.7 1-1.5 2-2.3 3.1l-67.2 95.2c-1.4 2-2.2 4.4-2.2 6.9V468c0 6.6 5.4 12 12 12h129.4c6.6 0 12-5.4 12-12v-28.9c0-6.7-5.4-12-12-12zm23.5-219l-57.1-168c-1.7-4.9-6.2-8.1-11.4-8.1h-39.6c-5.1 0-9.7 3.3-11.4 8.1l-57.1 168c-2.6 7.8 3.1 15.9 11.4 15.9h35.7c5.4 0 10.1-3.5 11.5-8.7l8.1-28.2h42.9l8.3 28.3A12 12 0 0 0 377 224h35.7c8.4 0 14.2-8.1 11.5-15.9zm-95-71.5l6.8-22.9 6.6 22.9z',
        viewBox: '0 0 448 512'
    },
    timeUp: {
        path: 'M308.811 113.787l-19.448-20.795c-4.522-4.836-4.274-12.421.556-16.95l43.443-40.741a11.999 11.999 0 0 1 8.209-3.247h31.591c6.627 0 12 5.373 12 12v127.07h25.66c6.627 0 12 5.373 12 12v28.93c0 6.627-5.373 12-12 12H301.649c-6.627 0-12-5.373-12-12v-28.93c0-6.627 5.373-12 12-12h25.414v-57.938c-7.254 6.58-14.211 4.921-18.252.601zm-30.57 238.569c0-32.653 23.865-67.356 68.094-67.356 38.253 0 79.424 28.861 79.424 92.228 0 51.276-32.237 105.772-91.983 105.772-17.836 0-30.546-3.557-38.548-6.781-5.79-2.333-8.789-8.746-6.922-14.703l9.237-29.48c2.035-6.496 9.049-9.983 15.467-7.716 13.029 4.602 27.878 5.275 38.103-4.138-38.742 5.072-72.872-25.36-72.872-67.826zm92.273 19.338c0-22.285-15.302-36.505-25.835-36.505-8.642 0-13.164 7.965-13.164 15.832 0 5.669 1.815 24.168 25.168 24.168 9.973 0 13.377-2.154 13.744-2.731.021-.046.087-.291.087-.764zM16.016 144H64v320c0 8.837 7.163 16 16 16h32c8.837 0 16-7.163 16-16V144h47.981c14.212 0 21.384-17.244 11.314-27.314l-79.981-80.002c-6.245-6.245-16.38-6.247-22.627 0L4.702 116.686C-5.347 126.736 1.775 144 16.016 144z',
        viewBox: '0 0 448 512'
    },
    timeDown: {
        path: 'M308.811 113.787l-19.448-20.795c-4.522-4.836-4.274-12.421.556-16.95l43.443-40.741a11.999 11.999 0 0 1 8.209-3.247h31.591c6.627 0 12 5.373 12 12v127.07h25.66c6.627 0 12 5.373 12 12v28.93c0 6.627-5.373 12-12 12H301.649c-6.627 0-12-5.373-12-12v-28.93c0-6.627 5.373-12 12-12h25.414v-57.938c-7.254 6.58-14.211 4.921-18.252.601zm-30.57 238.569c0-32.653 23.865-67.356 68.094-67.356 38.253 0 79.424 28.861 79.424 92.228 0 51.276-32.237 105.772-91.983 105.772-17.836 0-30.546-3.557-38.548-6.781-5.79-2.333-8.789-8.746-6.922-14.703l9.237-29.48c2.035-6.496 9.049-9.983 15.467-7.716 13.029 4.602 27.878 5.275 38.103-4.138-38.742 5.072-72.872-25.36-72.872-67.826zm92.273 19.338c0-22.285-15.302-36.505-25.835-36.505-8.642 0-13.164 7.965-13.164 15.832 0 5.669 1.815 24.168 25.168 24.168 9.973 0 13.377-2.154 13.744-2.731.021-.046.087-.291.087-.764zM175.984 368H128V48c0-8.837-7.163-16-16-16H80c-8.837 0-16 7.163-16 16v320H16.019c-14.212 0-21.384 17.244-11.314 27.314l79.981 80.002c6.245 6.245 16.38 6.247 22.627 0l79.984-80.002c10.05-10.05 2.928-27.314-11.313-27.314z',
        viewBox: '0 0 448 512'
    }
};

const Icon = ({icon, style}) =>{
    return(
        <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox={vectors[icon].viewBox} style={style}><path d={vectors[icon].path}></path></svg>
    )
}

export default Icon;