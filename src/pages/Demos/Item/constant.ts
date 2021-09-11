export const cdnOptions = [
  { label: 'react', value: 'react' },
  { label: 'bigNumber', value: 'bigNumber' },
  { label: 'moment', value: 'moment' },
];
export const CDN_ENUM_OBJ = {
  react: {
    scripts: [
      "https://cdn.bootcdn.net/ajax/libs/react/16.13.1/umd/react.production.min.js",
      "https://cdn.staticfile.org/react-dom/17/umd/react-dom.development.js",
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

export const getHtml = (files: any) => {
  return (`
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/antd@4.16.13/dist/antd.css" />
      <style>
      ${files?.['style.css']?.value || ''}
      </style>
      <script src="https://cdn.bootcdn.net/ajax/libs/react/16.13.1/umd/react.production.min.js"></script>
      <script src="https://cdn.bootcdn.net/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js"></script>
      <script src="https://cdn.bootcdn.net/ajax/libs/babel-standalone/7.0.0-beta.3/babel.min.js"></script>

      <script src="https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/antd@4.16.13/dist/antd.js"></script>
    </head>

    <body>
      ${files?.['index.html']?.value || ''}
      <script type='text/babel'>
      ${files?.['script.js']?.value || ''}
      </script>
    </body>
    </html>
  `)
}