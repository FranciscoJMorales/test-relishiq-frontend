# Test Relish (Frontend)

## Requirements

- Node v22.1.0
- Angular CLI v18.0.2

## Quickstart

1. Run `npm install` in base directory.
2. Run `ng serve` for a dev server. The server will open in `http://localhost:4200/`.

## Build

Run `ng build` to build the project. The compiled output will be located in the `dist/test-relishiq-frontend` directory.

## Deployment

This project is dockerized for an easier deployment. Having docker installed:

- Run `docker build -t <user>/<repository> .` to build the image and assign its tag.
- Run `docker run --name <name> -d -p 80:80 <user>/<repository>` to run a container with the image.
