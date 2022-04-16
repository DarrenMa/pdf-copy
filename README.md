# pdf-copy

Simple project to traverse through a directory and decrypt all pdfs with a password. Then make a copy of the PDF in a new directory.

Uses package remove-pdf-password that leverages qpdf for decrypt magic.

## Docker compose cmds

`docker-compose build`

`docker-compose up`

OR 

## Docker cmds

`docker build --pull --rm -f "Dockerfile" -t pdfcopy:latest "."`

`docker run -dt -P --name "pdfcopy-dev" -e "DEBUG=*" --label "com.microsoft.created-by=visual-studio-code" -p "9229:9229" "pdfcopy:latest" node --inspect-brk=0.0.0.0:9229 app.js`