export const cdnOptions = [
  { label: 'react', value: 'react' },
  { label: 'bigNumber', value: 'bigNumber' },
  { label: 'moment', value: 'moment' },
];
export const CDN_ENUM_OBJ = {
  react: {
    scripts: [
      "https://unpkg.com/react@17/umd/react.development.js",
      "https://cdn.staticfile.org/react-dom/16.4.0/umd/react-dom.development.js",
      "https://cdn.staticfile.org/babel-standalone/6.26.0/babel.min.js"
    ],
    code: ''
  },
  moment: {
    scripts: [
      "https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js"
    ],
    code: `console.log('moment is added...')`
  }
}

